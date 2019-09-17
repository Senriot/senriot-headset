package com.senriot.headset.domain

import org.hibernate.annotations.GenericGenerator
import javax.persistence.*

/**
 * 门店
 */
@Entity
@Table(name = "kx_store")
class Store : AbstractAuditingEntity() {
    @javax.persistence.Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    var id: String? = null
    // 创建者
    var ownerId: String? = null

    // 所属代理
//    var agencyId: String? = null

    // 如果有上级代理
//    var provinceAgencyId: String? = null

    // 操作员的id集合
//    @OneToMany
//    @MapsId
//    var users: MutableList<User>? = null

    // 删除标记
    var isRemove: Boolean? = null

    var name: String? = null

    var contact: String? = null

    var phone: String? = null

    @Embedded
    var address: Address? = null

    /**
     * 备注
     */
    var description: String? = null
}
