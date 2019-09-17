package com.senriot.headset.config

import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer
import com.fasterxml.jackson.datatype.jsr310.deser.LocalTimeDeserializer
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer
import com.fasterxml.jackson.datatype.jsr310.ser.LocalTimeSerializer
import com.fasterxml.jackson.module.afterburner.AfterburnerModule
import com.senriot.cloud.common.utils.DateUtil
import com.senriot.cloud.common.utils.InstantCustomDeserializer
import com.senriot.cloud.common.utils.InstantCustomSerializer

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.zalando.problem.ProblemModule
import org.zalando.problem.violations.ConstraintViolationProblemModule
import java.time.Instant
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime

@Configuration
class JacksonConfiguration
{

    /**
     * Support for Java date and time API.
     * @return the corresponding Jackson module.
     */
    @Bean
    fun javaTimeModule() = JavaTimeModule().apply {
        addDeserializer(LocalDateTime::class.java, LocalDateTimeDeserializer(DateUtil.DATETIME_FORMATTER))
        addDeserializer(LocalDate::class.java, LocalDateDeserializer(DateUtil.DATE_FORMATTER))
        addDeserializer(LocalTime::class.java, LocalTimeDeserializer(DateUtil.TIME_FORMATTER))
        addDeserializer(Instant::class.java, InstantCustomDeserializer())
        addSerializer(LocalDateTime::class.java, LocalDateTimeSerializer(DateUtil.DATETIME_FORMATTER))
        addSerializer(LocalDate::class.java, LocalDateSerializer(DateUtil.DATE_FORMATTER))
        addSerializer(LocalTime::class.java, LocalTimeSerializer(DateUtil.TIME_FORMATTER))
        addSerializer(Instant::class.java, InstantCustomSerializer(DateUtil.DATETIME_FORMATTER))
    }

    @Bean
    fun jdk8TimeModule() = Jdk8Module()

    /*
     * Support for Hibernate types in Jackson.
     */
    @Bean
    fun hibernate5Module() = Hibernate5Module()

    /*
     * Jackson Afterburner module to speed up serialization/deserialization.
     */
    @Bean
    fun afterburnerModule() = AfterburnerModule()

    /*
     * Module for serialization/deserialization of RFC7807 Problem.
     */
    @Bean
    fun problemModule() = ProblemModule()

    /*
     * Module for serialization/deserialization of ConstraintViolationProblem.
     */
    @Bean
    fun constraintViolationProblemModule() = ConstraintViolationProblemModule()
}
