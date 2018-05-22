import validatePayload from 'Utility/validatePayload';
const has = require('has-own-property-x');


const validateComponent = (payload, type) => {
  if (!validatePayload(payload, ['id', 'type'])) {
    return false;
  }
  
  if (payload.type !== type) {
    return false;
  }

  if (!has(payload, 'x') || !has(payload, 'y')) {
    return false;
  }

  if (!has(payload, 'width') || !has(payload, 'height')) {
    return false;
  }

  return true;
};

export default validateComponent;
