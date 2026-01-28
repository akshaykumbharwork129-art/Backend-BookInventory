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

// 🔗 Connect MongoDB
connectDB();

// 🌍 Allowed frontend origins
const allowedOrigins = [
  "https://book-inventory-management-system-re.vercel.app",
  "https://book-inventory-management-system-react-mongo-db-agkq-4zvg0440b.vercel.app",
  "https://book-inventory-man-git-cefb74-akshay-kumbhars-projects-5a924d58.vercel.app",
  "http://localhost:3000"
];

// 🌍 CORS (CORRECT WAY)
app.use(
  cors({
    origin: function (origin, callback) {
      // allow server-to-server, Postman, curl
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// ✅ IMPORTANT: preflight must use SAME config
app.options("*", cors());

// 🔧 Middleware
app.use(express.json());

// 🏠 Root route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ Backend is running",
    routes: {
      auth: "/api/auth",
      books: "/api/books"
    }
  });
});

// 🚏 Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));

// ❌ No app.listen() for Vercel
module.exports = app;
