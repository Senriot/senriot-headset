package com.senriot.headset.web.rest

import com.querydsl.core.types.Predicate
import com.senriot.headset.domain.Address
import com.senriot.headset.domain.City
import com.senriot.headset.domain.QCity
import com.senriot.headset.repository.CityRepository
import org.apache.poi.hpbf.model.qcbits.QCBit
import org.springframework.data.domain.Sort
import org.springframework.data.querydsl.binding.QuerydslPredicate
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
@RequestMapping("/api/cities")
class CityResource(private val cityRepository: CityRepository)
{
    @GetMapping
    fun getCities(@QuerydslPredicate(root = City::class) predicate: Predicate): MutableIterable<City>
    {
        return cityRepository.findAll(predicate, Sort.by("id"))
    }

    @GetMapping("/address")
    fun getAddress(@RequestParam areaCode: String): Optional<Address>?
    {
        return cityRepository.findOne(QCity.city.areaCode.eq(areaCode)).map {
            val result = Address()
            result.district = it
            result.city = cityRepository.findOne(QCity.city.id.eq(it.parentId)).get()
            result.province = cityRepository.findOne(QCity.city.id.eq(result.city?.parentId)).get()
            result
        }
    }

    @GetMapping("/city")
    fun getAllCity(level: Int): MutableIterable<City>
    {
        return cityRepository.findAll(QCity.city.level.loe(level), QCity.city.id.asc())
    }
}
