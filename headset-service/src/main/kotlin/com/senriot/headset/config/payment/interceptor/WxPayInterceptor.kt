package com.senriot.headset.config.payment.interceptor


import org.springframework.lang.Nullable
import org.springframework.web.servlet.HandlerInterceptor
import org.springframework.web.servlet.ModelAndView
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class WxPayInterceptor : HandlerInterceptor
{

    @Throws(Exception::class)
    override fun preHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any): Boolean
    {
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
