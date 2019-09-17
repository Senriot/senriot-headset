package com.senriot.headset.service.mapper

import com.senriot.cloud.common.IEntityMapper
import com.senriot.headset.domain.Channel
import com.senriot.headset.domain.Device
import com.senriot.headset.domain.User
import com.senriot.headset.service.dto.DeviceDTO
import com.senriot.headset.service.dto.DeviceSecretDTO
import org.mapstruct.*

/**
 * Mapper for the entity [Device] and its DTO [DeviceDTO].
 */
@Mapper(
        componentModel = "spring",
        uses = [StoreMapper::class, UserMapper::class],
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
abstract class DeviceMapper : IEntityMapper<DeviceDTO, Device>
{

    @Mappings(
            Mapping(target = "deviceName", source = "name"),
            Mapping(target = "store", source = "storeId"),
            Mapping(target = "channels", ignore = true)
    )
    abstract override fun toEntity(dto: DeviceDTO): Device

    @Mappings(
            Mapping(target = "name", source = "deviceName"),
            Mapping(target = "storeId", source = "store.id"),
            Mapping(target = "storeName", source = "store.name"),
            Mapping(target = "channels", source = "channels", qualifiedByName = ["channelsToMap"])
    )
    abstract override fun toDto(entity: Device): DeviceDTO


    @Mappings(
            Mapping(target = "id", ignore = true),
            Mapping(target = "deviceName", source = "name"),
            Mapping(target = "store", source = "storeId"),
            Mapping(target = "createdBy", ignore = true),
            Mapping(target = "createdDate", ignore = true),
            Mapping(target = "lastModifiedBy", ignore = true),
            Mapping(target = "lastModifiedDate", ignore = true),
            Mapping(target = "channels", ignore = true)
    )
    abstract override fun updateEntity(dto: DeviceDTO, @MappingTarget entity: Device): Device


    abstract fun toSecretDTO(entity: Device): DeviceSecretDTO

    fun fromId(id: String?) = id?.let { Device(deviceId = it) }

    fun getId(device: Device) = device.id

    fun userFromId(id: Long) = User(id)

    @Named("channelsToMap")
    fun channelsToMap(list: MutableList<Channel>): HashMap<Int, Channel>
    {
        list.sortBy { it.ch }
        val map = hashMapOf<Int, Channel>()
        list.forEach { ch ->
            ch.ch?.let { map[it] = ch }
        }
        return map
    }
}
