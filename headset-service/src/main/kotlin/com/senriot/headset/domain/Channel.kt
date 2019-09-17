package com.senriot.headset.domain

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import java.io.Serializable
import javax.persistence.*
import javax.validation.constraints.Max
import javax.validation.constraints.Min
import javax.validation.constraints.NotNull

/**
 * The Channel entity.
 * @author A true hipster
 */
@Entity
@Table(name = "kx_channel")
class Channel(


        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(columnDefinition = "serial")
        var id: Long? = null,
        /**
         * 通道号(1-8)
         */
        @get: NotNull
        @get: Min(value = 1)
        @get: Max(value = 8)
        var ch: Int? = null,

        var currentPlayId: String? = "",

        var currentPlayName: String? = "",
        /**
         * 通道状态 0:空闲，1：播放中 2：暂停  8：禁用 -1：异常
         */
        var status: Int? = 0,

        @ManyToOne
        @JsonIgnore
        var device: Device? = null

) : Serializable
