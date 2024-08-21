const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); 

dotenv.config(); 

const app = express();
const port = 2000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

const JWT_SECRET = process.env.JWT_SECRET;

app.post('/register', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Nome e e-mail são obrigatórios' });
  }

  const token = jwt.sign({ name, email }, JWT_SECRET, { expiresIn: '1h' });

  const sql = 'INSERT INTO users (name, email, token) VALUES (?, ?, ?)';
  db.query(sql, [name, email, token], (err, result) => {
    if (err) return res.status(500).json({ message: 'Erro ao salvar o usuário' });
    res.status(201).json({ token });
  });
});

app.post('/verify', (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ message: 'Token válido!' });
  } catch (error) {
    res.status(401).json({ message: 'Token inválido.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
