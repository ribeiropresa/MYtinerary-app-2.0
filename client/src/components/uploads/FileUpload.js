import React, {Fragment, useState} from 'react';
import axios from 'axios';
import {
    Button,
    TextField,
} from '@material-ui/core';

const FileUpload = () => {

    const [file, setFile] = useState('');
    
    const onChange = e => {
        setFile(e.target.files[0]);
    };

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        axios.post('http://localhost:3000/users/', formData, {})
            .then(res => {
                console.log(res)
            })
    };

    return (
        <Fragment>
            <div onSubmit={onSubmit}>
                <div>
                    <TextField
                        className='input_upload'
                        type='file'
                        value={file} 
                        // label='Choose File...'
                        variant='outlined'
                        onChange={onChange}
                        fullWidth                                       				    
                    />
                </div>
                <Button
                        className='go_to_itineraries'
                        type='submit'
                        variant='contained'
                        fullWidth
                >UPLOAD FILE</Button>
            </div>
        </Fragment>
    )
};

export default FileUpload;