package com.senriot.headset.repository

import com.senriot.cloud.common.IRepository
import com.senriot.headset.domain.Menu
import com.senriot.headset.domain.QMenu
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer
import org.springframework.data.querydsl.binding.QuerydslBindings
import org.springframework.stereotype.Repository

/**
 * Spring Data  repository for the [Menu] entity.
 */
@Repository
interface MenuRepository : IRepository<Menu, Long>, QuerydslBinderCustomizer<QMenu>
{
    @JvmDefault
    override fun customize(bindings: QuerydslBindings, root: QMenu)
    {
        bindings.bind(root.name).first { path, value -> path.containsIgnoreCase(value) }
        bindings.excluding(root.createdBy, root.createdDate, root.lastModifiedBy, root.lastModifiedDate)
    }

    //    @Query(
//        value = "select distinct menu from Menu menu left join fetch menu.roles",
//        countQuery = "select count(distinct menu) from Menu menu"
//    )
//    fun findAllWithEagerRelationships(pageable: Pageable): Page<Menu>
//
//    @Query(value = "select distinct menu from Menu menu left join fetch menu.roles")
//    fun findAllWithEagerRelationships(): MutableList<Menu>
//
//    @Query("select menu from Menu menu left join fetch menu.roles where menu.id =:id")
//    fun findOneWithEagerRelationships(@Param("id") id: Long): Optional<Menu>
}
