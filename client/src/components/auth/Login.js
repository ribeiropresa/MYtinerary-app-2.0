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
} from '@material-ui/core'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { login } from '../../redux/actions/auth';

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ 
        ...formData,
        [e.target.name]: e.target.value 
    })

    const onSubmit = e => {
        e.preventDefault();
        login(email, password)
    }

    if(isAuthenticated) {
        return <Redirect to='/profile_and_cities' />;
    }

    return (
        <Fragment>
            <div className='form_header'>
                <LockOpenIcon className='icon_register' />
                <Typography className='form_title'>Login</Typography>
            </div>
            <form onSubmit={e => onSubmit(e)}>
                <div>
                    <TextField
                        id="email"
                        type="email"
                        name="email"
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
                        label="Password"                       
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
                >LOGIN</Button>
                <Grid className='grid_to_login' container justify="flex-end">
                    <Grid item>
                        <Link className='to_login' to="/register" variant="body2">{"Don't have an account? Sign Up!"}</Link>
                    </Grid>
                </Grid>
            </form>
        </Fragment>
    )
} 

Login.propTypes ={
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);