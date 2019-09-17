package com.senriot.headset.domain

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import org.hibernate.annotations.Cache
import org.hibernate.annotations.CacheConcurrencyStrategy
import org.hibernate.annotations.SQLDelete
import org.hibernate.annotations.Where
import javax.persistence.*
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

/**
 * A Menu.
 */
@Entity
@Table(name = "se_menu")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
class Menu(

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    var id: Long? = null,

    @get: NotNull
    @get: Size(max = 50)
    @Column(name = "name", length = 50, nullable = false)
    var name: String? = null,

    @get: Size(max = 100)
    @Column(name = "link", length = 100)
    var link: String? = null,

    @get:Size(max = 100)
    @Column(name = "external_link", length = 100)
    var externalLink: String? = null,

    @Column(name = "is_group")
    var isGroup: Boolean? = null,

    @Column(name = "disabled")
    var disabled: Boolean? = null,

    @Column(name = "icon")
    var icon: String? = null,

    @Column(name = "is_hide")
    var isHide: Boolean? = null,

    @Column(name = "hide_breadcrumb")
    var hideBreadcrumb: Boolean? = null,

    @Column(name = "sort_order")
    var sortOrder: Int? = null,

    @Column(name = "status")
    var status: Int? = null,

    @Column(name = "remark")
    var remark: String? = null,

    @ManyToMany(mappedBy = "menus", cascade = [CascadeType.REFRESH])
    var roles: MutableSet<Role> = mutableSetOf(),

    @ManyToOne(cascade = [CascadeType.REFRESH])
    @JsonIgnoreProperties("parent")
    var parent: Menu? = null,

    @Column(name = "is_deleted")
    var isDeleted: Boolean? = false

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
) : AbstractAuditingEntity()
{

    fun addRole(role: Role): Menu
    {
        this.roles.add(role)
        return this
    }

    fun removeRole(role: Role): Menu
    {
        this.roles.remove(role)
        return this
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    override fun equals(other: Any?): Boolean
    {
        if (this === other) return true
        if (other !is Menu) return false
        if (other.id == null || id == null) return false

        return id == other.id
    }

    override fun hashCode() = 31

    override fun toString() = "Menu{" +
            "id=$id" +
            ", name='$name'" +
            ", link='$link'" +
            ", isGroup='$isGroup'" +
            ", disabled='$disabled'" +
            ", icon='$icon'" +
            ", isHide='$isHide'" +
            ", hideBreadcrumb='$hideBreadcrumb'" +
            ", sortOrder=$sortOrder" +
            ", status=$status" +
            ", remark='$remark'" +
            "}"


    companion object
    {
        private const val serialVersionUID = 1L
    }
}
