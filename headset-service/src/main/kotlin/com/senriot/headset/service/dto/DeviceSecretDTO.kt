package com.senriot.headset.service.dto

import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.annotations.ApiModelProperty
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

data class DeviceSecretDTO(
    var id: String? = null,
    /**
     * 设备ID
     */

    @get: NotNull
    @get: Size(min = 2, max = 32)
    @ApiModelProperty(value = "设备ID", required = true)
    var deviceId: String? = null,
    /**
     * 设备名称
     */

    @get: NotNull
    @get: Size(min = 2, max = 32)
    @ApiModelProperty(value = "设备名称", required = true)
    @JsonProperty("deviceName")
    var name: String? = null,
    /**
     * 产品Key
     */

    @ApiModelProperty(value = "产品Key")
    var productKey: String? = null,
    /**
     * 设备秘钥
     */

    @ApiModelProperty(value = "设备秘钥")
    var deviceSecret: String? = null
)
