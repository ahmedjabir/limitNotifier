import Api from '../services/api';

import { 
  API_REQUEST,
  API_SUCCESS,
  API_FAIL,
} from "../constants";


export function getUpdatedRate() {
  
  return (dispatch) => {
    dispatch({ type: API_REQUEST })

    return Api.get('/v1/bpi/currentprice.json')
        .then((response) => {
            dispatch({              
              type: API_SUCCESS,              
              payload: response?.data,              
            });
        })
        .catch((error) => {
          dispatch({
              type: API_FAIL,
              payload: error
          });
        });
  }
}