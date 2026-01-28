const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const bookController = require("../controllers/bookController");

// Public routes
router.get("/", bookController.getBooks);
router.get("/:id", bookController.getBook);

// Protected routes
router.post("/", auth, bookController.addBook);
router.put("/:id", auth, bookController.updateBook);
router.delete("/:id", auth, bookController.deleteBook);

module.exports = router;
