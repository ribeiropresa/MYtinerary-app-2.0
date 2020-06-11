import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
    profile: {
        user: { _id, name },
        location
    }
}) => {
    return (
        <div className='profile_item_box'>
            <h3>{name}</h3>
            <p>{location}</p>
            <Link to={`/profile/${_id}`} className='link_to_profile'>View Profile</Link>
        </div>
    )
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileItem;