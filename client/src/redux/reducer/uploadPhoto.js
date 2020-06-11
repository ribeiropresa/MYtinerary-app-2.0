import {
    GET_PHOTO,
    DELETE_PHOTO,
    PHOTO_ERROR,
} from '../types';

const initialState = {
    uploadPhotos: [],
    uploadPhoto: {},
    isUploaded: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case GET_PHOTO:
            return {
                ...state,
                uploadPhoto: payload,
                isUploaded: true,
                loading: false
            };
        case DELETE_PHOTO:
            return {
                ...state,
                uploadPhotos: state.uploadPhotos.filter(uploadPhoto => uploadPhoto._id !== payload),
                loading: false
            }
        case PHOTO_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            }
        default:
            return state;
    }
}