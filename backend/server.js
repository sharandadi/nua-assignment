require('dotenv').config(); // <--- Load environment variables first
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const userRoutes = require('./routes/userRoutes');
const { initDB } = require('./db'); 

const app = express();
const PORT = process.env.PORT || 3000; // Use env port or default to 3000

// Middleware
app.use(cors());
app.use(express.json());

// Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/users', userRoutes);

// --- STARTUP SEQUENCE ---
const startServer = async () => {
  // 1. Initialize Database first
  await initDB();

  // 2. Start Server only after DB is ready
  app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
    console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
  });
};

startServer();