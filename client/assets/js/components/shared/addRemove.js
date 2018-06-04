const has = require('has-own-property-x');
import validatePayload from 'Utility/validatePayload';


const addToState = (state, payload) => {
  return { ...state, [payload.id]: payload };
};

const removeFromState = (state, payload, type) => {
  if (!validatePayload(payload, ['id', 'type'])) {
    return state;
  }

  if (payload.type !== type) {
    return state;
  }

  let components = { ...state };
  delete components[id];

  return components;
};

export { addToState, removeFromState };
