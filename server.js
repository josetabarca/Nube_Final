
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

app.post('/agenda', async (req, res) => {
  const { name, date } = req.body;
  console.log('Datos recibidos:', req.body);
  try {
    const query = 'INSERT INTO agenda (name, date) VALUES ($1, $2)';
    await pool.query(query, [name, date]);
    res.status(200).send('Cita programada exitosamente');
  } catch (err) {
    console.error('Error al programar la cita', err);
    res.status(500).send('Error al programar la cita');
  }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
