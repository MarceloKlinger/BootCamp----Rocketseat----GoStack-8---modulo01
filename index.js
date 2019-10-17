const express = require('express');

const server = express();

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Marcelo", "email": "marcelo.klinger@hotmail.com" }

server.get('/teste', (req, res) => res.json({ message: 'Hello World' }));

server.listen(3000);
