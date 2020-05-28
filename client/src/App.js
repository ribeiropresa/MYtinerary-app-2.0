import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// Redux
import store from './store';
import { loadUser } from './redux/actions/auth';
import setAuthToken from './utilities/setAuthToken';
//Components
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Routes from './components/routing/Routes';
// CSS
import './App.css';

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className='App'>
      <Provider store = {store}>
        <Router>
          <Fragment>
            <Header />
            <Navbar />
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route component={Routes} />
            </Switch>
            <Footer />
          </Fragment>
        </Router>
      </Provider>
    </div>
  )
};

export default App;
