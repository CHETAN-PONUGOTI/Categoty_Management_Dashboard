require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

// Import Routes
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Critical for parsing POST bodies

// Route Mapping - Prefixing with /api to match frontend
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 5000;

// Sync Database and Start
sequelize.sync()
  .then(() => {
    console.log('SQLite Database & Tables synced');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Unable to sync database:', err));