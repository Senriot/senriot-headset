package com.senriot.headset.domain

import com.fasterxml.jackson.annotation.JsonIgnore
import com.senriot.headset.domain.enums.DevStatus
import org.hibernate.annotations.BatchSize
import org.hibernate.annotations.Cache
import org.hibernate.annotations.CacheConcurrencyStrategy
import org.hibernate.annotations.Type
import java.time.LocalDateTime
import javax.persistence.*
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

/**
 * 设备
 * @property id String?
 * @property deviceId String? 设备Id 对应阿里deviceName
 * @property deviceName String? 设备别名 对应阿里nickName
 * @property productKey String? 产品Key
 * @property deviceSecret String? 秘钥
 * @property activeDate LocalDateTime? 激活时间
 * @property onlineDate LocalDateTime? 上线时间
 * @property status String? 状态
 * @property ipAddress String? ip地址
 * @property address Address? 位置信息
 * @property firmwareVersion String? 固件版本
 * @property store Store? 商家
 * @constructor
 */

@Table(name = "kx_device")
@Entity
class Device(

        @Id
        var id: String? = null,
        /**
         * 设备ID
         */
        @get: NotNull
        @get: Size(min = 2, max = 32)
        @Column(name = "device_id")
        var deviceId: String? = null,

        /**
         * 设备名称
         */
        @get: NotNull
        @get: Size(min = 2, max = 32)
        @Column(name = "device_name")
        var deviceName: String? = null,

        /**
         * 产品Key
         */
        @Column(name = "product_key")
        var productKey: String? = null,

        /**
         * 设备秘钥
         */
        @Column(name = "device_secret")
        var deviceSecret: String? = null,

        /**
         * 激活时间
         */
        @Column(name = "active_date")
        var activeDate: LocalDateTime? = null,

        /**
         * 最后在线时间
         */
        @Column(name = "online_date")
        var onlineDate: LocalDateTime? = null,

        /**
         * 设备状态。取值：
         * ONLINE：设备在线。
         * OFFLINE：设备离线。
         * UNACTIVE：设备未激活。
         * DISABLE：设备已禁用。
         */
        @Column(name = "status")
        @Enumerated(EnumType.STRING)
        var status: DevStatus? = null,

        /**
         * 最后IP地址
         */
        @Column(name = "ip_address")
        var ipAddress: String? = null,

        /**
         * 设备的固件版本号。
         */
        @Column(name = "firmware_version")
        var firmwareVersion: String? = null,

        @ManyToOne
        @JsonIgnore
        var store: Store? = null,


        @JsonIgnore
        @ManyToMany(cascade = [CascadeType.REFRESH])
        @JoinTable(
                name = "kx_device_user",
                joinColumns = [JoinColumn(name = "device_id", referencedColumnName = "id")],
                inverseJoinColumns = [JoinColumn(name = "user_id", referencedColumnName = "id")]
        )
        @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
        @BatchSize(size = 20)
        var managers: MutableList<User> = mutableListOf(),

        @OneToMany(fetch = FetchType.EAGER, mappedBy = "device", cascade = [CascadeType.ALL])
        var channels: MutableList<Channel> = mutableListOf(),

        /**
         * 所在省份
         */
        @ManyToOne
        var province: City? = null,

        /**
         * 所在省市
         */
        @ManyToOne
        var city: City? = null,

        /**
         * 所在区县
         */
        @ManyToOne
        var district: City? = null,

        /**
         * 详细地址
         */

        var address: String? = null,

        @Type(type = "int-array")
        @Column(columnDefinition = "integer[]")
        var bookCategories: IntArray = intArrayOf()


) : AbstractAuditingEntity()
{

    fun addChannel(ch: Channel)
    {
        ch.device = this
        this.channels.add(ch)
    }


    override fun equals(other: Any?): Boolean
    {
        if (this === other) return true
        if (other !is Device) return false
        if (other.id == null || id == null) return false

        return id == other.id
    }

    override fun hashCode() = 31

    override fun toString() = "Device{" +
            "id=$id" +
            ", deviceId='$deviceId'" +
            ", deviceName='$deviceName'" +
            ", productKey='$productKey'" +
            ", deviceSecret='$deviceSecret'" +
            ", activeDate='$activeDate'" +
            ", onlineDate='$onlineDate'" +
            ", status='$status'" +
            ", ipAddress='$ipAddress'" +
            ", address='$address'" +
            ", firmwareVersion='$firmwareVersion'" +
            "}"

    companion object
    {
        private const val serialVersionUID = 1L
    }
}
