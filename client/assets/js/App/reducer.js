const has = require('has-own-property-x');


const defaultState = {
  currentPage: 2,
};


module.exports = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_PAGE': {
      return { ...state, currentPage: action.payload };
    }

    case 'PREVIOUS_PAGE': {
      let currentPage = state.currentPage;

      if (currentPage < 0) {
        currentPage = 0;
      }
      else {
        currentPage--;
      }

      return { ...state, currentPage };
    }

    case 'NEXT_PAGE': {
      return { ...state, currentPage: state.currentPage + 1 };
    }
  }

  return state;
};
