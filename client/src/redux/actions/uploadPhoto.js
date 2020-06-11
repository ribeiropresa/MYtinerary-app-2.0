import axios from 'axios';
import { setAlert } from '../actions/alert';
import {
    GET_PHOTO,
    DELETE_PHOTO,
    PHOTO_ERROR
} from '../types';

// Get one photo
export const getPhoto = userId => async dispatch => {
    try {
        const res = await axios.get(`/upload_photo/${userId}`);
        dispatch({
            type: GET_PHOTO,
            payload: res.data
        })
        console.log(res.data)
    } catch (err) {
        dispatch({
            type: PHOTO_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Delete photo
export const deletePhoto = id => async dispatch => {
    try {
        await axios.delete(`/upload_photo`)
        dispatch({
            type: DELETE_PHOTO,
            payload: id
        })
        dispatch(setAlert('Photo removed', 'danger'))
    } catch (err) {
        dispatch({
            type: PHOTO_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}