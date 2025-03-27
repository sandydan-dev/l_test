const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

const Author = require("./Author.model");

const Book = sequelize.define(
  "book",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    publicationYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      references: {
        model: "authors", // Matches the explicitly set table name
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
Book.belongsTo(Author, { foreignKey: "authorId" });
// Author.hasMany(Book, { foreignKey: "authorId" });

module.exports = Book;
