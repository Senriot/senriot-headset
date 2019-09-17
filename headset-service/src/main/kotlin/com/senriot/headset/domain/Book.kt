package com.senriot.headset.domain

data class Book(
        var albumId: Int? = null,
        var albumUrl: String? = null,
        var canPlay: Boolean? = null,
        var content: String? = null,
        var countTrack: Int? = null,
        var coverPath: String? = null,
        var disabled: Boolean? = null,
        var hasBuy: Boolean? = null,
        var hasCollected: Boolean? = null,
        var inVipFreeList: Int? = null,
        var intro: String? = null,
        var isFinish: Int? = null,
        var materialId: Int? = null,
        var materialType: Int? = null,
        var originTitle: String? = null,
        var paid: Boolean? = null,
        var playCount: Int? = null,
        var priceType: Int? = null,
        var recommend: String? = null,
        var title: String? = null,
        var uid: Int? = null
)
