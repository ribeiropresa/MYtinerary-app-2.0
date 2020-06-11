import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Box,
    Button,
    Container,
    Typography
} from '@material-ui/core';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import FaceIcon from '@material-ui/icons/Face';
import { getProfileById } from '../../redux/actions/profile';
import { getPhoto } from '../../redux/actions/uploadPhoto';
import Spinner from '../layout/Spinner'

const Profile =({
    getProfileById,
    getPhoto,
    profile: { profile, loading },
    uploadPhoto: { uploadPhoto, isUploaded },
    match
}) => {

    useEffect(() => {
        getProfileById(match.params.id);
        getPhoto(match.params.id);
    }, [getProfileById, getPhoto, match.params.id]);

    return (
        <Fragment>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <div className='container_profile_user'>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className='back_to_profiles'
                        >
                            <Link to='/profiles' className='back_to_profiles_link'> Back to Profiles</Link>
                        </Button>
                        <div className='box_profile_user'>
                            <div className='header_profile_user'><Typography>{uploadPhoto.name}</Typography><BlurOnIcon /><Typography>{profile.location}</Typography></div>
                            <Container>
                                <Box>
                                    {isUploaded ? (
                                        <div className='box_photo_profile_user'>
                                            <img className='photo_frame_profile_user' src={uploadPhoto.image} alt='' />
                                        </div>
                                    ) : (
                                        <div className='box_photo_profile_user'>
                                            <FaceIcon className='profile_face_icon'/>
                                        </div>
                                    )}
                                    
                                </Box>
                                <Box className='profile_box_bio'>{profile.bio}</Box>
                            </Container>
                        </div>
                        
                    </div>
                </Fragment>
            )}
        </Fragment>
    )

};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    getPhoto: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    uploadPhoto: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    uploadPhoto: state.uploadPhoto
});

export default connect(mapStateToProps, { getProfileById, getPhoto })(Profile);