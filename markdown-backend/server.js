const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const markdownRoutes = require("./routes/markdownRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/markdown", markdownRoutes);

// Connect to MongoDB
mongoose
  // .connect("mongodb://localhost:27017/markdown-editor", {
  .connect("mongodb+srv://priyanka:b7p0vfHT096dFZD0@cluster01.wta4n.mongodb.net/", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
