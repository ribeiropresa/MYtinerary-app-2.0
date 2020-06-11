import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';

const Progress = ({ percentage }) => {
    return (
        <div className="progress">
            <LinearProgress
                style={{ width: `${percentage}%` }} 
            />
        </div>
    )
}

Progress.propTypes = {
    percentage: PropTypes.number.isRequired
}

export default Progress