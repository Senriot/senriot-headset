package com.senriot.headset.service

import com.querydsl.core.BooleanBuilder
import com.querydsl.core.types.Predicate
import com.senriot.cloud.common.AbstractService
import com.senriot.cloud.common.error.BadRequestAlertException
import com.senriot.headset.domain.QTrack
import com.senriot.headset.domain.Track
import com.senriot.headset.repository.TrackRepository
import com.senriot.headset.repository.UserRepository
import com.senriot.headset.security.ADMIN
import com.senriot.headset.security.getCurrentUserLogin
import com.senriot.headset.security.isCurrentUserInRole
import com.senriot.headset.service.dto.TrackDTO
import com.senriot.headset.service.mapper.TrackMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class TracksService : AbstractService<Track, Long, TrackDTO, TrackRepository, TrackMapper>()
{
    @Autowired
    lateinit var userRepository: UserRepository

    override fun create(dto: TrackDTO): TrackDTO
    {
        var track = mapper.toEntity(dto)
        val login = getCurrentUserLogin().get()
        userRepository.findOneByLogin(login).map {
            track.user = it
        }
        track = repository.saveAndFlush(track)
        return mapper.toDto(track)
    }


    override fun loadAll(predicate: Predicate?, sort: Sort): List<TrackDTO>
    {
        return if (isCurrentUserInRole(ADMIN))
            super.loadAll(predicate, sort)
        else
        {
            getCurrentUserLogin().map {
                val p = BooleanBuilder()
                p.and(predicate).and(QTrack.track.user.login.eq(it))
                super.loadAll(p, sort)
            }.orElseThrow { BadRequestAlertException("用户不存在", "device", "usernull") }
        }
    }

    override fun loadPage(predicate: Predicate?, pageable: Pageable): Page<TrackDTO>
    {
        return if (isCurrentUserInRole(ADMIN))
            super.loadPage(predicate, pageable)
        else
        {
            getCurrentUserLogin().map {
                val p = BooleanBuilder()
                p.and(predicate).and(QTrack.track.user.login.eq(it))
                super.loadPage(p, pageable)
            }.orElseThrow { BadRequestAlertException("用户不存在", "device", "usernull") }
        }
    }

//    override fun loadPage(predicate: Predicate?, pageable: Pageable): Page<TrackDTO>
//    {
//        return if (isCurrentUserInRole(ADMIN))
//            super.loadPage(predicate, pageable)
//        else
//        {
//            getCurrentUserLogin().map {
//                val p = BooleanBuilder()
//                p.and(predicate).and(QTrack.track.user.login.eq(it))
//                super.loadPage(p, pageable)
//            }.orElseThrow { BadRequestAlertException("用户不存在", "device", "usernull") }
//        }
//    }
}
