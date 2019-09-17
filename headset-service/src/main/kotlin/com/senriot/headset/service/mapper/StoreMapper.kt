package com.senriot.headset.service.mapper

import com.senriot.cloud.common.IEntityMapper
import com.senriot.headset.domain.Store
import com.senriot.headset.service.dto.StoreDTO
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.Mappings
import org.mapstruct.NullValuePropertyMappingStrategy

@Mapper(
    componentModel = "spring",
    uses = [],
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
abstract class StoreMapper : IEntityMapper<StoreDTO, Store> {
    fun fromId(id: String?) = id?.let { Store().apply { this.id = it } }
}
