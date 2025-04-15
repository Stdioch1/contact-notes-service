const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // ✅ This loads .env into process.env
const router = express.Router();

router.post('/', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(403).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;