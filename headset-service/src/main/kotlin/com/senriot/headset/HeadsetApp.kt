package com.senriot.headset

import com.alibaba.nacos.api.config.ConfigType
import com.alibaba.nacos.spring.context.annotation.config.NacosPropertySource
import com.alibaba.nacos.spring.context.annotation.config.NacosPropertySources
import com.senriot.headset.config.ApplicationProperties
import com.senriot.headset.config.addDefaultProfile
import io.github.jhipster.config.JHipsterConstants
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.InitializingBean
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication
import org.springframework.core.env.Environment
import org.springframework.core.env.StandardEnvironment.SYSTEM_ENVIRONMENT_PROPERTY_SOURCE_NAME
import org.springframework.core.env.StandardEnvironment.SYSTEM_PROPERTIES_PROPERTY_SOURCE_NAME
import java.net.InetAddress
import java.net.UnknownHostException

@SpringBootApplication
@EnableConfigurationProperties(ApplicationProperties::class)
@NacosPropertySources(
    NacosPropertySource(
        dataId = "headset",
        first = true,
        autoRefreshed = true,
        type = ConfigType.YAML,
        before = SYSTEM_PROPERTIES_PROPERTY_SOURCE_NAME,
        after = SYSTEM_ENVIRONMENT_PROPERTY_SOURCE_NAME
    )
)
//@NacosPropertySource(groupId = "kx", dataId = "quickup-dev.yaml", type = ConfigType.YAML)
class HeadsetApp(private val env: Environment) : InitializingBean
{

    private val log = LoggerFactory.getLogger(javaClass)

    /**
     * Initializes quickup.
     *
     * Spring profiles can be configured with a program argument --spring.profiles.active=your-active-profile
     *
     * You can find more information on how profiles work with JHipster on [https://www.jhipster.tech/profiles/]("https://www.jhipster.tech/profiles/").
     */
    @Throws(Exception::class)
    override fun afterPropertiesSet()
    {
        val activeProfiles = env.activeProfiles
        if (
            activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_DEVELOPMENT) &&
            activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_PRODUCTION)
        )
        {
            log.error(
                "You have misconfigured your application! It should not run " +
                        "with both the 'dev' and 'prod' profiles at the same time."
            )
        }
        if (
            activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_DEVELOPMENT) &&
            activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_CLOUD)
        )
        {
            log.error(
                "You have misconfigured your application! It should not " +
                        "run with both the 'dev' and 'cloud' profiles at the same time."
            )
        }
    }

    companion object
    {
        /**
         * Main method, used to run the application.
         *
         * @param args the command line arguments.
         */
        @JvmStatic
        fun main(args: Array<String>)
        {
            val env = runApplication<HeadsetApp>(*args) { addDefaultProfile(this) }.environment
            logApplicationStartup(env)
        }

        @JvmStatic
        private fun logApplicationStartup(env: Environment)
        {
            val log = LoggerFactory.getLogger(HeadsetApp::class.java)

            var protocol = "http"
            if (env.getProperty("server.ssl.key-store") != null)
            {
                protocol = "https"
            }
            val serverPort = env.getProperty("server.port")
            var contextPath = env.getProperty("server.servlet.context-path")
            if (contextPath.isNullOrBlank())
            {
                contextPath = "/"
            }
            var hostAddress = "localhost"
            try
            {
                hostAddress = InetAddress.getLocalHost().hostAddress
            }
            catch (e: UnknownHostException)
            {
                log.warn("The host name could not be determined, using `localhost` as fallback")
            }
            log.info(
                "\n----------------------------------------------------------\n\t" +
                        "Application '{}' is running! Access URLs:\n\t" +
                        "Local: \t\t{}://localhost:{}{}\n\t" +
                        "External: \t{}://{}:{}{}\n\t" +
                        "Profile(s): \t{}\n----------------------------------------------------------",
                env.getProperty("spring.application.name"),
                protocol,
                serverPort,
                contextPath,
                protocol,
                hostAddress,
                serverPort,
                contextPath,
                env.activeProfiles
            )
        }
    }
}
