package com.senriot.headset.domain

import java.time.LocalDate
import javax.persistence.Embeddable

@Embeddable
data class UserInfo(
    var phone: String? = null,

    var birthday: LocalDate? = null,

    var sex: Int? = null,

    var status: Int? = null,

    var isDeleted: Boolean? = null,
    var wxOpenId: String? = null,
    // 是哪个代理邀请的
    var inviteId: String? = null,
    var sortOrder: Int? = null
)
