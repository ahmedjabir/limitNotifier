import {
    API_REQUEST,
    API_SUCCESS,
    API_FAIL
} from '../constants';

const initialState = {
    fetching: false,
    data: null,
    success: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case API_REQUEST:
            return {
                ...state,
                fetching: true,
                data: null,
                success: false
            };

        case API_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: action.payload,
                success: true
            };


        case API_FAIL:
            return {
                ...state,
                fetching: false,                
                data: null,
                success: false
            };

        default:
            return state;
    }
}