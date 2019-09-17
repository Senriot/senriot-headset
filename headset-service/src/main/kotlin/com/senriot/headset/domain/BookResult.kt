package com.senriot.headset.domain


data class BookResult<T>(
        var code: Int? = null,
        var `data`: T? = null,
        var message: String? = null
)
{
    data class Data(
            var books: List<Book?>? = null,
            var category: BookCategory? = null,
            var hasMore: Boolean? = null
    )
    {

    }
}
