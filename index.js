const express = require('express');

const server = express();


// express ler arquivos json
server.use(express.json());

// Query params = ?teste=1
// Route params = /users/1 = localhost:3000/users/12341
// Request body = { "name": "Marcelo", "email": "marcelo.klinger@hotmail.com" }

// CRUD = Create, Read, Update, Delete

const users = ['Marcelo', 'Diego', 'José'];

// middlewares
server.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'User name is required' });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: 'User does not exists' });
  }

  req.user = user;
  return next();
}


// Listar todos os usuários
server.get('/users', (req, res) => res.json(users));


// Listar usuários pelo id
server.get('/users/:index', checkUserInArray, (req, res) => res.json(req.user));

// Criar usuários
server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});


// Editando usuários
server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});


// Deletando Usuários
server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);
