package com.senriot.headset.repository

import com.senriot.cloud.common.IRepository
import com.senriot.headset.domain.QRole
import com.senriot.headset.domain.Role
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer
import org.springframework.data.querydsl.binding.QuerydslBindings
import org.springframework.stereotype.Repository
import java.util.*

/**
 * Spring Data  repository for the [Role] entity.
 */
@Suppress("unused")
@Repository
interface RoleRepository : IRepository<Role, Long>, QuerydslBinderCustomizer<QRole>
{

    fun findByName(name: String): Optional<Role>

    @JvmDefault
    override fun customize(bindings: QuerydslBindings, root: QRole)
    {
        bindings.bind(root.name).first { path, value -> path.containsIgnoreCase(value) }
        bindings.excluding(root.createdBy, root.createdDate, root.lastModifiedBy, root.lastModifiedDate)
    }
}
