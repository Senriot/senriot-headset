package com.senriot.headset.domain

import com.senriot.headset.domain.Device
import com.senriot.headset.domain.enums.MessageLogType
import org.hibernate.annotations.Type
import java.time.LocalDateTime
import javax.persistence.*

@Table(name = "kx_device_log")
@Entity
data class DeviceMessage(
    @Id
    var messageId: String? = null,
    var generateTime: LocalDateTime? = null,
    var topic: String? = null,
    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb")
    var payload: Map<String, Any>? = null,
    @ManyToOne
    var device: Device? = null,
    var msgType: MessageLogType? = null,
    var productKey: String? = null
)
{

}
