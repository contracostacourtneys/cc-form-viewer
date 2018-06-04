import { addToState, removeFromState } from 'Components/shared/addRemove';
import validateComponent from 'Components/shared/validateComponent';
import setValue from 'Components/shared/setValue';

const defaultState = {};


module.exports = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_COMPONENT': {
      if (!validateComponent(action.payload, 'Textbox')) {
        return state;
      }

      return addToState(state, action.payload);
    }

    case 'REMOVE_COMPONENT': {
      return removeFromState(state, action.payload, 'Textbox');
    }

    case 'SET_COMPONENT_VALUE': {
      const { id, type, value } = action.payload;
      return setValue(state, 'Textbox', id, type, value);
    }
  }

  return state; 
};
