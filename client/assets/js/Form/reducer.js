import deepcopy from 'deepcopy';
import validatePayload from 'Utility/validatePayload';
const has = require('has-own-property-x');

const defaultState = [];


module.exports = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_FORM': {
      const data = action.payload;

      if (!validatePayload(data, ['id', 'page', 'viewport'])) {
        return state;
      }

      const forms = state.slice();
      forms.push({ ...data, components: [] });

      return forms;
    }

    case 'ADD_COMPONENT': {
      const { id, type, pageIndex } = action.payload;

      if (state.length <= pageIndex) {
        return state;
      }

      const forms = state.slice();
      const form = { ...forms[pageIndex] };
      const components = form.components.slice();

      components.push({ id, type });
      form.components = components;
      forms[pageIndex] = form;

      return forms;
    }
  }

  return state;
};
