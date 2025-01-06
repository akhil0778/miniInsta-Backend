const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('../models');

dotenv.config();

const app = express();

// Handle Uncaught Errors (Place this here)
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Middleware
app.use(express.json()); // express now handles JSON parsing

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const postRoutes = require('./routes/postRoutes');
app.use('/posts', postRoutes);

// Example root endpoint (optional)
app.get('/', (req, res) => res.send('Welcome to Micro-Insta API'));

// Server and Database
let server;

async function startServer() {
  const PORT = process.env.PORT || 4000;

  return new Promise((resolve, reject) => {
    server = app.listen(PORT, async () => {
      try {
        console.log('Attempting to connect to the database...');
        await sequelize.authenticate();
        console.log('Database connected!');
        console.log(`Server running at http://localhost:${PORT}`);
        resolve(server);
      } catch (error) {
        console.error('Failed to start server:', error);
        reject(error);
      }
    });
  });
}

async function stopServer() {
  if (server) {
    server.close();
  }
  await sequelize.close();
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await stopServer();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await stopServer();
  process.exit(0);
});

// Auto-start server when script is run
(async () => {
  try {
    await startServer();
  } catch (error) {
    console.error('Error starting the server:', error.message);
    process.exit(1); // Exit with failure code
  }
})();

module.exports = { app, startServer, stopServer };
