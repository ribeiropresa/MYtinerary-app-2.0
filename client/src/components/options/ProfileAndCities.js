import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Button
} from '@material-ui/core';

const ProfileAndCities = ({ auth: { user } }) => {
    
    return (
        <Fragment>
            <div className='container_options'>
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                ><Link to={`/create_profile/${user.name}`} className='link_options'>CREATE PROFILE</Link></Button>
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                ><Link to='/cities' className='link_options'>CITIES</Link></Button>
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                ><Link to='/profiles' className='link_options'>TRAVELERS</Link></Button>
            </div>
        </Fragment>
    )
};

ProfileAndCities.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(ProfileAndCities);