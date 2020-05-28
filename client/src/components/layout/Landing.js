import React from 'react';
import { Redirect } from 'react-router-dom';
import 'typeface-roboto';
import CitiesImage from '../images/cities-img.jpg';

const Landing = ({ isAuthenticated }) => {
    if(isAuthenticated) {
        return <Redirect to='/cities' />;
    }

    return (
        <section className='container'>
            <img className='landing_photo' src={CitiesImage} alt='' />
            <h5 className='landing_text'>
                Find your perfect trip, designed by insiders who know and love their cities.
            </h5>
        </section>
    )
}

export default Landing
