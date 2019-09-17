package com.senriot.headset.service.dto

import com.fasterxml.jackson.annotation.JsonProperty
import com.senriot.cloud.common.AbstractEntityDTO
import com.senriot.headset.domain.Channel
import com.senriot.headset.domain.City
import io.swagger.annotations.ApiModelProperty
import org.jeecgframework.poi.excel.annotation.Excel
import java.time.LocalDateTime
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

/**
 * A DTO for the [cloud.seri.service.hf.domain.Device] entity.
 */
data class DeviceDTO(

        override var id: String? = null,
        /**
         * 设备ID
         */

        @get: NotNull
        @get: Size(min = 2, max = 32)
        @ApiModelProperty(value = "设备ID", required = true)
        @Excel(name = "设备ID", width = 20.0)
        var deviceId: String? = null,
        /**
         * 设备名称
         */

        @get: NotNull
        @get: Size(min = 2, max = 32)
        @ApiModelProperty(value = "设备名称", required = true)
        @JsonProperty("deviceName")
        @Excel(name = "设备名称", width = 20.0)
        override var name: String? = null,
        /**
         * 产品Key
         */

        @ApiModelProperty(value = "产品Key")
        var productKey: String? = null,
        /**
         * 设备秘钥
         */

        @ApiModelProperty(value = "设备秘钥")
        var deviceSecret: String? = null,
        /**
         * 激活时间
         */

        @ApiModelProperty(value = "激活时间")
        @Excel(name = "激活时间", width = 30.0)
        var activeDate: LocalDateTime? = null,
        /**
         * 最后在线时间
         */

        @ApiModelProperty(value = "最后在线时间")
        @Excel(name = "最后在线时间", width = 30.0)
        var onlineDate: LocalDateTime? = null,
        /**
         * 设备状态。取值：
         * ONLINE：设备在线。
         * OFFLINE：设备离线。
         * UNACTIVE：设备未激活。
         * DISABLE：设备已禁用。
         */

        @ApiModelProperty(value = "设备状态。取值： ONLINE：设备在线。 OFFLINE：设备离线。 UNACTIVE：设备未激活。 DISABLE：设备已禁用。")
        @Excel(name = "状态", width = 20.0)
        var status: String? = null,
        /**
         * 最后IP地址
         */

        @ApiModelProperty(value = "最后IP地址")
        @Excel(name = "IP地址", width = 20.0)
        var ipAddress: String? = null,

        var storeId: String? = null,

        @Excel(name = "商家", width = 20.0)
        var storeName: String? = null,
        /**
         * 设备的固件版本号。
         */

        @ApiModelProperty(value = "设备的固件版本号。")
        var firmwareVersion: String? = null,

        /**
         * 所在省份
         */
        var province: City? = null,

        /**
         * 所在省市
         */
        var city: City? = null,

        /**
         * 所在区县
         */
        var district: City? = null,

        /**
         * 详细地址
         */

        var address: String? = null,

        var managers: MutableList<Long> = mutableListOf(),

        var channels: HashMap<Int, Channel> = hashMapOf(),

        var bookCategories: IntArray = intArrayOf()

) : AbstractEntityDTO<String>()
{

    override fun equals(other: Any?): Boolean
    {
        if (this === other) return true
        if (other !is DeviceDTO) return false
        if (other.id == null || id == null) return false

        return id == other.id
    }

    override fun hashCode() = id.hashCode()

}
