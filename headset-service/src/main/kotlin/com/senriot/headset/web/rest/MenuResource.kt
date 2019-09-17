package com.senriot.headset.web.rest

import com.querydsl.core.types.Predicate
import com.senriot.cloud.common.AbstractController
import com.senriot.cloud.common.annotation.EntityName
import com.senriot.headset.domain.Menu
import com.senriot.headset.service.MenuService
import com.senriot.headset.service.dto.MenuDTO
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.querydsl.binding.QuerydslPredicate
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.ModelAndView

/**
 * REST controller for managing [com.senriot.cloud.system.domain.Menu].
 */
@RestController
@RequestMapping("/api/menus")
@EntityName("menu")
@QuerydslPredicate(root = Menu::class)
class MenuResource : AbstractController<Menu, Long, MenuDTO, MenuService>()
{

    override fun loadAll(sort: Sort, @QuerydslPredicate(root = Menu::class) predicate: Predicate?): List<MenuDTO>
    {
        return super.loadAll(sort, predicate)
    }

    override fun loadPage(page: Pageable, @QuerydslPredicate(root = Menu::class) predicate: Predicate?): Page<MenuDTO>
    {
        return super.loadPage(page, predicate)
    }

    override fun count(@QuerydslPredicate(root = Menu::class) predicate: Predicate?): ResponseEntity<Long>
    {
        return super.count(predicate)
    }

    override fun exportXls(@QuerydslPredicate(root = Menu::class) predicate: Predicate?): ModelAndView
    {
        return super.exportXls(predicate)
    }
}
