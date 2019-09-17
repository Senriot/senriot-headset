package com.senriot.headset.service.dto

import com.senriot.cloud.common.AbstractEntityDTO
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

/**
 * A DTO for the [com.senriot.cloud.system.domain.Role] entity.
 */
data class RoleDTO(

        @get: NotNull
        @get: Size(max = 50)
        override var name: String? = null,

        @get: NotNull
        @get: Size(max = 50)
        var roleName: String? = null,

        var sortOrder: Int? = null,

        var description: String? = null,

        var isDeleted: Boolean? = null,

        var status: Int? = null,

        var menus: MutableList<Long>? = mutableListOf()

) : AbstractEntityDTO<Long>()
{

    override fun equals(other: Any?): Boolean
    {
        if (this === other) return true
        if (other !is RoleDTO) return false
        if (other.id == null || id == null) return false

        return id == other.id
    }

    override fun hashCode() = id.hashCode()
}
