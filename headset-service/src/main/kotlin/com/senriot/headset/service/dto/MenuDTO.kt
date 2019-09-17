package com.senriot.headset.service.dto

import com.fasterxml.jackson.annotation.JsonProperty
import com.senriot.cloud.common.AbstractEntityDTO
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

/**
 * A DTO for the [com.senriot.cloud.system.domain.Menu] entity.
 */
data class MenuDTO(

        @get: NotNull
        @get: Size(max = 50)
        @JsonProperty("text")
        override var name: String? = null,

        @get: Size(max = 100)
        var link: String? = null,

        var externalLink: String? = null,

        var isGroup: Boolean? = null,

        var disabled: Boolean? = null,

        var icon: String? = null,

        var isHide: Boolean? = null,

        @JsonProperty("hide_in_breadcrumb")
        var hideBreadcrumb: Boolean? = null,

        var sortOrder: Int? = null,

        var status: Int? = null,

        var remark: String? = null,

        @JsonProperty("acl")
        var roles: MutableSet<String> = mutableSetOf(),

        var parentId: Long? = null

) : AbstractEntityDTO<Long>()
{

    override fun equals(other: Any?): Boolean
    {
        if (this === other) return true
        if (other !is MenuDTO) return false
        if (other.id == null || id == null) return false

        return id == other.id
    }

    override fun hashCode() = id.hashCode()
}
