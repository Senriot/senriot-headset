group = "com.senriot.headset"
version = "0.0.1"

plugins {
    id("org.springframework.boot")
    id("com.github.node-gradle.node")
    id("com.bmuschko.docker-spring-boot-application") version "4.10.0"
}

//apply plugin: "org.springframework.boot"
//apply plugin: "propdeps"
//
//apply from: "gradle/docker.gradle"
//apply from: "gradle/sonar.gradle"
//apply from: 'gradle/kotlin.gradle'
apply {
    from("$rootDir/gradle/kotlin.gradle")
    if (project.hasProperty("prod"))
    {
        from("gradle/profile_prod.gradle")
    }
    else
    {
        from("gradle/profile_dev.gradle")
    }
    if (project.hasProperty("war"))
    {
        from("gradle/war.gradle")
    }
}

defaultTasks("bootRun")

springBoot {
    mainClassName = "com.senriot.headset.HeadsetApp"
}



dependencies {
    implementation("com.senriot:common:0.0.2")
    implementation(project(":headset-client"))
    implementation ("cn.hutool:hutool-all:4.6.6")
    implementation("com.senriot.cloud:aliyun-sdk:0.0.2")
    implementation("com.egzosn:pay-java-ali:2.12.8")
    implementation("com.egzosn:pay-java-wx:2.12.8")
    implementation("io.reactivex.rxjava2:rxkotlin:2.4.0")
    implementation("io.reactivex.rxjava2:rxjava:2.2.11")
    implementation("org.projectreactor:reactor-spring:1.0.1.RELEASE")
    implementation("com.querydsl:querydsl-jpa:4.2.1")
    implementation("com.alibaba.boot:nacos-config-spring-boot-starter:0.2.3")
    implementation("org.springframework.boot:spring-boot-starter-cache")
    implementation("io.dropwizard.metrics:metrics-core")
    implementation("io.micrometer:micrometer-registry-prometheus")
    implementation("net.logstash.logback:logstash-logback-encoder")
    implementation("com.fasterxml.jackson.datatype:jackson-datatype-hppc")
    implementation("com.fasterxml.jackson.datatype:jackson-datatype-jsr310")
    implementation("com.fasterxml.jackson.datatype:jackson-datatype-hibernate5")
    implementation("com.fasterxml.jackson.core:jackson-annotations")
    implementation("com.fasterxml.jackson.core:jackson-databind")
    implementation("com.fasterxml.jackson.module:jackson-module-afterburner")
    implementation("javax.cache:cache-api")
    implementation("org.hibernate:hibernate-core")
    implementation("com.zaxxer:HikariCP")
    implementation("org.apache.commons:commons-lang3")
    implementation("commons-io:commons-io")
    implementation("javax.transaction:javax.transaction-api")
    implementation("org.ehcache:ehcache")
    implementation("org.hibernate:hibernate-jcache")
    implementation("org.hibernate:hibernate-entitymanager")
    implementation("org.hibernate:hibernate-envers")
    implementation("org.hibernate.validator:hibernate-validator")
    implementation("org.springframework.boot:spring-boot-loader-tools")
    implementation("org.springframework.boot:spring-boot-starter-mail")
    implementation("org.springframework.boot:spring-boot-starter-logging")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-aop")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-web") {
        exclude(module = "spring-boot-starter-tomcat")
    }
    implementation("org.springframework.boot:spring-boot-starter-undertow")
    implementation("org.springframework.boot:spring-boot-starter-websocket")
    implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
    implementation("org.zalando:problem-spring-web")
    implementation("org.springframework.boot:spring-boot-starter-cloud-connectors")
    implementation("org.springframework.security:spring-security-config")
    implementation("org.springframework.security:spring-security-data")
    implementation("org.springframework.security:spring-security-web")
    implementation("org.springframework.security:spring-security-messaging")
    implementation("io.jsonwebtoken:jjwt-api")
    runtimeOnly("io.jsonwebtoken:jjwt-impl")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson")
    implementation("io.springfox:springfox-swagger2") {
        exclude(module = "mapstruct")
    }
    implementation("io.springfox:springfox-bean-validators")
    implementation("com.github.xiaoymin:swagger-bootstrap-ui:1.9.5")
    implementation("org.postgresql:postgresql")
    implementation("org.mapstruct:mapstruct:${Deps.mapstruct_version}")
}
docker {
    springBootApplication {
        baseImage.set("openjdk:8-alpine")
        ports.set(listOf(8890))
        tag.set("senriot-headset:latest")
        jvmArgs.set(
            listOf(
                "-Dspring.profiles.active=prod,swagger",
                "-Dspring_output_ansi_enabled=ALWAYS",
                "-Duser.timezone=GMT+08"
            )
        )
    }
}
