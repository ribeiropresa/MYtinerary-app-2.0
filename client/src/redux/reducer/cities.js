import {
    GET_CITIES,
    GET_CITIES_FAIL,
    GET_CITY,
    GET_CITY_FAIL,
    ADD_CITY,
    ADD_CITY_FAIL
} from '../types';

const initialState = {
    cities: [],
    city: {},
    error: {},
    loading: true,
    submitted: false
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case GET_CITIES:
            return {
                ...state,
                cities: payload,
                loading: false
            }
        case GET_CITIES_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case GET_CITY:
            return {
                ...state,
                city: payload,
                loading: false
            }
        case GET_CITY_FAIL: 
            return {
                ...state,
                error: payload,
                loading: false
            }
        case ADD_CITY:
            return {
                ...state,
                city: payload,
                payload: false,
                submitted: true
            }
        case ADD_CITY_FAIL:
            return {
                ...state,
                error: payload,
                loading: false,
                submitted: false
            }
        default:
            return state;
    }
}

  