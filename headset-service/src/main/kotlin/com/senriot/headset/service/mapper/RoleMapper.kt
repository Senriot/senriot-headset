package com.senriot.headset.service.mapper

import com.senriot.cloud.common.IEntityMapper
import com.senriot.headset.domain.Role
import com.senriot.headset.service.dto.RoleDTO
import org.mapstruct.*

/**
 * Mapper for the entity [Role] and its DTO [RoleDTO].
 */
@Mapper(componentModel = "spring", uses = [MenuMapper::class],nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
abstract class RoleMapper : IEntityMapper<RoleDTO, Role> {

    fun fromId(id: Long?) = id?.let { Role(it) }

    fun getName(role: Role) = role.id
}
