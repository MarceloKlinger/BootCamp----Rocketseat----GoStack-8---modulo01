const express = require('express');

const server = express();


// express ler arquivos json
server.use(express.json());

// Query params = ?teste=1
// Route params = /users/1 = localhost:3000/users/12341
// Request body = { "name": "Marcelo", "email": "marcelo.klinger@hotmail.com" }

// CRUD = Create, Read, Update, Delete

const users = ['Marcelo', 'Diego', 'José'];


// Listar todos os usuários
server.get('/users', (req, res) => res.json(users));


// Listar usuários pelo id
server.get('/users/:index', (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const { index } = req.params;

  return res.json(users[index]);
});

// Criar usuários
server.post('/users', (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});


// Editando usuários
server.put('/users/:index', (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});


// Deletando Usuários
server.delete('/users/:index', (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);
