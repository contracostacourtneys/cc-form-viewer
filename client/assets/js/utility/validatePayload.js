const has = require('has-own-property-x');


const validatePayload = (payload, properties) => {
  const length = properties.length;

  for (let i = 0; i < length; i++) {
    if (!has(payload, properties[i])) {
      console.error(`ERROR: validatePayload() - \`${properties[i]}\` not found in payload!`);
      return false;
    }
  }

  return true;
};

export default validatePayload;
