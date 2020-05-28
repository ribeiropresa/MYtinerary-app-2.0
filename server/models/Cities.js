const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    city:{
        type: String,
        required: true,
    },   
    country: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = City = mongoose.model('city', CitySchema)