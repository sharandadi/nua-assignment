const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express'); // Import UI
const swaggerSpec = require('./swagger');       // Import Config
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// --- SWAGGER DOCUMENTATION ROUTE ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});