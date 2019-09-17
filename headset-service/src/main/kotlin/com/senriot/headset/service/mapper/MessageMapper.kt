package com.senriot.headset.service.mapper

import com.senriot.headset.domain.DeviceMessage
import com.aliyun.openservices.iot.api.message.entity.Message
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.mapstruct.*
import org.springframework.beans.factory.annotation.Autowired
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId
import java.util.*

@Mapper(componentModel = "spring", uses = [],nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
abstract class MessageMapper {

    @Autowired
    private lateinit var om: ObjectMapper

    @Mappings(
        Mapping(target = "payload", qualifiedByName = ["byteArrayToString"]),
        Mapping(target = "generateTime", dateFormat = "yyyy-MM-dd HH:mm:ss", qualifiedByName = ["longToDateTime"])
    )
    abstract fun toEntity(message: Message): DeviceMessage

    @Named("byteArrayToString")
    fun byteArrayToString(array: ByteArray): Map<String, Any> {
        return om.readValue(array)
    }

    fun longToDateTime(value: Long): LocalDateTime? {
        return LocalDateTime.ofInstant(Instant.ofEpochMilli(value), ZoneId.systemDefault())
    }
}
