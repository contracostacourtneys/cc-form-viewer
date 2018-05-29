import { addToState, removeFromState } from 'Components/shared/addRemove';
import validateComponent from 'Components/shared/validateComponent';

const defaultState = {};


module.exports = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_COMPONENT': {
      if (!validateComponent(action.payload, 'Checkbox')) {
        return state;
      }

      return addToState(state, action.payload);
    }

    case 'REMOVE_COMPONENT': {
      return removeFromState(state, action.payload, 'Checkbox');
    }
  }

  return state; 
};
