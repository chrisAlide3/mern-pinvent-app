const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const contactRoutes = require("./routes/contactRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser"); // Used to store generated JWT Token as a cookie in the browser
const path = require("path"); // Path for upload image folder

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // used for the upload image location
// Routes middleware
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/contacts", contactRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Home page");
});

// Error Middleware (Has to be after the routes!)
app.use(errorHandler);

// Connect DB and start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
