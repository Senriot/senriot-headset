package com.senriot.headset.service

import com.senriot.cloud.common.AbstractService
import com.senriot.headset.domain.Menu
import com.senriot.headset.repository.MenuRepository
import com.senriot.headset.service.dto.MenuDTO
import com.senriot.headset.service.mapper.MenuMapper
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * Service Implementation for managing [Menu].
 */
@Service
@Transactional
class MenuService(
) : AbstractService<Menu, Long, MenuDTO, MenuRepository, MenuMapper>()
{
}
