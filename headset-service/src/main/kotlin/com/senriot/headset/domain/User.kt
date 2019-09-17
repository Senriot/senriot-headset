package com.senriot.headset.domain


import com.fasterxml.jackson.annotation.JsonIgnore
import com.senriot.headset.config.LOGIN_REGEX
import org.hibernate.annotations.*
import org.hibernate.annotations.Cache
import java.io.Serializable
import java.time.Instant
import java.time.LocalDate
import java.util.*
import javax.persistence.*
import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.Table
import javax.validation.constraints.Email
import javax.validation.constraints.NotNull
import javax.validation.constraints.Pattern
import javax.validation.constraints.Size

/**
 * A user.
 */
@Entity
@Table(name = "se_user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@SQLDelete(sql = "update se_user set is_deleted = true  where id =?")
@Where(clause = "is_deleted = false")
class User @JvmOverloads constructor(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

    login: String? = null,

    @JsonIgnore
    @field:NotNull
    @field:Size(min = 60, max = 60)
    @Column(name = "password_hash", length = 60, nullable = false)
    var password: String? = null,

    @field:Size(max = 50)
    @Column(name = "user_name", length = 50)
    var userName: String? = null,

    @field:Size(max = 50)
    @Column(name = "nick_name", length = 50)
    var nickName: String? = null,

    @field:Email
    @field:Size(min = 5, max = 254)
    @Column(length = 254, unique = true)
    var email: String? = null,

    @field:NotNull
    @Column(nullable = false)
    var activated: Boolean = false,

    @field:Size(min = 2, max = 10)
    @Column(name = "lang_key", length = 10)
    var langKey: String? = null,

    @field:Size(max = 256)
    @Column(name = "image_url", length = 256)
    var imageUrl: String? = null,

    @field:Size(max = 20)
    @Column(name = "activation_key", length = 20)
    @JsonIgnore
    var activationKey: String? = null,

    @field:Size(max = 20)
    @Column(name = "reset_key", length = 20)
    @JsonIgnore
    var resetKey: String? = null,

    @Column(name = "reset_date")
    var resetDate: Instant? = null,

    var phone: String? = null,

    var birthday: LocalDate? = null,

    var sex: Int? = null,

    var status: Int? = null,

    @Column(name = "is_deleted")
    var isDeleted: Boolean? = null,

    var wxOpenId: String? = null,

    var sortOrder: Int? = null,

    @Embedded
    var address: Address? = null,

    @JsonIgnore
    @ManyToMany(cascade = [CascadeType.REFRESH])
    @JoinTable(
        name = "se_user_role",
        joinColumns = [JoinColumn(name = "user_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "role_id", referencedColumnName = "id")]
    )
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @BatchSize(size = 20)
    var authorities: MutableSet<Role> = mutableSetOf(),


    createdBy: String? = null,
    createdDate: Instant? = Instant.now(),
    lastModifiedBy: String? = null,
    lastModifiedDate: Instant? = Instant.now()
) : AbstractAuditingEntity(createdBy, createdDate, lastModifiedBy, lastModifiedDate), Serializable
{

    @NotNull
    @field:Pattern(regexp = LOGIN_REGEX)
    @field:Size(min = 1, max = 50)
    @Column(length = 50, unique = true, nullable = false)
    var login: String? = login
        set(value)
        {
            // Lowercase the login before saving it in database
            field = value?.toLowerCase(Locale.ENGLISH)
        }

    override fun equals(other: Any?): Boolean
    {
        if (this === other) return true
        if (other !is User) return false
        if (other.id == null || id == null) return false

        return id == other.id
    }

    override fun hashCode() = 31

    override fun toString() =
        "User{" +
                "login='" + login + '\'' +
                ", email='" + email + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", activated='" + activated + '\'' +
                ", langKey='" + langKey + '\'' +
                ", activationKey='" + activationKey + '\'' +
                "}"

    companion object
    {
        private const val serialVersionUID = 1L
    }
}
