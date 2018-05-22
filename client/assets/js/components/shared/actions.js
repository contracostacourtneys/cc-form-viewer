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

export { addComponent, removeComponent };
