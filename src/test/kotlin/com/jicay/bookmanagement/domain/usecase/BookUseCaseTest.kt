package com.jicay.bookmanagement.domain.usecase

import com.jicay.bookmanagement.domain.model.Book
import com.jicay.bookmanagement.domain.port.BookPort
import io.kotest.core.spec.style.FunSpec
import io.kotest.matchers.collections.shouldContainExactly
import io.mockk.every
import io.mockk.justRun
import io.mockk.mockk
import io.mockk.verify
import io.kotest.matchers.shouldBe

class BookUseCaseTest : FunSpec({

    val bookPort = mockk<BookPort>()
    val bookUseCase = BookUseCase(bookPort)

    test("getAllBooks should return all books sorted by name") {

        every { bookPort.getAllBooks() } returns listOf(
            Book("Les Misérables", "Victor Hugo"),
            Book("Hamlet", "William Shakespeare")
        )


        val res = bookUseCase.getAllBooks()


        res.shouldContainExactly(
            Book("Hamlet", "William Shakespeare"),
            Book("Les Misérables", "Victor Hugo")
        )
    }

    test("addBook should call createBook on the port") {

        justRun { bookPort.createBook(any()) }
        val book = Book("Les Misérables", "Victor Hugo")


        bookUseCase.addBook(book)

        verify(exactly = 1) { bookPort.createBook(book) }
    }

    test("should reserve an available book") {

        every { bookPort.reserveBook("Les Misérables") } returns true


        bookUseCase.reserveBook("Les Misérables") shouldBe true
    }

    test("should not reserve an already reserved book") {

        every { bookPort.reserveBook("Hamlet") } returns false


        bookUseCase.reserveBook("Hamlet") shouldBe false
    }

    test("should not reserve a non-existent book") {

        every { bookPort.reserveBook("Inconnu") } returns false


        bookUseCase.reserveBook("Inconnu") shouldBe false
    }

})