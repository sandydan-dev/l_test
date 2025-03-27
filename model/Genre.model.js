const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

const Genre = sequelize.define(
  "genre",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Genre;
