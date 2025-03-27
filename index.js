const express = require("express");
const app = express();
const port = 3000;

const sequelize = require("./db/db");
const Book = require("./model/Book.model");
const Author = require("./model/Author.model");
const Genre = require("./model/Genre.model");
const BookGenre = require("./model/BookGenre.model");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authorsData = [
  {
    name: "J.K. Rowling",
    birthdate: "1965-07-31",
    email: "jkrowling@books.com",
  },
  {
    name: "George R.R. Martin",
    birthdate: "1948-09-20",
    email: "grrmartin@books.com",
  },
];

const genresData = [
  { name: "Fantasy", description: "Magical and mythical stories." },
  {
    name: "Drama",
    description: "Fiction with realistic characters and events.",
  },
];

const booksData = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    description: "A young wizard's journey begins.",
    publicationYear: 1997,
    authorId: 1,
  },
  {
    title: "Game of Thrones",
    description: "A medieval fantasy saga.",
    publicationYear: 1996,
    authorId: 2,
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    // Sync all models and ensure tables are created
    console.log("Syncing database...");
    await sequelize.sync({ force: true });
    console.log("Database synced successfully.");

    // Insert data in the correct order
    await Author.bulkCreate(authorsData); // Insert authors first
    console.log("Authors inserted successfully.");

    await Book.bulkCreate(booksData); // Insert books
    console.log("Books inserted successfully.");

    await Genre.bulkCreate(genresData); // Insert genres
    console.log("Genres inserted successfully.");

    await BookGenre.bulkCreate([
      { bookId: 1, genreId: 1 },
      { bookId: 2, genreId: 2 },
    ]);
    console.log("BookGenres inserted successfully.");

    console.log("Database seeded successfully.");
    res.status(200).json({ message: "Database seeded successfully." });
  } catch (error) {
    console.error("Error seeding the database:", error); // Log the error for debugging
    res.status(500).json({ message: "Error seeding the database.", error });
  }
});

// get all books 🟡
// route : http://localhost:3000/books
async function getAllBooks() {
  const book = await Book.findAll();
  if (!book) {
    return [];
  }
  return book;
}
app.get("/books", async (req, res) => {
  try {
    const book = await getAllBooks();

    if (book.length === 0) {
      res.status(404).json({ message: "No books found" });
    }
    res.status(200).json({ message: "Books Found", book });
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});

// Fetch All Books Written by an Author 🟡
// route : http://localhost:3000/authors/1/books
async function getBooksByAuthorId(authorId) {
  const book = await Book.findAll({
    where: {
      authorId: authorId,
    },
  });
  if (!book) {
    return [];
  }
  return book;
}
app.get("/authors/:authorId/books", async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const book = await getBooksByAuthorId(authorId);
    if (book.length === 0) {
      res.status(404).json({ message: "No books found for the author" });
    }
    res.status(200).json({ message: "Books Found", book });
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});

async function getBooksByGenre(genreId) {
  const book = await BookGenre.findAll({
    where: {
      genreId: genreId,
    },
  });
  if (!book) {
    return [];
  }

  let bookRecords = [];

  for (let i = 0; i < book.length; i++) {
    console.log(book[i].bookId);
    bookRecords.push(book[i].bookId);
  }

  const bookIds = await Book.findAll({
    where: {
      id: bookRecords,
    },
  });

  return bookIds;
}

app.get("/genres/:genreId/books", async (req, res) => {
  try {
    const genreId = req.params.genreId;
    const book = await getBooksByGenre(genreId);
    if (book.length === 0) {
      res.status(404).json({ message: "No books found for the genre" });
    }
    res.status(200).json({ message: "Books Found", book });
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});

// add a new book 🟡

app.post("/books", async (req, res) => {
  try {
    const { title, description, publicationYear, authorId, genreIds } = req.body;

    // Create the book
    const book = await Book.create({
      title,
      description,
      publicationYear,
      authorId,
    });

    if (!book) {
      return res.status(400).json({ message: "Failed to create book" });
    }

    if (Array.isArray(genreIds) && genreIds.length > 0) {
      const bookGenres = genreIds.map((genreId) => ({
        bookId: book.id,
        genreId,
      }));
      await BookGenre.bulkCreate(bookGenres);
    }

    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Error adding book", error });
  }
});

app.listen(port, () => {
  console.log("Server listening on port", port);
});
