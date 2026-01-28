// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");

// const app = express();

// // ✅ Connect MongoDB (Atlas recommended)
// connectDB();

// // ✅ CORS configuration
// app.use(
//   cors({
//     origin: "https://book-inventory-management-system-react-mongo-db-agkq-4zvg0440b.vercel.app",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
//   })
// );

// // ✅ Middleware
// app.use(express.json());

// // ✅ Root route (backend status check)
// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "✅ Backend is running for Book Inventory Management System",
//     api: {
//       auth: "/api/auth",
//       books: "/api/books"
//     }
//   });
// });

// // ✅ API routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/books", require("./routes/bookRoutes"));

// // 🚫 NO app.listen() for Vercel
// module.exports = app;


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// ✅ Connect MongoDB
connectDB();

// ✅ CORS configuration (FIXED)
app.use(
  cors({
    origin: [
      "https://book-inventory-management-system-react-mongo-db-agkq-4zvg0440b.vercel.app",
      "https://book-inventory-man-git-cefb74-akshay-kumbhars-projects-5a924d58.vercel.app"
    ],
    
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// ✅ Handle preflight requests explicitly
app.options("*", cors());

// ✅ Middleware
app.use(express.json());

// ✅ Root route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ Backend is running for Book Inventory Management System",
    api: {
      auth: "/api/auth",
      books: "/api/books"
    }
  });
});

// ✅ API routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));

// 🚫 NO app.listen() for Vercel
module.exports = app;
