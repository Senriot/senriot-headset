package com.senriot.headset.service

import com.senriot.cloud.common.AbstractService
import com.senriot.headset.domain.Store
import com.senriot.headset.repository.StoreRepository
import com.senriot.headset.service.dto.StoreDTO
import com.senriot.headset.service.mapper.StoreMapper
import org.springframework.stereotype.Service

@Service
class StoreService: AbstractService<Store, String, StoreDTO,StoreRepository,StoreMapper>()
{

}
