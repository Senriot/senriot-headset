package com.senriot.headset.service.mapper

import com.senriot.cloud.common.IEntityMapper
import com.senriot.headset.domain.Track
import com.senriot.headset.service.dto.TrackDTO
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.Mappings
import org.mapstruct.NullValuePropertyMappingStrategy

@Mapper(
    componentModel = "spring",
    uses = [],
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
abstract class TrackMapper : IEntityMapper<TrackDTO, Track>
{
    fun fromId(id: Long?) = id?.let { Track(it) }

    @Mappings(
        Mapping(target = "userId", source = "user.id"),
        Mapping(target = "userName", source = "user.nickName")
    )
    abstract override fun toDto(entity: Track): TrackDTO
}
