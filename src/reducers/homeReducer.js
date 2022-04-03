import {
  HOME_SUCCESS,
  HOME_LOADING,
  HOME_FAILED,
  SEARCH_SUCCESS,
  SEARCH_LOADING,
  SEARCH_FAILED,
} from 'actions/homeAction';
import {HOME_CLEAR} from '../actions/homeAction';

const initialHomeState = {
  isLoading: false,
  data: {
    data: [],
  },
};

export const homeReducer = (state = initialHomeState, action) => {
  switch (action.type) {
    case HOME_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        data: {
          data: state.data.data
            ? [...state.data.data, ...action.payload.data]
            : action.payload,
        },
      };
    case HOME_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case HOME_FAILED:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        data: {
          data: state.data.data
            ? [...state.data.data, ...action.payload]
            : action.payload,
        },
      };
    case SEARCH_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case SEARCH_FAILED:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case HOME_CLEAR:
      return {
        ...state,
        ...initialHomeState,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};
