const has = require('has-own-property-x');


const getForm = (database = '', formID = '', callback = '') => {
  if (callback === '') {
    return;
  }

  if (database === '') {
    callback(500, '');
    return;
  }

  if (formID === '') {
    callback(400, '');
    return;
  }

  database.get(`form_${formID}`, (err, result) => {
    if (err) {
      console.error('Error retrieving form:', err);
      
      if (err.notFound) {
        callback(404, result);
        return;
      }

      callback(500, result);
      return;
    }

    callback(200, result);
  });
};


module.exports = getForm;
