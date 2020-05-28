import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { getItinerary } from '../../redux/actions/itinerary';
import ItineraryItem from './ItineraryItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import Spinner from '../layout/Spinner';

const Itinerary = ({ getItinerary, itinerary: { itinerary, loading }, match }) => {
    
    useEffect(() => {
        getItinerary(match.params.id);
    }, [getItinerary, match.params.id]);

    return loading ? <Spinner /> : <Fragment>
        <div className='itinerary_container'>
            <div className='itinerary_content'>
                <ItineraryItem itinerary={itinerary} />
                <CommentForm itineraryId={itinerary._id} />
                <div className='comments_list'>
                    {itinerary.comments.map(comment => (
                        <CommentItem key={comment._id} comment={comment} itineraryId={itinerary._id} />
                    ))}
                </div>
            </div>
            <div className='box_buttons'>
                <Button
                    className='form_submits'
                    type="submit"
                    variant="contained"
                    fullWidth
                ><Link to={`/city/${match.params.city}`}>ITINERARIES</Link></Button>
                <Button
                    className='form_submits'
                    type="submit"
                    variant="contained"
                    fullWidth
                ><Link to='/cities'>CITIES</Link></Button>
            </div>
        </div>
    </Fragment>
};

Itinerary.propTypes = {
    getItinerary: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    itinerary: state.itinerary
})

export default connect(mapStateToProps, { getItinerary })(Itinerary);
