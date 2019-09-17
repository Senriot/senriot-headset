package com.senriot.headset.domain

import com.senriot.headset.domain.Menu
import javax.persistence.*
import javax.validation.constraints.Size

@Entity
@Table(name = "se_permission")
data class Permission(
        @javax.persistence.Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long? = null,

        @field:Size(max = 20)
        @Column(length = 20, nullable = false, unique = true)
        var name: String? = null,


        @field:Size(max = 20)
        @Column(length = 20, nullable = false, unique = true)
        var code: String? = null,

        var status: String? = null,

        @ManyToOne
        @MapsId
        var menu: Menu? = null
)
