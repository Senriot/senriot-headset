package com.senriot.headset.service

import cn.hutool.http.HttpUtil
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.querydsl.jpa.impl.JPAQueryFactory
import com.senriot.headset.domain.BookCategory
import com.senriot.headset.domain.BookResult
import com.senriot.headset.domain.Device
import com.senriot.headset.domain.QDevice
import com.senriot.headset.repository.DeviceRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*
import javax.persistence.EntityManager

@Service
@Transactional
class BookService(private val om: ObjectMapper,
                  private val entityManager: EntityManager,
                  private val deviceRepository: DeviceRepository)
{

    private val queryFactory by lazy {
        JPAQueryFactory(entityManager)
    }

    companion object
    {
        const val base_url = "https://wws.ximalaya.com/wws-lib/api/"
        const val libId = "3216"
    }

    fun getCategoryAndBook(): List<BookCategory?>?
    {
        val url = "${base_url}book/libId/$libId/categoryAndBook"
        val result = HttpUtil.get(url)
        val bookResult = om.readValue<BookResult<List<BookResult.Data>>>(result)
        return bookResult.data?.map { it.category }
    }

    fun saveDeviceCategory(deviceId: String, categories: IntArray): Long
    {
        val dev = QDevice.device
        return queryFactory.update(dev)
                .set(dev.bookCategories,categories)
                .where(dev.id.eq(deviceId))
                .execute()
    }
}
