const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

dotenv.config();

const app = express(); // ✅ MUST be declared before using `app.use`

// Swagger Docs
const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware
app.use(cors());
app.use(express.json());

// Basic Health Check
app.get('/', (req, res) => {
  res.send('🚀 Contact Notes API is running! Visit /docs');
});

// Routes
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contacts');
const noteRoutes = require('./routes/notes');
const { authenticateJWT } = require('./middleware/auth');

console.log('✅ Registering /contacts route');
app.use('/login', authRoutes);
app.use('/contacts', authenticateJWT, contactRoutes);
app.use('/notes', authenticateJWT, noteRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});