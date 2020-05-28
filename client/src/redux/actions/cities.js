import axios from 'axios';
import { setAlert } from '../actions/alert';
import {
    GET_CITIES,
    GET_CITIES_FAIL,
    GET_CITY,
    GET_CITY_FAIL,
    ADD_CITY,
    ADD_CITY_FAIL
} from '../types';


// Add city
export const addCity = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        await axios.put('/cities', formData, config);
        dispatch({
            type: ADD_CITY
        });
        dispatch(setAlert('City Added', 'success'));

    } catch (err) {
        dispatch({
            type: ADD_CITY_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
        dispatch(setAlert('City already exists.', 'danger'));
    }
}

// Get Cities
export const getCities = () => async dispatch => {
    try {
        const res = await axios.get('/cities');
        dispatch({
            type: GET_CITIES,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: GET_CITIES_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

}

// Get One City
export const getOneCity = (city) => async dispatch => {
    try {
        const res = axios.get(`/cities/${city}`);
        dispatch({
            type: GET_CITY,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: GET_CITY_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}