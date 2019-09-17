package com.senriot.headset.repository

import com.senriot.cloud.common.IRepository
import org.springframework.cache.annotation.Cacheable
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer
import org.springframework.data.querydsl.binding.QuerydslBindings
import org.springframework.stereotype.Repository
import java.time.Instant
import java.util.*
import com.querydsl.core.types.dsl.StringPath
import com.senriot.headset.domain.QUser
import com.senriot.headset.domain.User


/**
* Spring Data JPA repository for the [User] entity.
*/
@Repository
interface UserRepository : IRepository<User, Long>, QuerydslBinderCustomizer<QUser>
{

    fun findOneByActivationKey(activationKey: String): Optional<User>

    fun findAllByActivatedIsFalseAndActivationKeyIsNotNullAndCreatedDateBefore(dateTime: Instant): List<User>

    fun findOneByResetKey(resetKey: String): Optional<User>

    fun findOneByEmailIgnoreCase(email: String?): Optional<User>

    fun findOneByLogin(login: String): Optional<User>

    @EntityGraph(attributePaths = ["authorities"])
    fun findOneWithAuthoritiesById(id: Long): Optional<User>

    @EntityGraph(attributePaths = ["authorities"])
    @Cacheable(cacheNames = [USERS_BY_LOGIN_CACHE])
    fun findOneWithAuthoritiesByLogin(login: String): Optional<User>

    @EntityGraph(attributePaths = ["authorities"])
    @Cacheable(cacheNames = [USERS_BY_EMAIL_CACHE])
    fun findOneWithAuthoritiesByEmailIgnoreCase(email: String): Optional<User>

    fun findAllByLoginNot(pageable: Pageable, login: String): Page<User>

    companion object
    {

        const val USERS_BY_LOGIN_CACHE: String = "usersByLogin"

        const val USERS_BY_EMAIL_CACHE: String = "usersByEmail"
    }

    @JvmDefault
    override fun customize(bindings: QuerydslBindings, root: QUser)
    {
        bindings.bind(String::class.java).first { path: StringPath, value: String -> path.containsIgnoreCase(value) }
        bindings.excluding(root.createdBy, root.createdDate, root.lastModifiedBy, root.lastModifiedDate)
    }
}
