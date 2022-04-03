export const HOME_SUCCESS = 'HOME_SUCCESS';
export const HOME_LOADING = 'HOME_LOADING';
export const HOME_FAILED = 'HOME_FAILED';

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_LOADING = 'SEARCH_LOADING';
export const SEARCH_FAILED = 'SEARCH_FAILED';

export const HOME_CLEAR = 'HOME_CLEAR';

import {fetchHomeData, searchData, fetchUrlDetail} from 'utils/apiProcessor';

export const fetchHome = (pageNumber, limit) => {
  return async dispatch => {
    dispatch({
      type: HOME_LOADING,
      isLoading: true,
    });

    let res = await fetchHomeData(pageNumber, limit);

    if (res) {
      if (res.data) {
        let data = {
          data: res.data,
        };

        dispatch({
          type: HOME_SUCCESS,
          isLoading: false,
          payload: data,
        });
      } else {
        dispatch({
          type: HOME_FAILED,
          isLoading: false,
        });
      }
    } else {
      dispatch({
        type: HOME_FAILED,
        isLoading: false,
      });
    }
  };
};

export const search = (query, pageNumber, limit) => {
  return async dispatch => {
    dispatch({
      type: SEARCH_LOADING,
      isLoading: true,
    });

    let res = await searchData(query, pageNumber, limit);

    if (res) {
      if (res.data) {
        let arrPromise = [];
        for (let i = 0; i < res.data.length; i++) {
          arrPromise.push(fetchUrlDetail(res.data[i].api_link));
        }

        Promise.all(arrPromise)
          .then(function (responses) {
            // Get a JSON object from each of the responses
            return Promise.all(
              responses.map(function (response) {
                return response.json();
              }),
            );
          })
          .then(function (promiseData) {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i] = {...res.data[i], ...promiseData[i].data};
            }

            dispatch({
              type: SEARCH_SUCCESS,
              isLoading: false,
              payload: res.data,
            });
          });
      } else {
        dispatch({
          type: SEARCH_FAILED,
          isLoading: false,
        });
      }
    } else {
      dispatch({
        type: SEARCH_FAILED,
        isLoading: false,
      });
    }
  };
};

export const homeClear = () => dispatch => {
  dispatch({
    type: HOME_CLEAR,
    isLoading: false,
  });
};
