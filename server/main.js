const express = require('express');
const server = express();

const cors = require('cors');

const PORT = 3000;


server.use(cors());
server.use('/', express.static('./client'));

server.get('/', (req, res) => {
  res.sendFile('index.html', { root: './client' });
});

require('./forms/init.js')(express, server);

server.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
