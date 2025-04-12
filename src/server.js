const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contacts');
const noteRoutes = require('./routes/notes');
const { authenticateJWT } = require('./middleware/auth');

dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/login', authRoutes);
app.use('/contacts', authenticateJWT, contactRoutes);
app.use('/notes', authenticateJWT, noteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
