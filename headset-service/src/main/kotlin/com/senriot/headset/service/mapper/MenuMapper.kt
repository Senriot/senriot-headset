package com.senriot.headset.service.mapper

import com.senriot.cloud.common.IEntityMapper
import com.senriot.headset.domain.Menu
import com.senriot.headset.service.dto.MenuDTO
import org.mapstruct.*

/**
 * Mapper for the entity [Menu] and its DTO [MenuDTO].
 */
@Mapper(
    componentModel = "spring",
    uses = [RoleMapper::class],
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
abstract class MenuMapper : IEntityMapper<MenuDTO, Menu> {
    @Mappings(
        Mapping(source = "parent.id", target = "parentId")
    )
    abstract override fun toDto(entity: Menu): MenuDTO

    @Mappings(
        Mapping(target = "removeRole", ignore = true),
        Mapping(target = "roles", ignore = true),
        Mapping(source = "parentId", target = "parent")

    )
    abstract override fun toEntity(dto: MenuDTO): Menu

    @Mappings(
        Mapping(target = "roles", ignore = true),
        Mapping(target = "id", ignore = true),
        Mapping(target = "createdBy", ignore = true),
        Mapping(target = "createdDate", ignore = true),
        Mapping(target = "lastModifiedBy", ignore = true),
        Mapping(target = "lastModifiedDate", ignore = true)
    )
    abstract override fun updateEntity(dto: MenuDTO, @MappingTarget entity: Menu): Menu

    fun fromId(id: Long?) = id?.let { Menu(it) }

    fun getId(menu: Menu) = menu.id
}
