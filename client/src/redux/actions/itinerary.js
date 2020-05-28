import axios from 'axios';
import { setAlert } from '../actions/alert';
import {
    GET_ITINERARIES,
    GET_ITINERARIES_FAIL,
    GET_ITINERARY,
    GET_ITINERARY_FAIL,
    ADD_ITINERARY,
    ADD_ITINERARY_FAIL,
    UPDATE_LIKES,
    UPDATE_ERROR,
    ADD_COMMENT,
    REMOVE_COMMENT
} from '../types';

// Get Itineraries
export const getItineraries = (city) => async dispatch => {
    try {
        const res = await axios.get(`/itineraries/${city}`);
        dispatch({
            type: GET_ITINERARIES,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: GET_ITINERARIES_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Get Itinerary
export const getItinerary = id => async dispatch => {
    try {
        const res = await axios.get(`/itineraries/itinerary/${id}`);
        console.log('success')
        dispatch({
            type: GET_ITINERARY,
            payload: res.data
        })
        console.log(res.data)

    } catch (err) {
        dispatch({
            type: GET_ITINERARY_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Add itinerary
export const addItinerary = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    console.log('success')
    try {
        await axios.put('/itineraries', formData, config);
        dispatch({
            type: ADD_ITINERARY
        });
        dispatch(setAlert('Itinerary Added', 'success'));
        console.log('danger')
    } catch (err) {
        dispatch({
            type: ADD_ITINERARY_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
        dispatch(setAlert('Update Error!', 'danger'));
    }
}

// Add Like
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/itineraries/like/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        })
        dispatch(setAlert('Thank you.', 'success'));
        
    } catch (err) {
        dispatch({
            type: UPDATE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
        dispatch(setAlert('Itinerary already liked!', 'danger'));       
    }
}

// Remove Like
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/itineraries/unlike/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        })
        console.log('unlike')
    } catch (err) {
        dispatch({
            type: UPDATE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
        dispatch(setAlert('Itinerary has not been liked!', 'danger'));  
    }
}

// Add Comment
export const addComment = (itineraryId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/itineraries/comment/${itineraryId}`, formData, config);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
        dispatch(setAlert('Comment Added', 'success'));

    } catch (err) {
        dispatch({
            type: UPDATE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete Comment
export const deleteComment = (itineraryId, commentId) => async dispatch => {
    try {
        await axios.delete(`/itineraries/comment/${itineraryId}/${commentId}`);
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })
        dispatch(setAlert('Comment Removed', 'success'));

    } catch (err) {
        dispatch({
            type: UPDATE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}