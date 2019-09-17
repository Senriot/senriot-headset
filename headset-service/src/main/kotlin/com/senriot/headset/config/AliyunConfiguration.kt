package com.senriot.headset.config

import com.aliyun.openservices.iot.api.Profile
import com.aliyun.openservices.iot.api.message.MessageClientFactory
import com.aliyun.openservices.iot.api.message.api.MessageClient
import com.aliyuncs.DefaultAcsClient
import com.aliyuncs.profile.DefaultProfile
import com.senriot.cloud.aliyun.DeviceManager
import com.senriot.cloud.aliyun.ThingModelManager
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class AliyunConfiguration
{
    @Value("\${seri.iot.aliyun.AccessKeyId:LTAIwFx8CkeTSSJR}")
    private lateinit var accessKeyId: String

    @Value("\${seri.iot.aliyun.AccessKeySecret:DWXB9v5gh1511MYQmuxttXTVelcQYd}")
    private var accessKeySecret = ""

    @Value("\${seri.iot.aliyun.uid:1142751887474985}")
    private var uid = ""

    @Value("\${seri.iot.aliyun.regionId:cn-shanghai}")
    private var regionId = "cn-shanghai"

    private val log = LoggerFactory.getLogger(this::class.java)

    @Bean
    fun defaultAcsClient(): DefaultAcsClient
    {
        DefaultProfile.addEndpoint("cn-shanghai", "Iot", "iot.cn-shanghai.aliyuncs.com")
        log.info("$accessKeyId   $accessKeySecret")
        val profile = DefaultProfile.getProfile("cn-shanghai", accessKeyId, accessKeySecret)
        return DefaultAcsClient(profile)
    }

    @Bean
    fun messageClient(): MessageClient
    {
        val endPoint = "https://$uid.iot-as-http2.$regionId.aliyuncs.com"
        val profile = Profile.getAccessKeyProfile(endPoint, regionId, accessKeyId, accessKeySecret)
        return MessageClientFactory.messageClient(profile)
    }

    @Bean
    fun deviceManager(client: DefaultAcsClient) = DeviceManager(client)

    @Bean
    fun thingModelService(client: DefaultAcsClient) = ThingModelManager(client)
}
