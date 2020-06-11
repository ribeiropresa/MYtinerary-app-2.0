import { combineReducers } from 'redux';
import alert from './reducer/alert';
import auth from './reducer/auth';
import cities from './reducer/cities';
import itinerary from './reducer/itinerary';
import profile from './reducer/profile';
import uploadPhoto from './reducer/uploadPhoto';

export default combineReducers({
    alert,
    auth,
    cities,
    itinerary,
    profile,
    uploadPhoto
})