package com.senriot.headset.web.rest

import com.querydsl.core.types.Predicate
import com.senriot.cloud.common.AbstractController
import com.senriot.cloud.common.annotation.EntityName
import com.senriot.cloud.common.security.getCurrentUserLogin
import com.senriot.headset.domain.Channel
import com.senriot.headset.domain.Device
import com.senriot.headset.domain.QUser
import com.senriot.headset.repository.UserRepository
import com.senriot.headset.service.DeviceService
import com.senriot.headset.service.dto.DeviceDTO
import com.senriot.headset.service.dto.DeviceLogDTO
import com.senriot.headset.service.dto.DeviceSecretDTO
import com.senriot.headset.service.dto.DeviceStatistics
import io.github.jhipster.web.util.HeaderUtil
import org.jeecgframework.poi.excel.def.NormalExcelConstants
import org.jeecgframework.poi.excel.entity.ExportParams
import org.jeecgframework.poi.excel.view.JeecgEntityExcelView
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.querydsl.binding.QuerydslPredicate
import org.springframework.http.ResponseEntity
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.ModelAndView
import java.time.LocalDate
import java.util.*

/**
 * REST controller for managing [cloud.seri.service.hf.domain.Device].
 */
@RestController
@RequestMapping("/api/devices")
@EntityName("device")
class DeviceResource(
    private val userRepository: UserRepository
) : AbstractController<Device, String, DeviceDTO, DeviceService>()
{
    /**
     * 查询指定产品下的设备统计数据
     *
     * @param pk 设备所隶属的产品Key
     *
     * @Des 描述：
     */
    @GetMapping("/statistics")
    fun queryDeviceStatistics(): DeviceStatistics
    {
        return service.queryDeviceStatistics()
    }

    /**
     * 禁用指定设备
     *
     * @param IotId 设备的名称  非必须
     * @param pk 产品名称  非必须
     * @param DeviceName 设备的名称  非必须
     * @return 产品创建信息
     */
    @PostMapping("/disable/{id}")
    fun disableThing(@PathVariable id: String): ResponseEntity<Void>?
    {
        service.disableThing(id)
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createAlert(applicationName, "deviceManager.disableThing", id)).build()
    }

    /**
     * 启用指定设备
     *
     * @param IotId 设备的名称  非必须
     * @param pk 产品名称  非必须
     * @param DeviceName 设备的名称  非必须
     * @return 产品创建信息
     */
    @PostMapping("/enable/{id}")
    fun enableThing(@PathVariable id: String): ResponseEntity<Void>
    {
        service.enableThing(id)
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createAlert(applicationName, "deviceManager.enableThing", id)).build()
    }

//    @GetMapping("/channels/{deviceId}")
//    fun getChannels(@PathVariable deviceId: String): List<Channel>
//    {
//        return service.getChannels(deviceId)
//    }

    @GetMapping("/logs")
    fun getLogs(pageable: Pageable, @RequestParam deviceId: String) = service.getLogs(pageable, deviceId)

    @GetMapping("/logs", params = ["fromDate", "toDate"])
    fun getLogsByDates(
        pageable: Pageable,
        @RequestParam deviceId: String,
        @RequestParam(value = "fromDate") fromDate: LocalDate,
        @RequestParam(value = "toDate") toDate: LocalDate
    ): Page<DeviceLogDTO>
    {
        return service.getLogs(pageable, deviceId, fromDate, toDate)
    }

    @PostMapping("/play-service/{deviceId}")
    fun playService(@PathVariable deviceId: String, @RequestBody req: MutableMap<String, Any>): MutableMap<String, Any>?
    {
        return service.playService(deviceId, req)
    }

    override fun loadAll(sort: Sort, @QuerydslPredicate(root = Device::class) predicate: Predicate?): List<DeviceDTO>
    {
        return super.loadAll(sort, predicate)
    }

    override fun loadPage(
        page: Pageable, @QuerydslPredicate(root = Device::class)
        predicate: Predicate?
    ): Page<DeviceDTO>
    {
        return super.loadPage(page, predicate)
    }

    override fun count(@QuerydslPredicate(root = Device::class) predicate: Predicate?): ResponseEntity<Long>
    {
        return super.count(predicate)
    }

    override fun exportXls(@QuerydslPredicate(root = Device::class) predicate: Predicate?): ModelAndView
    {
        return getCurrentUserLogin().flatMap {
            userRepository.findOne(QUser.user.login.eq(it))
        }.map {
            val mv = ModelAndView(JeecgEntityExcelView())
            val list = service.loadAll(predicate, Sort.by("createdDate"))
            mv.addObject(NormalExcelConstants.FILE_NAME, entityName) // 此处设置的filename无效 ,前端会重更新设置一下
            mv.addObject(NormalExcelConstants.CLASS, DeviceDTO::class.java)
            mv.addObject(
                NormalExcelConstants.PARAMS,
                ExportParams(
                    "设备列表",
                    "导出人:${it.userName}",
                    "设备表"
                )
            )
            mv.addObject(NormalExcelConstants.DATA_LIST, list)
            mv
        }.orElseThrow {
            UsernameNotFoundException("权限错误")
        }
    }

    @GetMapping("/channels/{deviceId}")
    fun getChannels(@PathVariable deviceId: String): List<Channel>
    {
        return service.getChannels(deviceId)
    }

    @GetMapping("/secret/{deviceId}")
    fun getDeviceSecret(@PathVariable deviceId: String): Optional<DeviceSecretDTO>?
    {
        return service.getDeviceSecret(deviceId)
    }
}
