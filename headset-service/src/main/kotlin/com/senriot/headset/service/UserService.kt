package com.senriot.headset.service

import com.senriot.cloud.common.AbstractService
import com.senriot.cloud.common.error.EmailAlreadyUsedException
import com.senriot.cloud.common.error.InvalidPasswordException
import com.senriot.cloud.common.error.LoginAlreadyUsedException
import com.senriot.headset.config.ANONYMOUS_USER
import com.senriot.headset.config.DEFAULT_LANGUAGE
import com.senriot.headset.domain.QUser
import com.senriot.headset.domain.User
import com.senriot.headset.repository.RoleRepository
import com.senriot.headset.repository.UserRepository
import com.senriot.headset.security.getCurrentUserLogin
import com.senriot.headset.service.dto.UserDTO
import com.senriot.headset.service.mapper.UserMapper
import com.senriot.headset.service.util.generateActivationKey
import com.senriot.headset.service.util.generateResetKey
import org.slf4j.LoggerFactory
import org.springframework.cache.CacheManager
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.*

/**
 * Service class for managing users.
 */
@Service
@Transactional
class UserService(
    private val passwordEncoder: PasswordEncoder,
    private val authorityRepository: RoleRepository,
    private val cacheManager: CacheManager
) : AbstractService<User, Long, UserDTO, UserRepository, UserMapper>()
{

    private val log = LoggerFactory.getLogger(javaClass)

    fun activateRegistration(key: String): Optional<User>
    {
        log.debug("Activating user for activation key {}", key)
        return repository.findOneByActivationKey(key)
            .map { user ->
                user.activated = true
                user.activationKey = null
                clearUserCaches(user)
                log.debug("Activated user: {}", user)
                user
            }
    }

    fun completePasswordReset(newPassword: String, key: String): Optional<User>
    {
        log.debug("Reset user password for reset key {}", key)
        return repository.findOneByResetKey(key)
            .filter { user -> user.resetDate?.isAfter(Instant.now().minusSeconds(86400)) ?: false }
            .map { user ->
                user.password = passwordEncoder.encode(newPassword)
                user.resetKey = null
                user.resetDate = null
                clearUserCaches(user)
                user
            }
    }

    fun requestPasswordReset(mail: String): Optional<User>
    {
        return repository.findOneByEmailIgnoreCase(mail)
            .filter(User::activated)
            .map { user ->
                user.resetKey = generateResetKey()
                user.resetDate = Instant.now()
                clearUserCaches(user)
                user
            }
    }

    fun registerUser(userDTO: UserDTO, password: String): User
    {
        val login = userDTO.login ?: throw IllegalArgumentException("Empty login not allowed")
        val email = userDTO.email ?: throw IllegalArgumentException("Empty email not allowed")
        repository.findOneByLogin(login.toLowerCase()).ifPresent { existingUser ->
            val removed = removeNonActivatedUser(existingUser)
            if (!removed)
            {
                throw LoginAlreadyUsedException()
            }
        }
        repository.findOneByEmailIgnoreCase(email).ifPresent { existingUser ->
            val removed = removeNonActivatedUser(existingUser)
            if (!removed)
            {
                throw EmailAlreadyUsedException()
            }
        }
        val newUser = mapper.toEntity(userDTO)
        val encryptedPassword = passwordEncoder.encode(password)
        newUser.apply {
            this.login = login.toLowerCase()
            this.password = encryptedPassword
            this.email = email.toLowerCase()
            activated = false
            activationKey = generateActivationKey()
            authorities = mutableSetOf()
            authorityRepository.findByName(com.senriot.headset.security.USER).ifPresent { authorities.add(it) }
        }
        repository.save(newUser)
        clearUserCaches(newUser)
        log.debug("Created Information for User: {}", newUser)
        return newUser
    }

    private fun removeNonActivatedUser(existingUser: User): Boolean
    {
        if (existingUser.activated)
        {
            return false
        }
        repository.delete(existingUser)
        repository.flush()
        clearUserCaches(existingUser)
        return true
    }

    fun createUser(userDTO: UserDTO): User
    {
        val encryptedPassword = passwordEncoder.encode(userDTO.login)
        var user = mapper.toEntity(userDTO).apply {
            login = userDTO.login?.toLowerCase()
            email = userDTO.email?.toLowerCase()
            langKey = userDTO.langKey ?: DEFAULT_LANGUAGE // default language
            password = encryptedPassword
            resetKey = generateResetKey()
            resetDate = Instant.now()
            activated = true
        }
//        userDTO.authorities?.apply {
//            val authorities = this.asSequence()
//                    .map(authorityRepository::findByName)
//                    .filter(Optional<Role>::isPresent)
//                    .mapTo(mutableSetOf()) { it.get() }
//            user.authorities = authorities
//        }
        user = repository.save(user)
        clearUserCaches(user)
        log.debug("Created Information for User: {}", user)
        return user
    }


    /**
     * Update all information for a specific user, and return the modified user.
     *
     * @param userDTO user to update.
     * @return updated user.
     */
    fun updateUser(userDTO: UserDTO): Optional<UserDTO>
    {
        return Optional.of(repository.findById(userDTO.id!!))
            .filter(Optional<User>::isPresent)
            .map { it.get() }
            .map { user ->
                clearUserCaches(user)
                mapper.updateEntity(userDTO, user)
                user.apply {
                    login = userDTO.login!!.toLowerCase()
                    email = userDTO.email?.toLowerCase()
                }
                val managedAuthorities = user.authorities
                managedAuthorities.clear()
                userDTO.authorities?.apply {
                    this.asSequence()
                        .map { authorityRepository.findById(it) }
                        .filter { it.isPresent }
                        .mapTo(managedAuthorities) { it.get() }
                }
                this.clearUserCaches(user)
                log.debug("Changed Information for User: {}", user)
                user
            }
            .map { mapper.toDto(it) }
    }

    fun deleteUser(login: String)
    {
        repository.findOneByLogin(login).ifPresent { user ->
            repository.delete(user)
            clearUserCaches(user)
            log.debug("Deleted User: {}", user)
        }
    }

    fun changePassword(currentClearTextPassword: String, newPassword: String)
    {
        getCurrentUserLogin()
            .flatMap(repository::findOneByLogin)
            .ifPresent { user ->
                val currentEncryptedPassword = user.password
                if (!passwordEncoder.matches(currentClearTextPassword, currentEncryptedPassword))
                {
                    throw InvalidPasswordException()
                }
                val encryptedPassword = passwordEncoder.encode(newPassword)
                user.password = encryptedPassword
                clearUserCaches(user)
                log.debug("Changed password for User: {}", user)
            }
    }

    @Transactional(readOnly = true)
    fun getAllManagedUsers(pageable: Pageable): Page<UserDTO> =
        repository.findAllByLoginNot(pageable, ANONYMOUS_USER).map { mapper.toDto(it) }

    @Transactional(readOnly = true)
    fun getUserWithAuthoritiesByLogin(login: String): Optional<User> =
        repository.findOneWithAuthoritiesByLogin(login)

    @Suppress("unused")
    @Transactional(readOnly = true)
    fun getUserWithAuthorities(id: Long): Optional<User> =
        repository.findOneWithAuthoritiesById(id)

    @Transactional(readOnly = true)
    fun getUserWithAuthorities(): Optional<User> =
        getCurrentUserLogin().flatMap(repository::findOneWithAuthoritiesByLogin)

    /**
     * Not activated users should be automatically deleted after 3 days.
     *
     * This is scheduled to get fired everyday, at 01:00 (am).
     */
    @Scheduled(cron = "0 0 1 * * ?")
    fun removeNotActivatedUsers()
    {
        repository
            .findAllByActivatedIsFalseAndActivationKeyIsNotNullAndCreatedDateBefore(
                Instant.now().minus(3, ChronoUnit.DAYS)
            )
            .forEach { user ->
                log.debug("Deleting not activated user {}", user.login)
                repository.delete(user)
                clearUserCaches(user)
            }
    }


    fun getDeviceManagers(): List<UserDTO>
    {
        return repository.findAll(QUser.user.authorities.any().name.eq("ROLE_MANAGER")).map { mapper.toDto(it) }
    }

    /**
     * @return a list of all the authorities
     */
    fun getAuthorities() = authorityRepository.findAll().asSequence().map { it.name }.filterNotNullTo(mutableListOf())

    private fun clearUserCaches(user: User)
    {
        cacheManager.getCache(UserRepository.USERS_BY_LOGIN_CACHE)?.evict(user.login!!)
        cacheManager.getCache(UserRepository.USERS_BY_EMAIL_CACHE)?.evict(user.email!!)
    }
}
