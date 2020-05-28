import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'typeface-roboto';
import {
    Button,
    Grid,
    TextField,
    Typography
} from '@material-ui/core';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { setAlert } from '../../redux/actions/alert';
import { register } from '../../redux/actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        //image: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ 
        ...formData,
        [e.target.name]: e.target.value 
    })

    const onSubmit = e => {
        e.preventDefault();
        if(password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({ name, email, password });
        }
    }

    if(isAuthenticated) {
        return <Redirect to='/cities' />;
    }

    return (
        <Fragment>
            <div className='form_header'>
                <AssignmentIndIcon className='icon_register' />
                <Typography className='form_title'>Register</Typography>
            </div>
            <form onSubmit={e => onSubmit(e)}>
                <div>
                    <TextField
                        id="name"
                        type="name"
                        name="name"
                        value={name}
                        label="Name"
                        variant="outlined"
                        required
                        fullWidth
                        onChange={e => onChange(e)}
                    />
                </div>
                <div>
                    <TextField
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        label="Email Address"
                        variant="outlined"
                        required
                        fullWidth                                       				    
                        onChange={e => onChange(e)}
                    />
                </div>
                <div>
                    <TextField
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        label="Password"                       
                        variant="outlined"
                        required
                        fullWidth
                        onChange={e => onChange(e)}
                    />
                </div>
                <div>
                    <TextField
                        id="password2"
                        type="password"
                        name="password2"
                        value={password2}
                        label="Confirm Password"
                        variant="outlined"
                        required
                        fullWidth
                        onChange={e => onChange(e)}
                    />
                </div>
                <Button
                    className='form_submits'
                    type="submit"
                    variant="contained"
                    fullWidth
                >REGISTER</Button>
                <Grid className='grid_to_login' container justify="flex-end">
                    <Grid item>
                        <Link className='to_login' to="/login" variant="body2">{"Already have an account? Sign In!!"}</Link>
                    </Grid>
                </Grid>
            </form>
        </Fragment>
    )
} 

Register.propTypes ={
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);
