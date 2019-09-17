package com.senriot.headset.domain

import java.io.Serializable
import javax.persistence.Embeddable
import javax.persistence.ManyToOne


@Embeddable
data class Address(
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

        var address: String? = null

        /**
         * 坐标
         */
//        var coordinate: Any? = null
) : Serializable
