# Book Management System

This project is a simple book management system built using Node.js, Express, and Sequelize ORM. It allows users to manage books, authors, genres, and their relationships.

## Features

- **Authors**: Manage authors with details like name, birthdate, and email.
- **Books**: Manage books with details like title, description, publication year, and associated author.
- **Genres**: Manage genres with details like name and description.
- **Relationships**:
  - Books belong to authors.
  - Books can belong to multiple genres (many-to-many relationship).
  - Genres can have multiple books.

## Endpoints

### Seed Database
- **Route**: `GET /seed_db`
- **Description**: Seeds the database with sample data for authors, books, genres, and their relationships.

### Books
- **Get All Books**: `GET /books`
- **Add a New Book**: `POST /books`
  - **Request Body**:
    ```json
    {
      "title": "Book Title",
      "description": "Book Description",
      "publicationYear": 2023,
      "authorId": 1,
      "genreIds": [1, 2]
    }
    ```

### Authors
- **Get Books by Author**: `GET /authors/:authorId/books`

### Genres
- **Get Books by Genre**: `GET /genres/:genreId/books`

## Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the database connection in `db/db.js`.
4. Start the server:
   ```bash
   node index.js
   ```
5. Access the application at `http://localhost:3000`.

## Dependencies

- **Node.js**: Backend runtime.
- **Express**: Web framework.
- **Sequelize**: ORM for database management.
- **SQLite** (or other DB): Database for storing data.

## Folder Structure

- `model/`: Contains Sequelize models for `Author`, `Book`, `Genre`, and `BookGenre`.
- `index.js`: Main entry point for the application.
- `.gitignore`: Specifies files to ignore in version control.

## License

This project is for educational purposes and is not licensed for production use.
