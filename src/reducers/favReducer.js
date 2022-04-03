import {FAV_ADD, FAV_REMOVE} from 'actions/favAction';

const initialState = {
  isLoading: false,
  data: null,
};

const favReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAV_ADD:
      return {
        ...state,
        data: [...state.data, action.favItem],
      };
    case FAV_REMOVE:
      for (let i = 0; i < state.data.length; i++) {
        if (state.data[i].id === action.favItem.id) {
          state.data.splice(i, 1);
        }
      }
      return {
        ...state,
        data: state.data,
      };
    default:
      return state;
  }
};

export default favReducer;
