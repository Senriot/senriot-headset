package com.senriot.headset.config.payment.interceptor


import org.springframework.lang.Nullable
import org.springframework.web.servlet.HandlerInterceptor
import org.springframework.web.servlet.ModelAndView
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class AliPayInterceptor : HandlerInterceptor
{

    @Throws(Exception::class)
    override fun preHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any): Boolean
    {
//        if (HandlerMethod::class.java == handler.javaClass)
//        {
//            val method = handler as HandlerMethod
//            val controller =
//                method.bean as? AliPayApiController ?: throw RuntimeException("控制器需要继承 AliPayApiController")
//
//            AliPayApiConfigKit.setThreadLocalAliPayApiConfig(controller.apiConfig)
//            return true
//        }
        return super.preHandle(request, response, handler)
    }

    @Throws(Exception::class)
    override fun postHandle(
        request: HttpServletRequest, response: HttpServletResponse, handler: Any, @Nullable
        modelAndView: ModelAndView?
    )
    {
    }

    @Throws(Exception::class)
    override fun afterCompletion(
        request: HttpServletRequest, response: HttpServletResponse, handler: Any, @Nullable
        e: java.lang.Exception?
    )
    {
    }
}
