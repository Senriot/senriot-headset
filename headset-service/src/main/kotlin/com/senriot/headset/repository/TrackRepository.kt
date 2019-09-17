package com.senriot.headset.repository

import com.senriot.cloud.common.IRepository
import com.senriot.headset.domain.QTrack
import com.senriot.headset.domain.Track
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer
import org.springframework.data.querydsl.binding.QuerydslBindings

interface TrackRepository : IRepository<Track, Long>, QuerydslBinderCustomizer<QTrack>
{
    @JvmDefault
    override fun customize(bindings: QuerydslBindings, root: QTrack)
    {
        bindings.bind(root.name).first { path, value -> path.containsIgnoreCase(value) }
        bindings.excluding(root.createdBy, root.createdDate, root.lastModifiedBy, root.lastModifiedDate)
    }
}
