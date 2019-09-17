package com.senriot.headset.service.mapper

import com.senriot.cloud.common.IEntityMapper
import com.senriot.headset.domain.DeviceMessage
import com.senriot.headset.service.dto.DeviceLogDTO
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.Mappings
import org.mapstruct.NullValuePropertyMappingStrategy

/**
 * Mapper for the entity [Menu] and its DTO [MenuDTO].
 */
@Mapper(
    componentModel = "spring",
    uses = [],
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
abstract class DeviceLogMapper
{
    @Mappings(
        Mapping(target = "deviceId", source = "device.id"),
        Mapping(target = "deviceName", source = "device.deviceName")
    )
    abstract fun toDto(entity: DeviceMessage): DeviceLogDTO
}
