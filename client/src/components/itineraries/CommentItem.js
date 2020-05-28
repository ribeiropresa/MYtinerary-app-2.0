import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteComment } from '../../redux/actions/itinerary';

const CommentItem = ({
    itineraryId,
    comment: { _id, text, name, user, date },
    auth,
    deleteComment
}) => (
    <div className='comment_item'>
        <div className='delete_button'>
            {!auth.loading && user === auth.user._id && (
                <button
                    className='comment_item_delete_button'
                    type='button'
                    onClick={e => deleteComment(itineraryId, _id)}
                >X</button>
            )}
        </div>
        <div className='comment_item_text'>{text}</div>
        <div className='comment_item_info'>
            <div className='comment_item_name'>Created by:&nbsp;{name}</div>
            <div className='comment_item_date'>Posted on:&nbsp;<Moment format='YYYY/MM/DD'>{date}</Moment></div>
        </div>
    </div>    
)

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    itineraryId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);