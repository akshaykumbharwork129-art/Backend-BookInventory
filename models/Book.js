const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    publisher: {
      type: String
    },
    publishedDate: {
      type: String
    },
    overview: {
      type: String
    }
  },
  { timestamps: true }
);

// creates collection → books
module.exports = mongoose.model("Book", BookSchema, "books");
