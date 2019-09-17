package com.senriot.headset.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpRequest
import org.springframework.http.client.ClientHttpRequestExecution
import org.springframework.http.client.ClientHttpRequestInterceptor
import org.springframework.http.client.ClientHttpResponse
import org.springframework.web.client.RestTemplate

/**
 * Properties specific to Quickup.
 *
 * Properties are configured in the `application.yml` file.
 * See [io.github.jhipster.config.JHipsterProperties] for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
class ApplicationProperties
{
    var name: String? = null
    var description: String? = null


}


class UserAgentInterceptor : ClientHttpRequestInterceptor
{
    override fun intercept(request: HttpRequest,
                           body: ByteArray,
                           execution: ClientHttpRequestExecution): ClientHttpResponse
    {
        val headers = request.headers
        headers.add(HttpHeaders.CONTENT_TYPE, "application/json;charset=UTF-8")
        return execution.execute(request, body)
    }

}
