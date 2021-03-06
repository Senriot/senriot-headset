package com.senriot.headset.domain

import java.io.Serializable
import java.time.Instant
import javax.persistence.*
import javax.validation.constraints.NotNull

/**
 * Persist AuditEvent managed by the Spring Boot actuator.
 *
 * @see org.springframework.boot.actuate.audit.AuditEvent
 */
@Entity
@Table(name = "se_persistent_audit_event")
class PersistentAuditEvent(

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "event_id")
    var id: Long? = null,

    @field:NotNull
    @Column(nullable = false)
    var principal: String? = null,

    @Column(name = "event_date")
    var auditEventDate: Instant? = null,

    @Column(name = "event_type")
    var auditEventType: String? = null,

    @ElementCollection
    @MapKeyColumn(name = "name")
    @Column(name = "value")
    @CollectionTable(name = "se_persistent_audit_evt_data", joinColumns = [JoinColumn(name = "event_id")])
    var data: MutableMap<String, String?> = mutableMapOf()

) : Serializable
{

    override fun equals(other: Any?): Boolean
    {
        if (this === other) return true
        if (other !is PersistentAuditEvent) return false
        if (other.id == null || id == null) return false

        return id == other.id
    }

    override fun hashCode() = 31

    override fun toString() = "PersistentAuditEvent{" +
            "principal='" + principal + '\'' +
            ", auditEventDate=" + auditEventDate +
            ", auditEventType='" + auditEventType + '\'' +
            '}'

    companion object
    {
        private const val serialVersionUID = 1L
    }
}
