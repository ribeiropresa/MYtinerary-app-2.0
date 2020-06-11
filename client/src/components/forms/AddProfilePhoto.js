import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { 
    getPhoto,
    deletePhoto
} from '../../redux/actions/uploadPhoto';
import { setAlert } from '../../redux/actions/alert';
import Progress from '../layout/Progress';
import {
    Button,
    IconButton,
    TextField,
    Typography
} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PublishIcon from '@material-ui/icons/Publish';

const AddProfilePhoto = ({ 
    getPhoto,
    deletePhoto,
    setAlert,
    uploadPhoto: { uploadPhoto, isUploaded }, 
    match 
}) => {

    useEffect(() => {
        getPhoto(match.params.id);
    }, [getPhoto, match.params.id])

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);

        try {
            
            await axios.put('http://localhost:5000/upload_photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                    setTimeout(() => setUploadPercentage(0), 5000);
                }
            });

        } catch (err) {
            
            if(err.response.status === 500) {
                return (setAlert('No photo has been added', 'danger'));
            } else {
                return (err.response.data.msg)
            }
        }
    }

    const refreshPage = () => {
        window.location.reload(false)
    }

    return (
        <Fragment>        
            <div className='header_icon_text'>
                <PublishIcon className='icon_city'/>
                <Typography className='form_title'>Upload Photo</Typography>
            </div>
            <div className='refresh_button'>
                <h5 className='alert_refresh'>* Refresh page after action</h5>
                <Button 
                    type='submit'
                    variant='contained'
                    color='primary'
                    className='refresh_photo'
                    onClick={e => refreshPage(e)}
                >REFRESH</Button>
            </div>
            { isUploaded ? (
                <div className='box_photo_info'>     
                    <div className='box_photo_info_frame'>
                        <h4 className='user_photo_name'>{uploadPhoto.name}</h4>
                        <div className='box_photo'>
                            <img className='photo_frame' src={uploadPhoto.image} alt='' />
                        </div>
                        <div className='delete_photo_button'>
                            <Button 
                                type='submit'
                                variant='contained'
                                color='primary'
                                className='delete_photo'
                                onClick={e => deletePhoto(e)}
                            >CHANGE</Button>
                        </div> 
                         
                    </div>
                </div>
                ) : (
                <div className='box_photo_info'>
                    <form onSubmit={e => onSubmit(e)} className='upload_photo_box'>
                        <div>
                            <TextField
                                variant='outlined'
                                name="upload-photo"
                                type="file"
                                onChange={e => onChange(e)}
                                label={filename}
                            />
                        </div>
                        <div className='create_profile_button'>
                            <IconButton
                                className='upload_icon'
                                type='submit'
                            ><PhotoCamera /></IconButton>
                        </div>
                    </form>
                    <Progress percentage={uploadPercentage}/>  
                </div> 
            )}
            <div className='button_upload_options'>
                <Button
                    className='go_to_itineraries'
                    type="submit"
                    variant="contained"
                    fullWidth
                ><Link to='/profile_and_cities' className='link_go_to_itineraries'
                >Back to Options</Link></Button>
            </div>
        </Fragment>
    );
}

AddProfilePhoto.propTypes = {
    getPhoto: PropTypes.func.isRequired,
    deletePhoto: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    uploadPhoto: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    uploadPhoto: state.uploadPhoto
})

export default connect(mapStateToProps, { getPhoto, deletePhoto, setAlert })(AddProfilePhoto);