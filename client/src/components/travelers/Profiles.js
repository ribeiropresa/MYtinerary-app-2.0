import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Typography
} from '@material-ui/core';
import { getProfiles } from '../../redux/actions/profile';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import ProfileItem from './ProfileItem';
import Spinner from '../layout/Spinner';

const Profiles = ({
    getProfiles, 
    profile: { profiles, loading },
}) => {
    
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return (
        <Fragment>
            {loading ? (<Spinner />) : 
            <Fragment>
                <div className='traveler_header'>
                    <Typography className='form_title'>Travelers</Typography>
                    <h3 className='traveler_info'>
                        <EmojiPeopleIcon />
                        Connect with developers
                    </h3>
                </div>
                <div className='profiles_container'>
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                            <ProfileItem key={profile._id} profile={profile} />
                        ))
                    ) : (
                        <h4>No profiles found...</h4>
                    )}
                </div>
            </Fragment>}
        </Fragment>
    )
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);