const Book = require("../models/Book");

// ===================================
// GET all books (PUBLIC)
// ===================================
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json(books); // ✅ OK
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch books",
      error: err.message,
    });
  }
};

// ===================================
// GET single book (PUBLIC)
// ===================================
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ // ✅ NOT FOUND
        message: "Book not found",
      });
    }

    return res.status(200).json(book); // ✅ OK
  } catch (err) {
    return res.status(400).json({ // ✅ BAD REQUEST (invalid ID)
      message: "Invalid book ID",
      error: err.message,
    });
  }
};

// ===================================
// ADD book (PROTECTED)
// ===================================
exports.addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).json(book); // ✅ CREATED
  } catch (err) {
    return res.status(400).json({ // ✅ BAD REQUEST (validation)
      message: "Validation failed",
      errors: err.errors,
    });
  }
};

// ===================================
// UPDATE book (PROTECTED)
// ===================================
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true, // 🔥 REQUIRED
      }
    );

    if (!book) {
      return res.status(404).json({ // ✅ NOT FOUND
        message: "Book not found",
      });
    }

    return res.status(200).json(book); // ✅ OK
  } catch (err) {
    return res.status(400).json({ // ✅ BAD REQUEST
      message: "Validation failed",
      errors: err.errors,
    });
  }
};

// ===================================
// DELETE book (PROTECTED)
// ===================================
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ // ✅ NOT FOUND
        message: "Book not found",
      });
    }

    return res.status(200).json({ // ✅ OK
      message: "Book deleted successfully",
    });
  } catch (err) {
    return res.status(400).json({ // ✅ BAD REQUEST
      message: "Invalid book ID",
      error: err.message,
    });
  }
};
