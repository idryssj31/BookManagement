import React, { useEffect, useState } from "react";
import axios from "axios";

function BookManagement() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "" });

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:8081/api/books");
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author) return;
    await axios.post("http://localhost:8081/api/books", {
      title: newBook.title,
      author: newBook.author,
        reserved: false
    });
    setNewBook({ title: "", author: "" });
    fetchBooks();
  };

  const handleDeleteAll = async () => {
    await axios.delete("http://localhost:8081/api/books");
    fetchBooks();
  };

  return (
    <div>
      <h1>Gestion des livres</h1>
      <form onSubmit={handleAddBook}>
        <input
          name="title"
          placeholder="Titre"
          value={newBook.title}
          onChange={handleInputChange}
        />
        <input
          name="author"
          placeholder="Auteur"
          value={newBook.author}
          onChange={handleInputChange}
        />
        <button type="submit">Ajouter</button>
      </form>
      <button onClick={handleDeleteAll}>Supprimer tous les livres</button>
      <ul>
        {books.map((book, idx) => (
          <li key={idx}>
            {book.title} — {book.author} {book.reserved ? "(Reserved)" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookManagement;