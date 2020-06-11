import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addCity } from '../../redux/actions/cities';
import {
    Button,
    TextField,
    Typography
} from '@material-ui/core';
import LocationCityIcon from '@material-ui/icons/LocationCity';

const AddCity = ({ addCity, submitted }) => {

    const [formData, setFormData] = useState({
        city: '',
        country: '', 
        image: '',
        submitted: false
    }, [addCity]);

    const { city, country, image } = formData;

    const onChange = e => setFormData({ 
        ...formData,
        [e.target.name]: e.target.value 
    });

    if(submitted) {
        return <Redirect to={`/add_itinerary/${city}`} /> 
    }

    return (
        <Fragment>
            <div className='city_form'>
                <div className='header_icon_text'>
                    <LocationCityIcon className='icon_city' />
                    <Typography className='form_title'>Add City</Typography>
                </div>
                <form onSubmit={e => {
                    e.preventDefault();
                    addCity(formData);
                }}>
                    <div>
                        <TextField
                            id='city'
                            type='city'
                            name='city'
                            value={city}
                            label='City name...'
                            variant='outlined'
                            required
                            fullWidth                                       				    
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div>
                        <TextField
                            id='country'
                            type='country'
                            name='country'
                            value={country}
                            label='Country...'
                            variant='outlined'
                            required
                            fullWidth                                       				    
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div>
                        <TextField
                            id='image'
                            type='text'
                            name='image'
                            value={image}
                            label='Image...'
                            variant='outlined'
                            required
                            fullWidth                                       				    
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <Button
                        className='form_submits'
                        type='submit'
                        variant='contained'
                        fullWidth
                    >ADD CITY</Button>
                </form>
            </div>
        </Fragment>
    )
};

AddCity.propTypes = {
    addCity: PropTypes.func.isRequired,
    submitted: PropTypes.bool
};

const mapStateToProps = state => ({
    submitted: state.itinerary.submitted
})

export default connect(mapStateToProps, { addCity })(AddCity);