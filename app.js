const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Pon tu contraseña si la tienes
  database: 'registro'
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    throw err;
  }
  console.log('Conectado a la base de datos MySQL');
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para el login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Error en la base de datos:', err);
      return res.status(500).send('Error en la base de datos');
    }
    if (result.length > 0) {
      res.status(200).send('Login exitoso');
    } else {
      res.status(401).send('Nombre de usuario o contraseña incorrectos');
    }
  });
});

// Ruta para el registro de usuarios
app.post('/register', (req, res) => {
  const { newusername, newpassword } = req.body;
  
  // Verificar si el usuario ya existe
  const checkUserQuery = 'SELECT * FROM usuarios WHERE username = ?';
  db.query(checkUserQuery, [newusername], (err, result) => {
    if (err) {
      console.error('Error en la base de datos:', err);
      return res.status(500).send('Error en la base de datos');
    }
    if (result.length > 0) {
      return res.status(409).send('El usuario ya existe');
    }

    // Si el usuario no existe, proceder con la inserción
    const insertUserQuery = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
    db.query(insertUserQuery, [newusername, newpassword], (err, result) => {
      if (err) {
        console.error('Error en la base de datos:', err);
        return res.status(500).send('Error en la base de datos');
      }
      res.status(200).send('Usuario registrado correctamente');
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
