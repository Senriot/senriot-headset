package com.senriot.headset.domain

import javax.persistence.*

@Entity
@Table(name = "kx_track")
data class Track(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "serial")
    var id: Long? = null,

    @Column(length = 64, nullable = false)
    var name: String? = null,

//    @Column(nullable = false)
//    var url: String? = null,

    @Embedded
    var fileInfo: FileInfo? = null,

    var remark: String? = null,

    /**
     * 状态 1:正常
     */
    var disabled: Boolean = false,

    /**
     * 所属用户
     */
    @ManyToOne
    var user: User? = null

) : AbstractAuditingEntity()
