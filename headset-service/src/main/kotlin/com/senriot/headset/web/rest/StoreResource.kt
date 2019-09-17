package com.senriot.headset.web.rest

import com.querydsl.core.types.Predicate
import com.senriot.cloud.common.AbstractController
import com.senriot.cloud.common.annotation.EntityName
import com.senriot.headset.domain.Store
import com.senriot.headset.service.StoreService
import com.senriot.headset.service.dto.StoreDTO
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.querydsl.binding.QuerydslPredicate
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.ModelAndView

@RestController
@RequestMapping("/api/stores")
@EntityName("store")
class StoreResource : AbstractController<Store, String, StoreDTO, StoreService>(){
    override fun loadAll(sort: Sort, @QuerydslPredicate(root = Store::class) predicate: Predicate?): List<StoreDTO> {
        return super.loadAll(sort, predicate)
    }

    override fun loadPage(page: Pageable, @QuerydslPredicate(root = Store::class) predicate: Predicate?): Page<StoreDTO> {
        return super.loadPage(page, predicate)
    }

    override fun count(@QuerydslPredicate(root = Store::class) predicate: Predicate?): ResponseEntity<Long> {
        return super.count(predicate)
    }

    override fun exportXls(predicate: Predicate?): ModelAndView
    {
        return super.exportXls(predicate)
    }
}
