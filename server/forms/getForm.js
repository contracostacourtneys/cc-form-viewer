const has = require('has-own-property-x');


const getForm = (database = '', formName = '', callback = '') => {
  if (callback === '') {
    return;
  }

  if (database === '') {
    callback(500, '');
    return;
  }

  if (formName === '') {
    callback(400, '');
    return;
  }

  database.get(`form_${formName}`, (err, result) => {
    if (err) {
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
