package com.senriot.headset.domain


import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.stereotype.Indexed
import javax.persistence.*

@Entity
@Table(name = "se_city")
data class City(
        @Column(name = "area_code")
        @JsonIgnore
        val areaCode: String? = null,
        @Column(name = "city_code")
        @JsonIgnore
        val cityCode: String? = null,
        @Id
        val id: Int? = null,
        @JsonIgnore
        val lat: Double? = null,

        val level: Int? = null,
        @JsonIgnore
        val lng: Double? = null,
        @Column(name = "merger_name")
        @JsonIgnore
        val mergerName: String? = null,
        val name: String? = null,
        @Column(name = "parent_id")
        val parentId: Int? = null,
        @JsonIgnore
        val pinyin: String? = null,
        @Column(name = "short_name")
        @JsonIgnore
        val shortName: String? = null,
        @Column(name = "zip_code")
        @JsonIgnore
        val zipCode: String? = null
)
