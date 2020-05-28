import React, { Fragment } from 'react';
import 'typeface-roboto';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

const NotFound = () => {
    return (
        <Fragment>
            <div className='not_found'>
                <h1>
                    <ReportProblemIcon className='icon_danger' />
                    Page Not Found
                </h1>
                <h6>Sorry, this page does not exist.</h6>
            </div>
        </Fragment>
    )
}

export default NotFound;