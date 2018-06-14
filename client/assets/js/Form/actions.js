import store from 'Root/main';


const addForm = (form) => {
  store.dispatch({
    type: 'ADD_FORM',
    payload: form
  });
};

const addFormPage = (pageIndex, page) => {
  store.dispatch({
    type: 'ADD_FORM_PAGE',
    payload: { pageIndex, page }
  });
};

export { addForm, addFormPage };
