const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

const Book = require("./Book.model");
const Genre = require("./Genre.model");

const BookGenre = sequelize.define(
  "BookGenre",
  {
    bookId: {
      type: DataTypes.INTEGER,
      references: {
        model: "books",
        key: "id",
        allowNull: false,
      },
    },
    genreId: {
      type: DataTypes.INTEGER,
      
      references: {
        model: "genres",
        key: "id",
        allowNull: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

// associations

Book.belongsToMany(Genre, { through: BookGenre, foreignKey: "bookId" }); // Many-to-many relationship with Genre
Genre.belongsToMany(Book, { through: BookGenre, foreignKey: "genreId" }); // Many-to-many relationship with Book

module.exports = BookGenre;
