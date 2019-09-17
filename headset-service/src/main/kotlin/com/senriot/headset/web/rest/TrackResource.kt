package com.senriot.headset.web.rest

import com.querydsl.core.types.Predicate
import com.senriot.cloud.common.AbstractController
import com.senriot.cloud.common.annotation.EntityName
import com.senriot.cloud.common.security.getCurrentUserLogin
import com.senriot.headset.domain.QUser
import com.senriot.headset.domain.Track
import com.senriot.headset.repository.UserRepository
import com.senriot.headset.service.TracksService
import com.senriot.headset.service.dto.TrackDTO
import org.jeecgframework.poi.excel.def.NormalExcelConstants
import org.jeecgframework.poi.excel.entity.ExportParams
import org.jeecgframework.poi.excel.view.JeecgEntityExcelView
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.querydsl.binding.QuerydslPredicate
import org.springframework.http.ResponseEntity
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.ModelAndView

@RestController
@RequestMapping("/api/tracks")
@EntityName("track")
class TrackResource(private val userRepository: UserRepository) :
        AbstractController<Track, Long, TrackDTO, TracksService>()
{
    override fun loadAll(sort: Sort, @QuerydslPredicate(root = Track::class) predicate: Predicate?): List<TrackDTO>
    {
        return super.loadAll(sort, predicate)
    }

    override fun loadPage(page: Pageable, @QuerydslPredicate(root = Track::class) predicate: Predicate?): Page<TrackDTO>
    {
        return super.loadPage(page, predicate)
    }

    override fun count(@QuerydslPredicate(root = Track::class) predicate: Predicate?): ResponseEntity<Long>
    {
        return super.count(predicate)
    }

    override fun exportXls(@QuerydslPredicate(root = Track::class) predicate: Predicate?): ModelAndView
    {
        return getCurrentUserLogin().flatMap {
            userRepository.findOne(QUser.user.login.eq(it))
        }.map {
            val mv = ModelAndView(JeecgEntityExcelView())
            val list = service.loadAll(predicate, Sort.by("createdDate"))
            mv.addObject(NormalExcelConstants.FILE_NAME, entityName) // 此处设置的filename无效 ,前端会重更新设置一下
            mv.addObject(NormalExcelConstants.CLASS, TrackDTO::class.java)
            mv.addObject(
                NormalExcelConstants.PARAMS,
                ExportParams(
                    "资源列表",
                    "导出人:${it.userName}",
                    "资源表"
                )
            )
            mv.addObject(NormalExcelConstants.DATA_LIST, list)
            mv
        }.orElseThrow {
            UsernameNotFoundException("权限错误")
        }
    }
}
