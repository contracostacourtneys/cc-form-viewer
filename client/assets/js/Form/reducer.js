import validatePayload from 'Utility/validatePayload';
const has = require('has-own-property-x');

const defaultState = [];


module.exports = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_FORM': {
      const data = action.payload;

      if (!validatePayload(data, ['id', 'page'])) {
        return state;
      }

      const forms = state.slice();
      forms.push(data);

      return forms;
    }
  }

  return state;
};
