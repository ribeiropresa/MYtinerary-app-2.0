import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { addComment } from '../../redux/actions/itinerary';

const CommentForm = ({ itineraryId, addComment }) => {

    const [text, setText] = useState('');

    return (
        <div className='post_form'>
            <div className='text_input_comment'>
                <h5 className='comment_box_message'>Leave a comment...</h5>
            </div>
            <form className="form my-1" onSubmit={e => {
                e.preventDefault();
                addComment( itineraryId, { text });
                setText('');
            }}>
                <textarea
                    className='comment_box'
                    name="text"
                    placeholder="Create a post"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                ></textarea>
                <Button
                    className='send_comment'
                    type="submit"
                    variant="contained"
                    value='Submit'
                    fullWidth
                ><h5 className='link_go_to_itineraries'>Send</h5></Button>
            </form>
        </div>
    )
};

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentForm);
