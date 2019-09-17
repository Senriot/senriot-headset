package com.senriot.headset.service.dto

import com.senriot.cloud.common.AbstractEntityDTO
import com.senriot.headset.domain.Address
import java.math.BigDecimal
import java.util.*

data class StoreDTO(
        override var id: String? = null,

        // 操作员的id集合
//        var opIds: ArrayList<String>? = null,

        var contact: String? = null,

        var phone: String? = null,

        /**
         * 门店所绑定的机器数量
         */
        var deviceCount: Long = 0,

        /**
         * 销售数量
         */
        var selloutCount: Long = 0,

        /**
         * 总共价值
         */
        var totalValue: BigDecimal? = null,

        var isImmutable: Boolean = false,

        var address: Address? = Address()

) : AbstractEntityDTO<String>()
