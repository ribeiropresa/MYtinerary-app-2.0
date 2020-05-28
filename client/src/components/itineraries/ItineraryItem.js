import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { addLike, removeLike } from '../../redux/actions/itinerary';
import BackgroundMaps from '../images/background_maps.jpg';

const ItineraryItem = ({
    addLike,
    removeLike,
    itinerary: { _id, title, description, date, likes, name }
}) => {

    return <div>
        <div className='city_itineraries'
            style={{
                backgroundImage:`url(${BackgroundMaps})`
            }}
        ><h6 className='title_description'>{title}</h6>
            <div className='likes_button'>
                <button 
                    type="button" 
                    className="btn btn-light"
                    onClick={e => addLike(_id)}
                ><i className="fas fa-thumbs-up"></i>{' '}
                <span>{likes.length > 0 && (
                    <span>{likes.length}</span>
                )}</span>
                </button>
                <button 
                    type="button" 
                    className="btn btn-light"
                    onClick={e => removeLike(_id)}
                ><i className="fas fa-thumbs-down"></i>
                </button>
            </div>
        </div>
        <section className='itinerary_description'>
            <h5>{description}</h5>
            <div className='comment_item_info'>
                <div className='comment_item_name'>Created by:&nbsp;{name}</div>
                <div className='comment_item_date'>Posted on:&nbsp;<Moment format='YYYY/MM/DD'>{date}</Moment></div>
            </div>
        </section>
    </div>
};

ItineraryItem.propTypes = {
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    itinerary: PropTypes.object.isRequired
};

export default connect(null, { 
    addLike, 
    removeLike 
})(ItineraryItem);