package com.senriot.headset.repository

import com.senriot.cloud.common.IRepository
import com.senriot.headset.domain.Device
import com.senriot.headset.domain.QDevice
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer
import org.springframework.data.querydsl.binding.QuerydslBindings
import org.springframework.stereotype.Repository
import java.util.*

/**
 * Spring Data MongoDB repository for the [Device] entity.
 */
@Suppress("unused")
@Repository
interface DeviceRepository : IRepository<Device, String>, QuerydslBinderCustomizer<QDevice>
{
    @JvmDefault
    override fun customize(bindings: QuerydslBindings, root: QDevice)
    {
        bindings.bind(root.deviceName).first { path, value -> path.containsIgnoreCase(value) }
        bindings.excluding(root.createdBy, root.createdDate, root.lastModifiedBy, root.lastModifiedDate)
    }

    fun findByDeviceId(deviceId: String): Optional<Device>
}
