package com.senriot.headset.domain

import org.jeecgframework.poi.excel.annotation.Excel
import javax.persistence.Embeddable

@Embeddable
data class FileInfo(
    @Excel(name = "文件名称", width = 30.0)
    var fileName: String? = null,
    @Excel(name = "文件链接", width = 50.0)
    var url: String? = null,
    @Excel(name = "服务器", width = 30.0)
    var domain: String? = null,
    var path: String? = null,
    @Excel(name = "文件大小", width = 30.0)
    var size: Long? = null
)
