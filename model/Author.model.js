const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

const Author = sequelize.define(
  "author",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Author;
