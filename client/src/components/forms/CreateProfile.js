import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Button,
    TextField,
    Typography
} from '@material-ui/core';
import { createProfile } from '../../redux/actions/profile';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import YouTubeIcon from '@material-ui/icons/YouTube';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

const CreateProfile = ({ 
    createProfile,
    auth: {user},
    history 
}) => {

    const [formData, setFormData] = useState({
        location: '',
        bio: '',
        youtube: '',
        facebook: '',
        twitter: '',
        instagram: ''
    })

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    const {
        location,
        bio,
        youtube,
        facebook,
        twitter,
        instagram
    } = formData;

    const onChange = e => setFormData({ 
        ...formData,
        [e.target.name]: e.target.value 
    });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
        console.log(formData)
    }

    return (
        <div className='container'>
            <div className='header_icon_text'>
                <AssignmentIndIcon className='icon_city'/>
                <Typography className='form_title'>Create Your Profile</Typography>
                <div className='go_to_photo_box'>  
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        className='go_to_photo'
                    >
                        <Link to={`/add_photo/${user._id}`}>
                            <h3 className='add_photo_button'>Photo</h3>
                        </Link>
                    </Button>
                </div>      
            </div>
            <form onSubmit={e => onSubmit(e)}>
                <div className='create_profile_form_container'>
                    <div>
                        <TextField
                            id='location'
                            type='location'
                            name='location'
                            value={location}
                            label='Location'
                            variant='outlined'
                            required
                            fullWidth
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div>
                        <TextField
                            className='bio_textfield'
                            id='bio'
                            type='text'
                            name='bio'
                            value={bio}
                            label='About you'
                            variant='outlined'
                            fullWidth
                            multiline
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className='social_networks_option'>
                        <Button
                            className='go_to_itineraries'
                            color='primary'
                            type='submit'
                            variant='contained'
                            fullWidth
                            onClick={() => toggleSocialInputs(!displaySocialInputs)}
                        >Social Networks</Button>
                        <span className='alert_optional'>Optional</span>
                    </div>
                    {displaySocialInputs && 
                        <Fragment>
                            <div className='network_container'>
                                <div>
                                    <YouTubeIcon />
                                    <TextField
                                        id='youtube'
                                        type='youtube'
                                        name='youtube'
                                        value={youtube}
                                        label='Youtube URL'
                                        variant='outlined'
                                        fullWidth
                                        onChange={e => onChange(e)}
                                    />
                                </div>
                                <div>
                                    <FacebookIcon />
                                    <TextField
                                        id='facebook'
                                        type='facebook'
                                        name='facebook'
                                        value={facebook}
                                        label='Facebook URL'
                                        variant='outlined'
                                        fullWidth
                                        onChange={e => onChange(e)}
                                    />
                                </div>
                                <div>
                                    <TwitterIcon />
                                    <TextField
                                        id='twitter'
                                        type='twitter'
                                        name='twitter'
                                        value={twitter}
                                        label='Twitter URL'
                                        variant='outlined'
                                        fullWidth
                                        onChange={e => onChange(e)}
                                    />
                                </div>
                                <div>
                                    <InstagramIcon />
                                    <TextField
                                        id='instagram'
                                        type='instagram'
                                        name='instagram'
                                        value={instagram}
                                        label='Instagram URL'
                                        variant='outlined'
                                        fullWidth
                                        onChange={e => onChange(e)}
                                    />
                                </div>
                                
                            </div>
                        </Fragment>
                    }
                </div>
                <div className='create_profile_button'>
                    <Button
                        className='form_submits'
                        type='submit'
                        variant='contained'
                        fullWidth
                    >CREATE PROFILE</Button>
                </div>    
            </form>
        </div>
    )
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));