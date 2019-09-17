package com.senriot.headset.service

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.querydsl.core.BooleanBuilder
import com.querydsl.core.types.Predicate
import com.senriot.cloud.aliyun.DeviceManager
import com.senriot.cloud.common.AbstractService
import com.senriot.cloud.common.error.BadRequestAlertException
import com.senriot.cloud.common.result.R
import com.senriot.cloud.common.result.fail
import com.senriot.cloud.common.result.success
import com.senriot.headset.domain.*
import com.senriot.headset.domain.enums.DevStatus
import com.senriot.headset.repository.ChannelRepository
import com.senriot.headset.repository.DeviceRepository
import com.senriot.headset.repository.MessageRepository
import com.senriot.headset.security.ADMIN
import com.senriot.headset.security.getCurrentUserLogin
import com.senriot.headset.security.isCurrentUserInRole
import com.senriot.headset.service.dto.DeviceDTO
import com.senriot.headset.service.dto.DeviceLogDTO
import com.senriot.headset.service.dto.DeviceSecretDTO
import com.senriot.headset.service.dto.DeviceStatistics
import com.senriot.headset.service.mapper.AliyunMapper
import com.senriot.headset.service.mapper.DeviceLogMapper
import com.senriot.headset.service.mapper.DeviceMapper
import org.springframework.beans.factory.annotation.Value
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import reactor.event.Event
import reactor.function.Consumer
import java.nio.charset.Charset
import java.time.LocalDate
import java.util.*

/**
 * Service Implementation for managing [Device].
 */
@Service
@Transactional
class DeviceService(
        private val aliyunMapper: AliyunMapper,
        private val deviceManager: DeviceManager,
        private val messageRepository: MessageRepository,
        private val deviceLogMapper: DeviceLogMapper,
        private val objectMapper: ObjectMapper,
        private val channelRepository: ChannelRepository
) : AbstractService<Device, String, DeviceDTO, DeviceRepository, DeviceMapper>(), Consumer<Event<DeviceMessage>>
{
    override fun accept(t: Event<DeviceMessage>)
    {

    }


    @Value("\${seri.iot.productKey:a1DRsxixYff}")
    private var productKey = ""


    override fun create(dto: DeviceDTO): DeviceDTO
    {

        return Optional.ofNullable(
                deviceManager.registerDevice(
                        ProductKey = productKey,
                        DeviceName = dto.deviceId!!,
                        Nickname = dto.name
                )
        ).map {
            if (it.success)
            {
                var dev = aliyunMapper.registerDevice(it.data, mapper.toEntity(dto))
                for (i in 1..8)
                {
                    dev.addChannel(Channel(ch = i, status = -1,device = dev))
                }
                dev = repository.saveAndFlush(dev)
                mapper.toDto(dev)
            } else
            {
                throw RuntimeException(it.errorMessage)
            }
        }.orElseThrow { RuntimeException("注册设备失败") }
    }

    override fun delete(id: String): R<String>
    {
        return Optional.ofNullable(deviceManager.deleteDevice(IotId = id)).map {
            if (it.success)
            {
                repository.deleteById(id)
                success<String>()
            } else
            {
                fail(it.errorMessage)
            }
        }.orElseThrow { RuntimeException("设备服务异常") }
    }

    fun queryDeviceStatistics(): DeviceStatistics
    {
        val result = DeviceStatistics()
        result.deviceCount = repository.count()
        result.activeCount = repository.count(QDevice.device.status.ne(DevStatus.UNACTIVE))
        result.onlineCount = repository.count(QDevice.device.status.eq(DevStatus.ONLINE))
        return result
    }

    override fun loadAll(predicate: Predicate?, sort: Sort): List<DeviceDTO>
    {
        return if (isCurrentUserInRole(ADMIN))
            super.loadAll(predicate, sort)
        else
        {
            getCurrentUserLogin().map {
                val p = BooleanBuilder()
                p.and(predicate).and(QDevice.device.managers.any().login.eq(it))
                super.loadAll(p, sort)
            }.orElseThrow { BadRequestAlertException("用户不存在", "device", "usernull") }
        }
    }

    override fun loadPage(predicate: Predicate?, pageable: Pageable): Page<DeviceDTO>
    {
        return if (isCurrentUserInRole(ADMIN))
            super.loadPage(predicate, pageable)
        else
        {
            getCurrentUserLogin().map {
                val p = BooleanBuilder()
                p.and(predicate).and(QDevice.device.managers.any().login.eq(it))
                super.loadPage(predicate, pageable)
            }.orElseThrow { BadRequestAlertException("用户不存在", "device", "usernull") }
        }
    }

    fun disableThing(id: String)
    {
        Optional.ofNullable(deviceManager.disableThing(IotId = id)).map {
            if (!it.success)
                throw RuntimeException(it.errorMessage)
        }.orElseThrow { RuntimeException("设备服务异常") }
    }

    fun enableThing(id: String)
    {
        Optional.ofNullable(deviceManager.enableThing(IotId = id)).map {
            if (!it.success)
                throw RuntimeException(it.errorMessage)
        }.orElseThrow { RuntimeException("设备服务异常") }
    }

//    fun getChannels(deviceId: String): List<Channel> {
//        return repository.findById(deviceId).map { it.channels.values.toList() }.orElseThrow { RuntimeException("没找到相关设备") }
//    }

    fun getLogs(
            pageable: Pageable,
            deviceId: String,
            fromDate: LocalDate? = null,
            toDate: LocalDate? = null
    ): Page<DeviceLogDTO>
    {
        val msg = QDeviceMessage.deviceMessage
        val builder = BooleanBuilder(msg.productKey.eq(productKey))
        builder.and(msg.device.id.eq(deviceId))
        fromDate?.let { builder.and(msg.generateTime.between(fromDate.atTime(0, 0), toDate?.atTime(0, 0))) }
        return messageRepository.findAll(builder, pageable).map { deviceLogMapper.toDto(it) }
    }

    fun playService(deviceId: String, req: MutableMap<String, Any>): MutableMap<String, Any>?
    {
        val str = objectMapper.writeValueAsString(req)
        val base64 = Base64.getEncoder().encode(str.toByteArray(Charset.defaultCharset()))
        val res = deviceManager.rRpc(productKey, deviceId, base64.toString(Charset.defaultCharset()))
        if (res.success)
        {
            val result = Base64.getDecoder().decode(res.payloadBase64Byte)
            return objectMapper.readValue<MutableMap<String, Any>>(result)
        } else
        {
            throw BadRequestAlertException(res.errorMessage, "device", "rrpc-error")
        }
    }

    fun getChannels(deviceId: String): List<Channel>
    {
        return repository.findById(deviceId).map { it.channels.sortedBy { it.ch } }
                .orElseThrow { RuntimeException("没找到相关设备") }
    }

    fun getDeviceSecret(deviceId: String): Optional<DeviceSecretDTO>?
    {
        return repository.findOne(QDevice.device.deviceId.eq(deviceId)).map {
            mapper.toSecretDTO(it)
        }
    }

}
