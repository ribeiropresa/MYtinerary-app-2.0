const express = require('express');
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User');
const Itinerary = require('../models/Itinerary');

// @route Post     /itineraries
// @description    Get Itineraries
// @access         Private
router.put('/', [auth, [
    check('title', 'Title is required.').not().isEmpty(),
    check('duration', 'Duration is required.').not().isEmpty(),
    check('price', 'Price is required.').not().isEmpty(),
    check('hashtags', 'Hashtags is required.').not().isEmpty(),
    check('image', 'Image is required.').not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        const user = await User.findById(req.user.id);
        const newItinerary = new Itinerary({
            user: req.user.id,
            name: user.name,
            city: req.body.city,
            title: req.body.title,
            duration: req.body.duration,
            price: req.body.price,
            description: req.body.description,
            hashtags: req.body.hashtags,
            image: req.body.image
        })
        const itinerary = await newItinerary.save();
        res.json(itinerary);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error // Post Itinerary')
    }
});

// @route Get      /itineraries/:city
// @description    Get Itineraries
// @access         Private
router.get('/:city', auth, async(req, res) => {
    try {
        const itineraryRequested = await Itinerary
            .find({ city: req.params.city })
            .sort({ date: -1 })
        if(!itineraryRequested) {
            return res.status(404).json({
                msg: 'This city does not have any itinerary.'
            })
        }
        return res.json(itineraryRequested);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error // Get Itineraries')
    }
})

// @route Get      /itineraries/:id
// @description    Get One Itinerary
// @access         Private
router.get('/itinerary/:id', auth, async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id)
            .populate('itinerary', ['title', 'description', 'date']);
        if(!itinerary) {
            return res.status(400).json({
                msg: 'Itinerary not found!'
            })
        }
        return res.json(itinerary);
        
    } catch (err) {
        console.error(err.message);
        if (err.kind !== 'ObjectId') {
            return res.status(404).json({
                msg: 'Itinerary not found!'
            })
        }
        res.status(500).send('Server Error // Get Itinerary by ID')
    }
})

// @route   Post /itineraries/comment/:id
// @desc    Comment on an itinerary
// @access  Private 
router.post('/comment/:id', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const itinerary = await Itinerary.findById(req.params.id)
        const newComment = {
            text: req.body.text,
            name: user.name,
            user: req.user.id
        }
        itinerary.comments.unshift(newComment);
        await itinerary.save();
        res.json(itinerary.comments);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error // Send Comment')
    }
})

// @route   Delete /itineraries/comment/:id/:comment_id
// @desc    Delete a comment
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async(req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);
        const comment = itinerary.comments.find(comment => comment.id === req.params.comment_id);
        if(!comment) {
            return res.status(400).json({
                msg: 'Comment does not exist!'
            })
        }
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'User not authorized'
            });
        }
        const removeIndex = itinerary.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        itinerary.comments.splice(removeIndex, 1);
        await itinerary.save();
        res.json(itinerary.comments);
    
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error // Delete Itinerary')

    }
})

// @route   itineraries/like:/id
// @desc    Like a Itinerary
// @access  Private
router.put('/like/:id', auth, async(req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);
        if (itinerary.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({
                msg: 'Itinerary already liked!'
            });
        }
        itinerary.likes.unshift({
            user: req.user.id
        });
        await itinerary.save();
        res.json(itinerary.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error // Like Itinerary')
    }
})

// @route   Put itineraries/unlike:/id
// @desc    Unlike a Itinerary
// @access  Private
router.put('/unlike/:id', auth, async(req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);
        if(itinerary.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({
                msg: 'Itinerary has not been liked!'
            });
        }
        const removeIndex = itinerary.likes.map(like => like.user.toString()).indexOf(req.user.id);
        itinerary.likes.splice(removeIndex, 1);
        await itinerary.save();
        res.json(itinerary.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error // Unlike Itinerary')
    }
})

module.exports = router;