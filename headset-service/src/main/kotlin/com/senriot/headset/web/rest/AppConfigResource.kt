package com.senriot.headset.web.rest

import com.senriot.headset.config.ApplicationProperties
import com.senriot.headset.domain.Menu_
import com.senriot.headset.service.MenuService
import com.senriot.headset.service.mapper.MenuMapper
import org.springframework.data.domain.Sort
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/app/config")
class AppConfigResource(
    private val appInfo: ApplicationProperties,
    private val menuRepository: MenuService,
    private val menuMapper: MenuMapper
)
{

    @GetMapping
    fun getAppInfo(): MutableMap<String, Any>
    {
        val result = mutableMapOf<String, Any>()
        result["app"] = appInfo
        result["menus"] = menuRepository.loadAll(null, sort = Sort.by(Menu_.SORT_ORDER))
        return result
    }
}
