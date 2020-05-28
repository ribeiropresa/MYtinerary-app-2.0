import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddCity from '../forms/AddCity';
import AddItinerary from '../forms/AddItinerary';
import Alert from '../layout/Alert';
import Cities from '../cities/Cities';
import Itineraries from '../itineraries/Itineraries';
import Itinerary from '../itineraries/Itinerary';
import Login from '../auth/Login';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import Register from '../auth/Register';

const Routes = () => {
    return (
        <section className='container'>
            <Alert />
            <Switch>
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <PrivateRoute exact path='/add_city' component={AddCity} />
                <PrivateRoute exact path='/add_itinerary/:city' component={AddItinerary} />
                <PrivateRoute exact path='/cities' component={Cities} />
                <PrivateRoute exact path='/city/:city' component={Itineraries} />
                <PrivateRoute exact path='/city/:city/:id' component={Itinerary} />
                <Route component={NotFound} />
            </Switch>   
        </section> 
    )
}

export default Routes;