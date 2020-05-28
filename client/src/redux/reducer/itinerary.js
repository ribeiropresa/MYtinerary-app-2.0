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

const initialState = {
    itineraries: [],
    itinerary: {},
    error: {},
    loading: true,
    submitted: false
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case GET_ITINERARIES:
            return {
                ...state,
                itineraries: payload,
                loading: false
            }
        case GET_ITINERARIES_FAIL:
        case GET_ITINERARY_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case GET_ITINERARY:
            return {
                ...state,
                itinerary: payload,
                loading: false
            }
        case ADD_ITINERARY:
            return {
                ...state,
                itinerary: payload,
                loading: false,
                submitted: true
            }
        case ADD_ITINERARY_FAIL:
            return {
                ...state,
                error: payload,
                loading: false,
                submitted: false
            }
        case UPDATE_LIKES:
            return {
                ...state,
                itineraries: state.itineraries.map(itinerary => itinerary._id === payload.id ? {
                    ...itinerary, likes: payload.likes
                } : itinerary),
                loading: false
            }
        case UPDATE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case ADD_COMMENT:
            return {
                ...state,
                itinerary: { ...state.itinerary, comments: payload },
                loading: false
            }
        case REMOVE_COMMENT:
            return {
                ...state,
                itinerary: {
                    ...state.itinerary,
                    comments: state.itinerary.comments.filter(comment => comment._id !== payload)
                },
                loading: false
            }
        default:
            return state;
    }
}