const express = require("express");
const Markdown = require("../models/Markdown");

const router = express.Router();

// Create a new markdown entry
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log("title, content", title,content);
    
    const markdown = new Markdown({ title, content });
    await markdown.save();
    res.status(201).json(markdown);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve all markdown entries
router.get("/", async (req, res) => {
  try {
    const markdowns = await Markdown.find();
    res.json(markdowns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve a single markdown entry by ID
router.get("/:id", async (req, res) => {
  try {
    const markdown = await Markdown.findById(req.params.id);
    if (!markdown) {
      return res.status(404).json({ message: "Markdown not found" });
    }
    res.json(markdown);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a markdown entry by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const markdown = await Markdown.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!markdown) {
      return res.status(404).json({ message: "Markdown not found" });
    }
    res.json(markdown);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a markdown entry by ID
router.delete("/:id", async (req, res) => {
  try {
    const markdown = await Markdown.findByIdAndDelete(req.params.id);
    if (!markdown) {
      return res.status(404).json({ message: "Markdown not found" });
    }
    res.json({ message: "Markdown deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
