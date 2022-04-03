import {FAV_ADD, FAV_REMOVE} from 'actions/favAction';

const initialState = {
  data: [],
};

const favReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAV_ADD:
      let tempData = [];

      if (state.data) {
        tempData = [...state.data, action.favItem];
      } else {
        tempData = [action.favItem];
      }

      return {
        ...state,
        data: tempData,
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
