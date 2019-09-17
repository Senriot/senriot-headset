package com.senriot.headset.service

import com.senriot.cloud.common.AbstractService
import com.senriot.headset.domain.Role
import com.senriot.headset.repository.RoleRepository
import com.senriot.headset.service.dto.RoleDTO
import com.senriot.headset.service.mapper.RoleMapper
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * Service Implementation for managing [Role].
 */
@Service
@Transactional
class RoleService : AbstractService<Role, Long, RoleDTO, RoleRepository, RoleMapper>()
{
//    override fun update(dto: RoleDTO): Optional<RoleDTO>
//    {
//        return repository.findById(dto.id!!).map { role ->
//            val e = mapper.updateEntity(dto, role)
//            log.info("更新 $e")
//            e.menus?.forEach { it.addRole(e) }
//            mapper.toDto(repository.saveAndFlush(e))
//        }
//    }
}
