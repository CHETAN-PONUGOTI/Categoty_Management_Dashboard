const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { protect } = require('../middleware/authMiddleware'); // Fixes ReferenceError

// GET: Fetch all categories for the logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const categories = await Category.findAll({ where: { userId: req.user } });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
});

// POST: Add a new category
router.post('/', protect, async (req, res) => {
  try {
    const { name, itemCount, imageUrl } = req.body;
    
    // Server-side validation
    if (!name || !imageUrl) {
      return res.status(400).json({ error: "Name and Image URL are required" });
    }

    const newCategory = await Category.create({
      name,
      itemCount: parseInt(itemCount, 10), // Ensure integer for SQLite
      imageUrl,
      userId: req.user
    });
    
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;