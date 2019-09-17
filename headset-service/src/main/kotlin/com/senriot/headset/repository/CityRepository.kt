package com.senriot.headset.repository

import com.querydsl.core.types.dsl.StringPath
import com.senriot.cloud.common.IRepository
import com.senriot.headset.domain.City
import com.senriot.headset.domain.QCity
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer
import org.springframework.data.querydsl.binding.QuerydslBindings

interface CityRepository : IRepository<City, String>,
        QuerydslBinderCustomizer<QCity>
{
    @JvmDefault
    override fun customize(bindings: QuerydslBindings, root: QCity)
    {
        bindings.bind(String::class.java).first { path: StringPath, value: String -> path.eq(value) }
    }
}
