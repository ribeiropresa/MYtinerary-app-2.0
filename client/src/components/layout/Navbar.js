import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'typeface-roboto';
import { logout } from '../../redux/actions/auth';
import {
    AppBar,
    Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';

const Navbar = ({ auth: { user, isAuthenticated, loading }, logout }) => {

    const authLinks = (
        <div className='navbar_display'>
            <div className='navbar_title'>
                <Link to='/profile_and_cities' className='navbar_title_link'>
                    <MenuIcon className='icon_navbar'/>
                    <h4 className='navbar_title_text'>MYtinerary</h4>
                </Link>
            </div>

            <div className='buttons'>
                <div className='navbar_username'>
                    <PersonIcon className='icon_profile'/>
                    <h4 className='username'>{ user && user.name }</h4>
                </div>
                <div className='navbar_button_logout'>
                    <Button 
                        className='button2' 
                        variant="contained" 
                        color="primary"
                        onClick={logout}
                    >
                        <Link to='/login'><h5 className='navbar_text_button'>Logout</h5></Link>
                    </Button>    
                </div> 
            </div>    
        </div>
    )

    const guestLinks = (
        <div className='navbar_display'>
            <div className='navbar_title'>
                <Link to='/' className='navbar_title_link'>
                    <MenuIcon className='icon_navbar'/>
                    <h4 className='navbar_title_text'>MYtinerary</h4>
                </Link>
            </div>

            <div className='buttons'>
                <div className='navbar_button1'>
                    <Button className='button1' variant="contained" color="primary">
                        <Link to='/login'><h5 className='navbar_text_button'>Login</h5></Link>
                    </Button>
                </div>
                <div className='navbar_button2'>
                    <Button className='button2' variant="contained" color="primary">
                        <Link to='/register'><h5 className='navbar_text_button'>Sign up</h5></Link>
                    </Button>    
                </div>              
            </div>
        </div>
    )

    return (
        <AppBar className='navbar' position='static'>
            { !loading && (<Fragment>
                { isAuthenticated ? authLinks : guestLinks }
                </Fragment>) 
            }
        </AppBar>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);