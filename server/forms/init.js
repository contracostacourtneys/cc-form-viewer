const path = require('path');
const level = require('level');


module.exports = (express, server) => {
  console.log('*** INITIALIZING DATABASE ***');
  const database = level(path.resolve(__dirname, '../../database/cc-courthelp'));

  require('./formRoutes.js')(express, server, database);

  database.createReadStream()
    .on('data', (data) => {
      console.log(data.key, '=', data.value);
    })
    .on('error', (err) => {
      console.error('ERROR: createReadStream() -', err);
    })
    .on('close', () => {
      console.log('Stream closed');
    })
    .on('end', () => {
      console.log('Stream ended');
    });

  return database;
};
