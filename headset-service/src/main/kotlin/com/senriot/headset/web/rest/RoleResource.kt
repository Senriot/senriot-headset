package com.senriot.headset.web.rest

import com.querydsl.core.types.Predicate
import com.senriot.cloud.common.AbstractController
import com.senriot.cloud.common.annotation.EntityName
import com.senriot.headset.domain.Role
import com.senriot.headset.service.RoleService
import com.senriot.headset.service.dto.RoleDTO
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.querydsl.binding.QuerydslPredicate
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.ModelAndView

/**
 * REST controller for managing [com.senriot.cloud.system.domain.Role].
 */
@RestController
@RequestMapping("/api/roles")
@EntityName("role")
class RoleResource : AbstractController<Role, Long, RoleDTO, RoleService>()
{
    override fun loadAll(sort: Sort, @QuerydslPredicate(root = Role::class) predicate: Predicate?): List<RoleDTO>
    {
        return super.loadAll(sort, predicate)
    }

    override fun loadPage(page: Pageable, @QuerydslPredicate(root = Role::class) predicate: Predicate?): Page<RoleDTO>
    {
        return super.loadPage(page, predicate)
    }

    override fun count(@QuerydslPredicate(root = Role::class) predicate: Predicate?): ResponseEntity<Long>
    {
        return super.count(predicate)
    }

    override fun exportXls(@QuerydslPredicate(root = Role::class)
                           predicate: Predicate?): ModelAndView
    {
        return super.exportXls(predicate)
    }
}
