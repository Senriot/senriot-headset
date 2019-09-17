package com.senriot.headset.service.mapper

import com.senriot.headset.domain.Device
import com.aliyuncs.iot.model.v20180120.QueryDeviceDetailResponse
import com.aliyuncs.iot.model.v20180120.RegisterDeviceResponse
import org.mapstruct.*
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Mapper(componentModel = "spring",nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
abstract class AliyunMapper {
    @Mappings(Mapping(target = "id", source = "iotId"),
        Mapping(target = "deviceId", source = "deviceName"),
        Mapping(target = "deviceName", source = "nickname"))
    abstract fun registerDevice(data: RegisterDeviceResponse.Data, @MappingTarget dev: Device): Device

    @Mappings(Mapping(target = "createdDate", source = "gmtCreate", qualifiedByName = ["dateTimeFormat"]),
        Mapping(target = "onlineDate", source = "gmtOnline", qualifiedByName = ["dateTimeFormat"]),
        Mapping(target = "activeDate", source = "gmtActive", qualifiedByName = ["dateTimeFormat"]))
    abstract fun converterDeviceDetail(data: QueryDeviceDetailResponse.Data): Device

    @Named("dateTimeFormat")
    fun dateTimeFormat(date: String?): LocalDateTime? {
        if (!date.isNullOrBlank()) {
            val df = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
            return LocalDateTime.parse(date, df)
        }
        return null
    }
}
