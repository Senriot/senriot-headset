package com.senriot.headset.domain

import org.hibernate.annotations.Cache
import org.hibernate.annotations.CacheConcurrencyStrategy

import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

import javax.persistence.*

/**
 * A Role.
 */
@Entity
@Table(name = "se_role")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@NamedEntityGraphs(
    NamedEntityGraph(name = "Role.default", attributeNodes = [NamedAttributeNode("menus")])
)
class Role(

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    var id: Long? = null,

    @get: NotNull
    @get: Size(max = 50)
    @Column(name = "name", length = 50, nullable = false, unique = true)
    var name: String? = null,

    @get: NotNull
    @get: Size(max = 50)
    @Column(name = "role_name", length = 50, nullable = false)
    var roleName: String? = null,

    @Column(name = "sort_order")
    var sortOrder: Int? = null,

    @Column(name = "description")
    var description: String? = null,

    @Column(name = "is_deleted")
    var isDeleted: Boolean? = null,

    @Column(name = "status")
    var status: Int? = null,

    @ManyToMany(cascade = [CascadeType.REFRESH])
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(
            name = "se_menu_role",
            joinColumns = [JoinColumn(name = "role_id", referencedColumnName = "id")],
            inverseJoinColumns = [JoinColumn(name = "menu_id", referencedColumnName = "id")]
    )
    var menus: MutableList<Menu>? = mutableListOf()

) : AbstractAuditingEntity() {


    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Role) return false
        if (other.id == null || id == null) return false

        return id == other.id
    }

    override fun hashCode() = 31

    override fun toString() = "Role{" +
        "id=$id" +
        ", name='$name'" +
        ", roleName='$roleName'" +
        ", sortOrder=$sortOrder" +
        ", description='$description'" +
        ", isDeleted='$isDeleted'" +
        ", status=$status" +
        "}"


    companion object {
        private const val serialVersionUID = 1L
    }
}
