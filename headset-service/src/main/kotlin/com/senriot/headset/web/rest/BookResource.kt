package com.senriot.headset.web.rest

import com.senriot.headset.service.BookService
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("api/book")
class BookResource(private val bookService: BookService)
{
    @GetMapping("category")
    fun getCategoryAndBook() = bookService.getCategoryAndBook()


    @PostMapping("device/{deviceId}")
    fun saveDeviceCategory(@PathVariable deviceId: String, @RequestBody categories: IntArray) =
            bookService.saveDeviceCategory(deviceId, categories)
}
