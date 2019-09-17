package com.senriot.headset.service

import com.egzosn.pay.ali.api.AliPayService
import com.egzosn.pay.ali.bean.AliPayMessage
import com.egzosn.pay.common.api.PayMessageHandler
import com.egzosn.pay.common.bean.PayOutMessage
import com.egzosn.pay.wx.api.WxPayService
import com.egzosn.pay.wx.bean.WxPayMessage
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import java.math.BigDecimal

@Component
class AliPayMessageHandler : PayMessageHandler<AliPayMessage, AliPayService>
{
    private val log = LoggerFactory.getLogger(this.javaClass)

    override fun handle(
        payMessage: AliPayMessage,
        context: MutableMap<String, Any>?,
        payService: AliPayService
    ): PayOutMessage
    {
        val message = payMessage.payMessage
        //交易状态
        val tradeStatus = message["trade_status"] as String
        log.debug(payMessage.toString())
        //上下文对象中获取账单
//        AmtApply amtApply = (AmtApply)context.get("amtApply");
        //日志存储
//        amtPaylogService.createAmtPaylogByCallBack(amtApply,  message.toString());
        //交易完成
        return if ("TRADE_SUCCESS" == tradeStatus || "TRADE_FINISHED" == tradeStatus)
        {

            val payAmount = BigDecimal(message["total_fee"] as String)

            payService.getPayOutMessage("success", "成功")

        }/* else if ("WAIT_BUYER_PAY".equals(trade_status) || "TRADE_CLOSED".equals(trade_status)) {

        }*/
        else
            payService.getPayOutMessage("fail", "失败")
    }
}


@Component
class WxPayMessageHandler : PayMessageHandler<WxPayMessage, WxPayService>
{
    private val log = LoggerFactory.getLogger(this.javaClass)

    override fun handle(
        payMessage: WxPayMessage,
        context: MutableMap<String, Any>?,
        payService: WxPayService
    ): PayOutMessage
    {
        log.debug(payMessage.toString())

        return if ("SUCCESS" == payMessage.payMessage["result_code"])
        {
            /////这里进行成功的处理

            payService.getPayOutMessage("SUCCESS", "OK");
        } else

            payService.getPayOutMessage("FAIL", "失败");
    }

}
