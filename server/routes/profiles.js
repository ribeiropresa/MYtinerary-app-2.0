const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    check,
    validationResult
} = require('express-validator');

let Profile = require('../models/Profile');
let User = require('../models/User');

// @route    Profile /profiles
// @desc     Create a profile
// @access   Private 
router.post('/', [auth, [
    check('location', 'Location is required!').not().isEmpty()
]],
async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const {
        location,
        bio,
        youtube,
        facebook,
        twitter,
        instagram
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (twitter) profileFields.social.twitter = twitter;
    
    try {
        let profile = await Profile.findOne({
            user: req.user.id
        });
        if(profile) {
            profile = await Profile.findOneAndUpdate({
                user: req.user.id
            }, {
                $set: profileFields
            }, {
                new: true
            })
        }

        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    } catch (err) {
        
        console.error(err.message);
        res.status(500).send('Server Error // User Profile')

    }

});

// @route    GET /profiles/me
// @desc     Get current user profile
// @access   Private
router.get('/me', auth, async(req,res) => {

    try {
        
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ['name']);

        if(!profile) {
            return res.status(400).json({
                msg: 'There is no profile or this user'
            });
        }

        res.json(profile);

    } catch (err) {
        
        console.error(err.message);
        res.status(500).send('Server Error // Get current Profile')

    }
});

// @route    GET /profiles
// @desc     Get all profiles
// @access   Public
router.get('/', async(req, res) => {

    try {

        const profiles = await Profile.find().populate('user', ['name']);
        res.json(profiles);
    
    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error // Get Profiles');

    }
})

// @route    GET /profiles/user/:user_id
// @desc     Get user profile by ID
// @access   Public
router.get('/user/:user_id', async(req,res) => {

    try {

        const profile = await Profile.findOne({
            user: req.params.user_id
        }).populate('user', ['name']);

        if(!profile) return res.status(400).json({
            msg: 'Profile not found!'
        });

        res.json(profile);

    } catch (err) {
        
        console.error(err.message);

        if(err.kind !== 'ObjectId') {
            return res.status(400).json({
                msg: 'Profile nor found!'
            })
        }

        res.status(500).send('Server Error // Profile user_id');

    }
})

// @route    DELETE /profiles
// @desc     Delete profile, user
// @access   Private
router.delete('/', auth, async(req,res) => {

    try {
        
        await Profile.findOneAndRemove({
            user: req.user.id
        });

        await User.findByIdAndRemove({
            _id: req.user.id
        });

        res.json({
            msg: 'User removed!'
        })

    } catch (err) {
        
        console.error(err.message);
        res.status(500).send('Server Error // Delete Profile')

    }
});

module.exports = router;