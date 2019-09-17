package com.senriot.headset.service

import com.aliyun.openservices.iot.api.message.api.MessageClient
import com.aliyun.openservices.iot.api.message.callback.MessageCallback
import com.aliyun.openservices.iot.api.message.entity.MessageToken
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.senriot.cloud.aliyun.DeviceManager
import com.senriot.cloud.aliyun.model.DeviceStatus
import com.senriot.cloud.aliyun.model.DevicelLifecycle
import com.senriot.cloud.aliyun.model.EventPost
import com.senriot.cloud.aliyun.model.PropertyPost
import com.senriot.cloud.common.utils.DateUtil
import com.senriot.headset.domain.PropertyItems
import com.senriot.headset.domain.QChannel
import com.senriot.headset.domain.enums.DevStatus
import com.senriot.headset.domain.enums.MessageLogType
import com.senriot.headset.repository.ChannelRepository
import com.senriot.headset.repository.DeviceRepository
import com.senriot.headset.repository.MessageRepository
import com.senriot.headset.service.mapper.MessageMapper
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import reactor.core.Reactor
import reactor.event.Event
import javax.annotation.PostConstruct

@Component
@Transactional
class IotMessageService(
        private val client: MessageClient,
        private val om: ObjectMapper,
        private val messageMapper: MessageMapper,
        private val messageRepository: MessageRepository,
        private val deviceRepository: DeviceRepository,
        private val deviceManager: DeviceManager,
        private val channelRepository: ChannelRepository
)
{

//    @Qualifier("device-output")
//    @Autowired
//    private lateinit var deviceChannel: MessageChannel

//    @Autowired
//    private lateinit var kxSource: KxSource


    @Autowired
    private lateinit var reactor: Reactor

    private val log = LoggerFactory.getLogger(IotMessageService::class.java)

    @Value("\${seri.iot.productKey:a1DRsxixYff}")
    private var productKey = ""

    @PostConstruct
    fun start()
    {
        client.connect { MessageCallback.Action.CommitSuccess }
        client.setMessageListener {
            log.info("${it.message}")
            MessageCallback.Action.CommitSuccess
        }

        /**
         * 设备生命周期变化
         * /sys/{productKey}/{deviceName}/thing/lifecycle
         */
        client.setMessageListener("/$productKey/+/thing/lifecycle") { token ->
            log.info("设备生命周期变换 ${token.message}")

            messageHandler(MessageLogType.Lifecycle, token)
            MessageCallback.Action.CommitSuccess
        }

        /**
         * 设备属性上报
         * /sys/{productKey}/{deviceName}/thing/event/property/post
         */
        client.setMessageListener("/$productKey/+/thing/event/property/post") { msg ->
            log.info("设备属性上报 ${msg.message}")
            messageHandler(MessageLogType.PropertyPost, msg)
            MessageCallback.Action.CommitSuccess
        }

        /**
         * 设备状态
         */
        client.setMessageListener("/as/mqtt/status/$productKey/#") {

            log.info("设备状态变化 ${it.message}")
            messageHandler(MessageLogType.Status, it)
            MessageCallback.Action.CommitSuccess
        }

        /**
         * 设备事件上报
         */
        client.setMessageListener("/$productKey/+/thing/event/#") { msg ->

            log.info("设备事件上报 ${msg.message}")
            messageHandler(MessageLogType.EventPost, msg)
            MessageCallback.Action.CommitSuccess
        }

        client.setMessageListener("/$productKey/+/thing/downlink/reply/message") {
            log.info("设备下行指令结果 ${it.message}")
            messageHandler(MessageLogType.Downlink, it)
            MessageCallback.Action.CommitSuccess
        }
    }

    @Async
    fun messageHandler(type: MessageLogType, token: MessageToken)
    {
        val jsonNode = om.readTree(token.message.payload)
        val deviceId = jsonNode.findValue("deviceName").textValue()

        deviceRepository.findByDeviceId(deviceId).map {
            var message = messageMapper.toEntity(token.message).apply {
                msgType = type
                productKey = jsonNode.findValue("productKey").textValue()
                device = it
            }
            message = messageRepository.saveAndFlush(message)

            when (type)
            {
                MessageLogType.Status       ->
                {
                    val status = om.readValue<DeviceStatus>(token.message.payload)
                    it.ipAddress = status.clientIp
                    it.status = DevStatus.valueOf(status.status.toUpperCase())
                    it.lastModifiedDate = DateUtil.DATETIME_FORMAT.parse(status.lastTime).toInstant()
                    if (it.status == DevStatus.OFFLINE)
                    {
                        it.channels.map { ch ->
                            ch.status = -1
                            ch.currentPlayName = null
                        }
                    }
                    deviceRepository.saveAndFlush(it)
                }
                MessageLogType.PropertyPost ->
                {
                    val payload = om.readValue<PropertyPost<PropertyItems>>(token.message.payload)
                    val chData = payload.items?.channelsStatus?.data
                    if (chData != null)
                    {
                        val channel = QChannel.channel
                        channelRepository.findOne(channel.device.eq(it).and(channel.ch.eq(chData.ch))).map { ch ->
                            ch.status = chData.status
                            ch.currentPlayName = chData.programName
                            channelRepository.saveAndFlush(ch)
                        }
                    }
                }
                MessageLogType.EventPost    ->
                {
                    val event = om.readValue<EventPost>(token.message.payload)
                    if (event.identifier == "deliverCommodityEvent")
                    {
                        if (event.value?.get("result") == 1)
                        {
                            deviceRepository.saveAndFlush(it)
                        }
                    }
                }
                MessageLogType.Lifecycle    ->
                {
                    val data = om.readValue<DevicelLifecycle>(token.message.payload)
                    if (data.action == DevicelLifecycle.Action.disable)
                    {
                        it.status = DevStatus.DISABLE
                        deviceRepository.save(it)
                    }
                }
                MessageLogType.Downlink     ->
                {
                }
            }

            reactor.notify(Event.wrap(message))
        }
    }
}
