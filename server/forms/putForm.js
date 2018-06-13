const has = require('has-own-property-x');


const putForm = (database = '', name = '', formData = '', callback = '') => {
  if (callback === '') {
    return;
  }

  if (database === '' || name === '' || formData === '') {
    callback(500, '');
    return;
  }

  database.put(`form_${name}`, formData, (err, result) => {
    if (err) {
      callback(500, '');
      return;
    }

    callback(200, result);
  });
};


module.exports = putForm;
