package com.senriot.headset.repository

import com.senriot.cloud.common.IRepository
import com.senriot.headset.domain.DeviceMessage
import com.senriot.headset.domain.QDeviceMessage
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer
import org.springframework.data.querydsl.binding.QuerydslBindings
import org.springframework.stereotype.Repository

/**
 * Spring Data MongoDB repository for the [Device] entity.
 */
@Suppress("unused")
@Repository
interface MessageRepository : IRepository<DeviceMessage, String>, QuerydslBinderCustomizer<QDeviceMessage> {
    @JvmDefault
    override fun customize(bindings: QuerydslBindings, root: QDeviceMessage) {
        bindings.bind(root.device.deviceName).first { path, value -> path.containsIgnoreCase(value) }
    }
}
