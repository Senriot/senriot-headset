package com.senriot.headset.config

import io.github.jhipster.config.JHipsterProperties
import org.ehcache.config.builders.CacheConfigurationBuilder
import org.ehcache.config.builders.ExpiryPolicyBuilder
import org.ehcache.config.builders.ResourcePoolsBuilder
import org.ehcache.jsr107.Eh107Configuration
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer
import org.springframework.cache.annotation.EnableCaching
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.time.Duration

@Configuration
@EnableCaching
class CacheConfiguration(jHipsterProperties: JHipsterProperties)
{

    private val jcacheConfiguration: javax.cache.configuration.Configuration<Any, Any>

    init
    {
        val ehcache = jHipsterProperties.cache.ehcache

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(
                Any::class.java, Any::class.java,
                ResourcePoolsBuilder.heap(ehcache.maxEntries)
            )
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.timeToLiveSeconds.toLong())))
                .build()
        )
    }

    @Bean
    fun cacheManagerCustomizer(): JCacheManagerCustomizer
    {
        return JCacheManagerCustomizer { cm ->
            createCache(cm, com.senriot.headset.repository.UserRepository.USERS_BY_LOGIN_CACHE)
            createCache(cm, com.senriot.headset.repository.UserRepository.USERS_BY_EMAIL_CACHE)
            createCache(cm, com.senriot.headset.domain.User::class.java.name)
            createCache(cm, com.senriot.headset.domain.Authority::class.java.name)
            createCache(cm, com.senriot.headset.domain.User::class.java.name + ".authorities")
            // jhipster-needle-ehcache-add-entry
        }
    }

    private fun createCache(cm: javax.cache.CacheManager, cacheName: String)
    {
        val cache: javax.cache.Cache<Any, Any>? = cm.getCache(cacheName)
        if (cache != null)
        {
            cm.destroyCache(cacheName)
        }
        cm.createCache(cacheName, jcacheConfiguration)
    }
}
