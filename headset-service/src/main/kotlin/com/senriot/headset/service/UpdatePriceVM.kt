package com.senriot.headset.service

import org.jetbrains.annotations.NotNull
import java.math.BigDecimal

class UpdatePriceVM
{
    var ids: List<String> = listOf()
    @NotNull("单价不能为空")
    var price: BigDecimal = BigDecimal(0)
}
