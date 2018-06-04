import { typeCheck } from 'Components/shared/validateComponent';
const has = require('has-own-property-x');


const setValue = (state, typeToCheck, id, type, value) => {
  if (!typeCheck(typeToCheck, id, type)) {
    return state;
  }

  if (typeof value === 'undefined') {
    return state;
  }

  const component = { ...state[id], value };
  return { ...state, [id]: component };
};


export default setValue;
