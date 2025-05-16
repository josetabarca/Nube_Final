
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Serve index.html from the root directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to handle appointment scheduling
app.post('/agenda', (req, res) => {
  const { name, date } = req.body;
  const query = 'INSERT INTO agenda (name, date) VALUES ($1, $2)';
  pool.query(query, [name, date])
    .then(() => {
      res.status(200).send('Cita programada exitosamente');
    })
    .catch((err) => {
      console.error('Error al programar la cita', err);
      res.status(500).send('Error al programar la cita');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
