export const FAV_ADD = 'FAV_ADD';
export const FAV_REMOVE = 'FAV_REMOVE';

export const addFavourite = favItem => {
  return async dispatch => {
    dispatch({
      type: FAV_ADD,
      favItem: favItem,
    });
  };
};

export const removeFavourite = favItem => {
  return async dispatch => {
    dispatch({
      type: FAV_REMOVE,
      favItem: favItem,
    });
  };
};
