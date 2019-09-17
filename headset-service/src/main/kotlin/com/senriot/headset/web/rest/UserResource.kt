package com.senriot.headset.web.rest

import com.querydsl.core.types.Predicate
import com.senriot.cloud.common.AbstractController
import com.senriot.cloud.common.annotation.EntityName
import com.senriot.cloud.common.error.BadRequestAlertException
import com.senriot.cloud.common.error.EmailAlreadyUsedException
import com.senriot.cloud.common.error.LoginAlreadyUsedException
import com.senriot.cloud.common.security.ADMIN
import com.senriot.headset.domain.User
import com.senriot.headset.repository.UserRepository
import com.senriot.headset.service.MailService
import com.senriot.headset.service.UserService
import com.senriot.headset.service.dto.UserDTO
import io.github.jhipster.web.util.HeaderUtil
import io.github.jhipster.web.util.ResponseUtil
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.querydsl.binding.QuerydslPredicate
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.ModelAndView
import java.net.URI
import javax.validation.Valid

/**
 * REST controller for managing users.
 *
 * This class accesses the [User] entity, and needs to fetch its collection of authorities.
 *
 * For a normal use-case, it would be better to have an eager relationship between User and Authority,
 * and send everything to the client side: there would be no View Model and DTO, a lot less code, and an outer-join
 * which would be good for performance.
 *
 * We use a View Model and a DTO for 3 reasons:
 *
 * * We want to keep a lazy association between the user and the authorities, because people will
 * quite often do relationships with the user, and we don't want them to get the authorities all
 * the time for nothing (for performance reasons). This is the #1 goal: we should not impact our users'
 * application because of this use-case.
 * *  Not having an outer join causes n+1 requests to the database. This is not a real issue as
 * we have by default a second-level cache. This means on the first HTTP call we do the n+1 requests,
 * but then all authorities come from the cache, so in fact it's much better than doing an outer join
 * (which will get lots of data from the database, for each HTTP call).
 * *  As this manages users, for security reasons, we'd rather have a DTO layer.
 *
 * Another option would be to have a specific JPA entity graph to handle this case.
 */
@RestController
@RequestMapping("/api/users")
@EntityName("user")
@Api(tags = ["用户"])
class UserResource(private val mailService: MailService, private val userRepository: UserRepository) :
        AbstractController<User, Long, UserDTO, UserService>()
{
    override fun loadAll(sort: Sort, @QuerydslPredicate(root = User::class) predicate: Predicate?): List<UserDTO>
    {
        return super.loadAll(sort, predicate)
    }

    override fun loadPage(page: Pageable, @QuerydslPredicate(root = User::class) predicate: Predicate?): Page<UserDTO>
    {
        return super.loadPage(page, predicate)
    }

    override fun count(@QuerydslPredicate(root = User::class) predicate: Predicate?): ResponseEntity<Long>
    {
        return super.count(predicate)
    }

    override fun exportXls(
        @QuerydslPredicate(root = User::class)
        predicate: Predicate?
    ): ModelAndView
    {
        return super.exportXls(predicate)
    }

    @PreAuthorize("hasRole(\"$ADMIN\")")
    override fun create(@Valid @RequestBody dto: UserDTO): ResponseEntity<UserDTO>
    {
        log.debug("创建用户 : {}", dto)

        when
        {
            dto.id != null                                                     -> throw BadRequestAlertException(
                "A new user cannot already have an ID",
                "userManagement",
                "idexists"
            )
            // Lowercase the user login before comparing with database
            userRepository.findOneByLogin(dto.login!!.toLowerCase()).isPresent -> throw LoginAlreadyUsedException()
            userRepository.findOneByEmailIgnoreCase(dto.email).isPresent       -> throw EmailAlreadyUsedException()
            else                                                               ->
            {
                val newUser = service.createUser(dto)
                mailService.sendCreationEmail(newUser)
                return ResponseEntity.created(URI("/api/users/" + newUser.login))
                    .headers(HeaderUtil.createAlert(applicationName, "userManagement.created", newUser.login))
                    .body(service.mapper.toDto(newUser))
            }
        }
    }

    @PreAuthorize("hasRole(\"$ADMIN\")")
    override fun update(@RequestBody dto: UserDTO): ResponseEntity<UserDTO>
    {
        log.debug("更新用户 : {}", dto)
        var existingUser = userRepository.findOneByEmailIgnoreCase(dto.email)
        if (existingUser.isPresent && existingUser.get().id != dto.id)
        {
            throw EmailAlreadyUsedException()
        }
        existingUser = userRepository.findOneByLogin(dto.login!!.toLowerCase())
        if (existingUser.isPresent && existingUser.get().id != dto.id)
        {
            throw LoginAlreadyUsedException()
        }
        val updatedUser = service.updateUser(dto)

        return ResponseUtil.wrapOrNotFound(
            updatedUser,
            HeaderUtil.createAlert(applicationName, "userManagement.updated", dto.login)
        )
    }


    /**
     * 获取全部设备管理员
     */
    @GetMapping("device-managers")
    @ApiOperation("获取设备管理员")
    fun getDeviceManagers(): List<UserDTO> = service.getDeviceManagers()

//    /**
//     * `POST  /users`  : Creates a new user.
//     *
//     * Creates a new user if the login and email are not already used, and sends an
//     * mail with an activation link.
//     * The user needs to be activated on creation.
//     *
//     * @param userDTO the user to create.
//     * @return the `ResponseEntity` with status `201 (Created)` and with body the new user, or with status `400 (Bad Request)` if the login or email is already in use.
//     * @throws URISyntaxException if the Location URI syntax is incorrect.
//     * @throws BadRequestAlertException `400 (Bad Request)` if the login or email is already in use.
//     */
//    @PostMapping("/users")
//    @PreAuthorize("hasRole(\"$ADMIN\")")
//    @Throws(URISyntaxException::class)
//    fun createUser(@Valid @RequestBody userDTO: UserDTO): ResponseEntity<User> {
//        log.debug("REST request to save User : {}", userDTO)
//
//        if (userDTO.id != null) {
//            throw BadRequestAlertException("A new user cannot already have an ID", "userManagement", "idexists")
//            // Lowercase the user login before comparing with database
//        } else if (userRepository.findOneByLogin(userDTO.login!!.toLowerCase()).isPresent) {
//            throw LoginAlreadyUsedException()
//        } else if (userRepository.findOneByEmailIgnoreCase(userDTO.email).isPresent) {
//            throw EmailAlreadyUsedException()
//        } else {
//            val newUser = service.create(userDTO)
//            mailService.sendCreationEmail(newUser)
//            return ResponseEntity.created(URI("/api/users/" + newUser.login))
//                .headers(HeaderUtil.createAlert(applicationName, "userManagement.created", newUser.login))
//                .body(newUser)
//        }
//    }
//
//    /**
//     * `PUT /users` : Updates an existing User.
//     *
//     * @param userDTO the user to update.
//     * @return the `ResponseEntity` with status `200 (OK)` and with body the updated user.
//     * @throws EmailAlreadyUsedException `400 (Bad Request)` if the email is already in use.
//     * @throws LoginAlreadyUsedException `400 (Bad Request)` if the login is already in use.
//     */
//    @PutMapping("/users")
//    @PreAuthorize("hasRole(\"$ADMIN\")")
//    fun updateUser(@Valid @RequestBody userDTO: UserDTO): ResponseEntity<UserDTO> {
//        log.debug("REST request to update User : {}", userDTO)
//        var existingUser = userRepository.findOneByEmailIgnoreCase(userDTO.email)
//        if (existingUser.isPresent && existingUser.get().id != userDTO.id) {
//            throw EmailAlreadyUsedException()
//        }
//        existingUser = userRepository.findOneByLogin(userDTO.login!!.toLowerCase())
//        if (existingUser.isPresent && existingUser.get().id != userDTO.id) {
//            throw LoginAlreadyUsedException()
//        }
//        val updatedUser = userService.updateUser(userDTO)
//
//        return ResponseUtil.wrapOrNotFound(
//            updatedUser,
//            HeaderUtil.createAlert(applicationName, "userManagement.updated", userDTO.login)
//        )
//    }

}
