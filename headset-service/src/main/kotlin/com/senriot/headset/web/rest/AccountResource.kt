package com.senriot.headset.web.rest

import com.senriot.cloud.common.error.EmailAlreadyUsedException
import com.senriot.cloud.common.error.EmailNotFoundException
import com.senriot.cloud.common.error.InvalidPasswordException
import com.senriot.headset.repository.UserRepository
import com.senriot.headset.security.getCurrentUserLogin
import com.senriot.headset.service.MailService
import com.senriot.headset.service.UserService
import com.senriot.headset.service.dto.PasswordChangeDTO
import com.senriot.headset.service.dto.UserDTO
import com.senriot.headset.service.mapper.UserMapper
import com.senriot.headset.web.rest.vm.KeyAndPasswordVM
import com.senriot.headset.web.rest.vm.ManagedUserVM
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest
import javax.validation.Valid

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
class AccountResource(
    private val userRepository: UserRepository,
    private val userService: UserService,
    private val mailService: MailService,
    private val userMapper: UserMapper
)
{

    internal class AccountResourceException(message: String) : RuntimeException(message)

    private val log = LoggerFactory.getLogger(javaClass)

    /**
     * `POST  /register` : register the user.
     *
     * @param managedUserVM the managed user View Model.
     * @throws InvalidPasswordException `400 (Bad Request)` if the password is incorrect.
     * @throws EmailAlreadyUsedException `400 (Bad Request)` if the email is already used.
     * @throws LoginAlreadyUsedException `400 (Bad Request)` if the login is already used.
     */
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    fun registerAccount(@Valid @RequestBody managedUserVM: ManagedUserVM)
    {
        if (!checkPasswordLength(managedUserVM.password))
        {
            throw InvalidPasswordException()
        }
        val user = userService.registerUser(managedUserVM, managedUserVM.password!!)
        mailService.sendActivationEmail(user)
    }

    /**
     * `GET  /activate` : activate the registered user.
     *
     * @param key the activation key.
     * @throws RuntimeException `500 (Internal Server Error)` if the user couldn't be activated.
     */
    @GetMapping("/activate")
    fun activateAccount(@RequestParam(value = "key") key: String)
    {
        val user = userService.activateRegistration(key)
        if (!user.isPresent)
        {
            throw AccountResourceException("No user was found for this activation key")
        }
    }

    /**
     * `GET  /authenticate` : check if the user is authenticated, and return its login.
     *
     * @param request the HTTP request.
     * @return the login if the user is authenticated.
     */
    @GetMapping("/authenticate")
    fun isAuthenticated(request: HttpServletRequest): String?
    {
        log.debug("REST request to check if the current user is authenticated")
        return request.remoteUser
    }

    /**
     * `GET  /account` : get the current user.
     *
     * @return the current user.
     * @throws RuntimeException `500 (Internal Server Error)` if the user couldn't be returned.
     */
    @GetMapping("/account")
    fun getAccount(): UserDTO =
        userService.getUserWithAuthorities()
            .map { userMapper.toDto(it) }
            .orElseThrow { AccountResourceException("User could not be found") }

    /**
     * POST  /account : update the current user information.
     *
     * @param userDTO the current user information
     * @throws EmailAlreadyUsedException `400 (Bad Request)` if the email is already used.
     * @throws RuntimeException `500 (Internal Server Error)` if the user login wasn't found.
     */
    @PostMapping("/account")
    fun saveAccount(@Valid @RequestBody userDTO: UserDTO)
    {
        val userLogin = getCurrentUserLogin()
            .orElseThrow { AccountResourceException("") }
        val existingUser = userRepository.findOneByEmailIgnoreCase(userDTO.email)
        if (existingUser.isPresent && !existingUser.get().login.equals(userLogin, ignoreCase = true))
        {
            throw EmailAlreadyUsedException()
        }
        val user = userRepository.findOneByLogin(userLogin)
        if (!user.isPresent)
        {
            throw AccountResourceException("User could not be found")
        }
        userService.updateUser(userDTO)
    }

    /**
     * POST  /account/change-password : changes the current user's password.
     *
     * @param passwordChangeDto current and new password.
     * @throws InvalidPasswordException `400 (Bad Request)` if the new password is incorrect.
     */
    @PostMapping(path = ["/account/change-password"])
    fun changePassword(@RequestBody passwordChangeDto: PasswordChangeDTO)
    {
        if (!checkPasswordLength(passwordChangeDto.newPassword))
        {
            throw InvalidPasswordException()
        }
        userService.changePassword(passwordChangeDto.currentPassword!!, passwordChangeDto.newPassword!!)
    }

    /**
     * POST   /account/reset-password/init : Send an email to reset the password of the user
     *
     * @param mail the mail of the user
     * @throws EmailNotFoundException `400 (Bad Request)` if the email address is not registered
     */
    @PostMapping(path = ["/account/reset-password/init"])
    fun requestPasswordReset(@RequestBody mail: String)
    {
        mailService.sendPasswordResetMail(
            userService.requestPasswordReset(mail)
                .orElseThrow { EmailNotFoundException() }
        )
    }

    /**
     * `POST   /account/reset-password/finish` : Finish to reset the password of the user.
     *
     * @param keyAndPassword the generated key and the new password.
     * @throws InvalidPasswordException `400 (Bad Request)` if the password is incorrect.
     * @throws RuntimeException `500 (Internal Server Error)` if the password could not be reset.
     */
    @PostMapping(path = ["/account/reset-password/finish"])
    fun finishPasswordReset(@RequestBody keyAndPassword: KeyAndPasswordVM)
    {
        if (!checkPasswordLength(keyAndPassword.newPassword))
        {
            throw InvalidPasswordException()
        }
        val user = userService.completePasswordReset(keyAndPassword.newPassword!!, keyAndPassword.key!!)

        if (!user.isPresent)
        {
            throw AccountResourceException("No user was found for this reset key")
        }
    }
}

private fun checkPasswordLength(password: String?) =
    !password.isNullOrEmpty() &&
            password.length >= ManagedUserVM.PASSWORD_MIN_LENGTH &&
            password.length <= ManagedUserVM.PASSWORD_MAX_LENGTH
