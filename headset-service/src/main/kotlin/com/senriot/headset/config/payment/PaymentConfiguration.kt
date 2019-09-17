package com.senriot.headset.config.payment

import com.egzosn.pay.ali.api.AliPayConfigStorage
import com.egzosn.pay.ali.api.AliPayService
import com.egzosn.pay.common.util.sign.SignUtils
import com.egzosn.pay.wx.api.WxPayConfigStorage
import com.egzosn.pay.wx.api.WxPayService
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(prefix = "alipay")
class AlipayConfiguration
{
    var appId: String = ""
    var privateKey: String = ""
    var publicKey: String = ""
    var serverUrl: String = ""
    var notifyUrl: String = ""
    var returnUrl: String = ""

    @Bean
    fun aliPayConfigStorage(): AliPayConfigStorage
    {
        return AliPayConfigStorage().apply {
            pid = "2088102178965360"
            this.appid = this@AlipayConfiguration.appId
            this.keyPrivate = privateKey
            this.keyPublic = publicKey
            this.notifyUrl = this@AlipayConfiguration.notifyUrl
            this.returnUrl = this@AlipayConfiguration.returnUrl
            signType = SignUtils.RSA2.name
            inputCharset = "utf-8"
            isTest = true
        }
    }


    @Bean
    fun aliPayService(config: AliPayConfigStorage): AliPayService = AliPayService(config)

    override fun toString(): String
    {
        return "AlipayConfiguration(appId='$appId', privateKey='$privateKey', publicKey='$publicKey', serverUrl='$serverUrl', notifyUrl='$notifyUrl', returnUrl='$returnUrl')"
    }
}

@Configuration
@ConfigurationProperties(prefix = "wxpay")
class WxPayConfiguration
{
    var appId: String = ""
    var appSecret: String = ""
    var mchId: String = ""
    var privateKey: String = ""
    var certPath: String = ""
    var returnUrl: String = ""
    var notifyUrl: String = ""


    override fun toString(): String
    {
        return "WxPayConfiguration(appId='$appId', appSecret='$appSecret', mchId='$mchId', certPath='$certPath', returnUrl='$returnUrl', notifyUrl='$notifyUrl')"
    }


    @Bean
    fun wxPayConfig() = WxPayConfigStorage().apply {
        this.appid = this@WxPayConfiguration.appId
        this.mchId = this@WxPayConfiguration.mchId
        this.secretKey = this@WxPayConfiguration.appSecret
        this.notifyUrl = this@WxPayConfiguration.notifyUrl
        this.returnUrl = this@WxPayConfiguration.returnUrl
        this.keyPrivate = this@WxPayConfiguration.privateKey
        inputCharset = "utf-8"
        signType = "MD5"
    }

    @Bean
    fun wxPayService(config: WxPayConfigStorage) = WxPayService(config)
}
