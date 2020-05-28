const express = require('express');
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator')
const auth = require('../middleware/auth');

const User = require('../models/User');
const City = require('../models/Cities');

// @POST           /cities
// @description    Add one city
// @access         Private 
router.put('/', [auth, [
    check('city', 'City is required.').not().isEmpty(),
    check('country', 'Country is required.').not().isEmpty(),
    check('image', 'Image is required.').not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        })
    }

    const {
        city,
        country
    } = req.body;

    try {
        const user = await User.findById(req.user.id);
        let city = await City.findOne({ city: req.body.city, country: req.body.country })
        if(city) {
            if(city.city === req.body.city && city.country === req.body.country) {
                errors.city = 'City already exists.'
            }
            return res.status(400).json({ errors: 'Add a different city.' })
        }
        
        const newCity = new City ({
            user: req.user.id,
            name: user.name,
            city: req.body.city,
            country: req.body.country,
            image: req.body.image
        })

        await newCity.save();
        res.json(newCity);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error // Add City')

    } 
})

// @GET            /cities
// @description    Get all cities
// @access         Private 
router.get('/', auth, async(req, res) => {
    try {
        const cities = await City.find({});
        res.json(cities);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error // Get Cities')

    }
})

// @GET            /cities/:city
// @description    Get One City
// @access         Private 
router.get('/:city', auth, async(req, res) =>{
    const cityRequested = req.params.city

    try {
        await City.findOne({ city: cityRequested })
        res.json(cityRequested);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error // Get One City')

    }
})

module.exports = router;