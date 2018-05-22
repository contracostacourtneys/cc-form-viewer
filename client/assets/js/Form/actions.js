import store from 'Root/main';


const addForm = (form) => {
  store.dispatch({
    type: 'ADD_FORM',
    payload: form
  });
};

export { addForm };
