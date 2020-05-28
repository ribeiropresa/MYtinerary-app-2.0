import React, { Fragment, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOneCity } from '../../redux/actions/cities';
import { addItinerary } from '../../redux/actions/itinerary';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';

const AddItinerary = ({ getOneCity, addItinerary, match, submitted }) => {

    useEffect(() => {
        getOneCity(match.params.city);
    }, [getOneCity, match.params.city]);

    const [formData, setFormData] = useState({
        city: `${match.params.city}`,
        title: '', 
        duration: '',
        price: '',
        description: '',
        hashtags: '',
        image: '',
        submitted: false
    }, [addItinerary]);

    const { 
        city, 
        title, 
        description,
        hashtags,
        image 
    } = formData

    const onChange = e => setFormData({ 
        ...formData,
        [e.target.name]: e.target.value 
    });

    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState('');

  const handleChange = (event) => {
    setDuration(event.target.value);
    setPrice(event.target.value);
  };

    if(submitted) {
        return <Redirect to={`/city/${city}`} />
    }

    return (
        <Fragment>
            <div className='itinerary_form'>
                <div className='header_icon_text'>
                    <MapIcon className='icon_city' />
                    <Typography className='form_title'>Add Itinerary</Typography>
                </div>
                <form onSubmit={e => {
                    e.preventDefault();
                    addItinerary(formData);
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
                        />
                    </div>
                    <div>
                        <TextField
                            id='title'
                            type='title'
                            name='title'
                            value={title}
                            label='Title...'
                            variant='outlined'
                            required
                            fullWidth                                       				    
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className='selector_box'>
                        <FormControl variant='outlined' className='selector_input'>
                            <InputLabel>Duration</InputLabel>
                            <Select
                            value={duration}
                            onChange={handleChange}
                            label='Duration'
                            >
                                <MenuItem value=''>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>{'< 1 Hour'}</MenuItem>
                                <MenuItem value={1}>{'> 1 Hour'}</MenuItem>
                                <MenuItem value={2}>2 Hours</MenuItem>
                                <MenuItem value={3}>3 Hours</MenuItem>
                                <MenuItem value={6}>6 Hours</MenuItem>
                                <MenuItem value={8}>8 Hours</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant='outlined' className='selector_input'>
                            <InputLabel>Price</InputLabel>
                            <Select
                            value={price}
                            onChange={handleChange}
                            label='Price'
                            >
                                <MenuItem value=''>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'$'}>$</MenuItem>
                                <MenuItem value={'$$'}>$$</MenuItem>
                                <MenuItem value={'$$$'}>$$$</MenuItem>
                                <MenuItem value={'$$$$'}>$$$$</MenuItem>
                                <MenuItem value={'$$$$$'}>$$$$$</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <TextField
                            id='description'
                            type='description'
                            name='description'
                            value={description}
                            label='Description...'
                            variant='outlined'
                            required
                            fullWidth                                       				    
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div>
                        <TextField
                            id='hashtags'
                            type='hashtags'
                            name='hashtags'
                            value={hashtags}
                            label='Hashtags...'
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
                    >ADD ITINERARY</Button>
                </form>
            </div>    
        </Fragment>
    )
};

AddItinerary.propTypes = {
    getOneCity: PropTypes.func.isRequired,
    addItinerary: PropTypes.func.isRequired,
    submitted: PropTypes.bool
};

const mapStateToProps = state => ({
    submitted: state.itinerary.submitted
})

export default connect(mapStateToProps, { getOneCity, addItinerary })(AddItinerary);