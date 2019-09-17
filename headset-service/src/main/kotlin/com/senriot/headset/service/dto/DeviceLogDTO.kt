package com.senriot.headset.service.dto

import com.senriot.headset.domain.enums.MessageLogType
import java.time.LocalDateTime

data class DeviceLogDTO(
    var messageId: String? = null,
    var generateTime: LocalDateTime? = null,
    var payload: Map<String, Any>? = null,
    var deviceId: String? = null,
    var msgType: MessageLogType? = null,
    var deviceName: String? = null
)
