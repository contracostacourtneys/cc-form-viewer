const has = require('has-own-property-x');


const putForm = (database = '', formID = '', formData = '', callback = '') => {
  if (callback === '') {
    return;
  }

  if (database === '' || formID === '' || formData === '') {
    callback(500, '');
    return;
  }

  database.put(`form_${formID}`, JSON.stringify(formData), (err, result) => {
    if (err) {
      console.error('Error adding converted form to database:', err);
      callback(500, '');
      return;
    }

    callback(200, result);
  });
};


module.exports = putForm;
