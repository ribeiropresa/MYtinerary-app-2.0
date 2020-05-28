import React from 'react';
import { Typography } from '@material-ui/core';
import 'typeface-roboto';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';

const Footer = () => {
    return (
        <div className='footer' bgcolor='primary.main' color='primary.contrastText' align='center'>
            <Typography variant="h6">
                { 'Copyright ©' }{' '}
                MYtinerary<FlightTakeoffIcon className='footer_link_icon'/>    
                {' '}{'2020'} 
            </Typography>
        </div>
    )
}

export default Footer;