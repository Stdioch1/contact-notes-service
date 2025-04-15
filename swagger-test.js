// swagger-test.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/docs', swaggerUi.serve);
app.get('/docs', swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Swagger test running. Go to /docs');
});

app.listen(3001, () => {
  console.log('Swagger test server running at http://localhost:3001');
});
