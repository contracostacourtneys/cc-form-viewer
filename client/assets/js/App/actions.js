import store from 'Root/main';


const setPage = (page) => {
  store.dispatch({
    type: 'SET_PAGE',
    payload: page
  });
};

const previousPage = () => {
  const state = store.getState();

  if (state.global.page <= 0) {
    return;
  }

  store.dispatch({
    type: 'PREVIOUS_PAGE'
  });
};

const nextPage = () => {
  const state = store.getState();

  if (state.global.page >= state.forms.length - 1) {
    return;
  }

  store.dispatch({
    type: 'NEXT_PAGE'
  });
};


export { setPage, previousPage, nextPage };
