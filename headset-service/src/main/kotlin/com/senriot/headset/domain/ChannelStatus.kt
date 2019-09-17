package com.senriot.headset.domain

import com.fasterxml.jackson.annotation.JsonProperty

data class ChannelStatus(
    val time: Long = 0,
    @JsonProperty("value")
    val data: Data? = null
) {
    data class Data(
        var ch: Int = 0,
        var status: Int? = null,
        var programName:String?=null
    )
}
