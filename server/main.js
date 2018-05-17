const express = require('express');
const server = express();

const cors = require('cors');

const PORT = 3000;


server.use(cors());
server.use('/', express.static('./client'));

server.get('/', (req, res) => {
  res.sendFile('index.html', { root: './client' });
});

// FIXME: remove
server.get('/pdf/SC-100', (req, res) => {
  res.sendFile('./assets/pdfs/smallClaims/plaintiff/SC-100.pdf', { root: './server' });
});

server.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
