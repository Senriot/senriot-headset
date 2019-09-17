package com.senriot.headset.service.dto

import com.senriot.cloud.common.AbstractEntityDTO
import com.senriot.headset.domain.FileInfo
import org.jeecgframework.poi.excel.annotation.Excel
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull

data class TrackDTO(

    @field:NotBlank
    override var name: String? = null,

    var fileInfo: FileInfo? = null,

    @Excel(name = "备注", width = 60.0)
    var remark: String? = null,

    /**
     * 状态 1:正常
     */
    @Excel(name = "是否禁用", width = 60.0)
    var disabled: Boolean = false,

    var userId: Long? = null,

    var userName: String? = null

) : AbstractEntityDTO<Long>()
