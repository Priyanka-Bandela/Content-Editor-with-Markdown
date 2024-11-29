const mongoose = require("mongoose");

// Define the schema for markdown content
const markdownSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the model
const Markdown = mongoose.model("Markdown", markdownSchema);
module.exports = Markdown;
