package com.senriot.headset.service.dto

import com.senriot.cloud.common.AbstractEntityDTO
import com.senriot.headset.config.LOGIN_REGEX
import com.senriot.headset.domain.Address
import java.time.LocalDate
import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank
import javax.validation.constraints.Pattern
import javax.validation.constraints.Size

/**
 * A DTO representing a user, with his authorities.
 */
open class UserDTO(
    override var id: Long? = null,

    @field:NotBlank
    @field:Pattern(regexp = LOGIN_REGEX)
    @field:Size(min = 1, max = 50)
    var login: String? = null,

    @field:Size(max = 50)
    var userName: String? = null,

    @field:Size(max = 50)
    var nickName: String? = null,

    @field:Email
    @field:Size(min = 5, max = 254)
    var email: String? = null,

    @field:Size(max = 256)
    var imageUrl: String? = null,

    var activated: Boolean = false,

    @field:Size(min = 2, max = 10)
    var langKey: String? = null,

    var authorities: List<Long>? = null,

    var phone: String? = null,

    var birthday: LocalDate? = null,

    var sex: Int? = null,

    var status: Int? = null,

    var isDeleted: Boolean? = false,

    var wxOpenId: String? = null,

    var sortOrder: Int? = null,

    var address: Address? = null

) : AbstractEntityDTO<Long>()
{
    fun isActivated(): Boolean = activated
    override fun toString(): String
    {
        return "UserDTO(id=$id, login=$login, userName=$userName, nickName=$nickName, email=$email, imageUrl=$imageUrl, activated=$activated, langKey=$langKey, authorities=$authorities, phone=$phone, birthday=$birthday, sex=$sex, status=$status, isDeleted=$isDeleted, wxOpenId=$wxOpenId, sortOrder=$sortOrder, address=$address)"
    }


}
