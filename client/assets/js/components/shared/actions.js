import store from 'Root/main';


const addComponent = (component) => {
  store.dispatch({
    type: 'ADD_COMPONENT',
    payload: component
  });
};

const removeComponent = (id, type) => {
  store.dispatch({
    type: 'REMOVE_COMPONENT',
    payload: { id, type }
  });
};

const setComponentValue = (id, type, value) => {
  store.dispatch({
    type: 'SET_COMPONENT_VALUE',
    payload: { id, type, value }
  });
};

export { addComponent, removeComponent, setComponentValue };
