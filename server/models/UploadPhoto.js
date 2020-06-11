const mongoose = require('mongoose');

const UploadPhotoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String
    },
    image: {
        type: String
    }
});

module.exports = UploadPhoto = mongoose.model('uploadPhoto', UploadPhotoSchema);