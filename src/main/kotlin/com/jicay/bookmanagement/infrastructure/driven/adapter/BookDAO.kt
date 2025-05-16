package com.jicay.bookmanagement.infrastructure.driven.adapter

import com.jicay.bookmanagement.domain.model.Book
import com.jicay.bookmanagement.domain.port.BookPort
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.stereotype.Service

@Service
class BookDAO(private val namedParameterJdbcTemplate: NamedParameterJdbcTemplate) : BookPort {
    override fun getAllBooks(): List<Book> {
        return namedParameterJdbcTemplate
            .query("SELECT * FROM book", MapSqlParameterSource()) { rs, _ ->
                Book(
                    title = rs.getString("title"),
                    author = rs.getString("author"),
                    reserved = rs.getBoolean("reserved")
                )
            }
    }

    override fun createBook(book: Book) {
        namedParameterJdbcTemplate
            .update(
                "INSERT INTO book (title, author, reserved) values (:title, :author, :reserved)",
                mapOf(
                    "title" to book.title,
                    "author" to book.author,
                    "reserved" to book.reserved
                )
            )
    }

    override fun deleteAllBooks() {
        namedParameterJdbcTemplate.update("DELETE FROM book", MapSqlParameterSource())
    }

    override fun reserveBook(title: String): Boolean {
        val paramSource = MapSqlParameterSource().addValue("title", title)

        val count = namedParameterJdbcTemplate.queryForObject(
            "SELECT COUNT(*) FROM book WHERE title = :title AND reserved = false",
            paramSource,
            Int::class.java
        ) ?: 0

        if (count == 0) return false

        val updated = namedParameterJdbcTemplate.update(
            "UPDATE book SET reserved = true WHERE title = :title AND reserved = false",
            paramSource
        )
        return updated > 0
    }
}