import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddCity from '../forms/AddCity';
import AddItinerary from '../forms/AddItinerary';
import AddProfilePhoto from '../forms/AddProfilePhoto';
import Alert from '../layout/Alert';
import Cities from '../cities/Cities';
import CreateProfile from '../forms/CreateProfile';
import Itineraries from '../itineraries/Itineraries';
import Itinerary from '../itineraries/Itinerary';
import Login from '../auth/Login';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import ProfileAndCities from '../options/ProfileAndCities';
import Profile from '../travelers/Profile';
import Profiles from '../travelers/Profiles';
import Register from '../auth/Register';

const Routes = () => {
    return (
        <section className='container'>
            <Alert />
            <Switch>
                <Route exact path='/cities' component={Cities} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/profiles' component={Profiles} />
                <Route exact path='/profile/:id' component={Profile} />
                <PrivateRoute exact path='/add_city' component={AddCity} />
                <PrivateRoute exact path='/add_itinerary/:city' component={AddItinerary} />
                <PrivateRoute exact path='/add_photo/:id' component={AddProfilePhoto} />
                <PrivateRoute exact path='/create_profile/:id' component={CreateProfile} />
                <PrivateRoute exact path='/city/:city' component={Itineraries} />
                <PrivateRoute exact path='/city/:city/:id' component={Itinerary} />
                <PrivateRoute exact path='/profile_and_cities' component={ProfileAndCities} />
                
                <Route component={NotFound} />
            </Switch>   
        </section> 
    )
}

export default Routes;