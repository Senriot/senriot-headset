package com.senriot.headset.service.mapper

import com.senriot.cloud.common.IEntityMapper
import com.senriot.headset.domain.User
import com.senriot.headset.service.dto.UserDTO
import com.senriot.headset.service.mapper.RoleMapper
import org.mapstruct.Mapper
import org.mapstruct.NullValuePropertyMappingStrategy

/**
 * Mapper for the entity [User] and its DTO called [UserDTO].
 *
 * Normal mappers are generated using MapStruct, this one is hand-coded as MapStruct
 * support is still in beta, and requires a manual step with an IDE.
 */
@Mapper(componentModel = "spring",
        uses = [RoleMapper::class],
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
abstract class UserMapper : IEntityMapper<UserDTO, User>
{
//        @Mappings(
//                Mapping(target = "authorities",source = "authorities", qualifiedByName = arrayOf("roleName"))
//        )
//        abstract override fun toEntity(dto: UserDTO): User

        fun getId(user: User) = user.id
}
