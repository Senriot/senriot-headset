package com.senriot.headset.repository

import com.senriot.cloud.common.IRepository
import com.senriot.headset.domain.QStore
import com.senriot.headset.domain.Store
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer
import org.springframework.data.querydsl.binding.QuerydslBindings
import org.springframework.stereotype.Repository


@Repository
interface StoreRepository : IRepository<Store, String>,
        QuerydslBinderCustomizer<QStore>
{

    @JvmDefault
    override fun customize(bindings: QuerydslBindings, root: QStore)
    {
        bindings.bind(root.name).first { path, value -> path.containsIgnoreCase(value) }
        bindings.excluding(root.createdBy, root.createdDate, root.lastModifiedBy, root.lastModifiedDate)
    }
}
