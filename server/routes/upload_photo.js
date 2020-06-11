const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');

const UploadPhoto = require('../models/UploadPhoto');
const User = require('../models/User');

const DIR = './public/';
 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, '-' + fileName);
    }
});
 
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
        cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


// @route    Upload photo /upload_photo
// @desc     Put photo
// @access   Private
router.put('/', auth, upload.single('image'), async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const url =  req.protocol + '://' + req.get('host');

        const newUploadPhoto = new UploadPhoto({
            user: req.user.id,
            name: user.name,
            image: url + '/public/' + req.file.filename 
        })

        const photo = await newUploadPhoto.save();
        res.json(photo);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error // UploadPhoto Message')
    }
})

// @route    Get photo /upload_photo
// @desc     Get photo
// @access   Private
router.get('/:user_id', auth, async(req, res) => {
    try {
        const userPhoto = await UploadPhoto.findOne({
            user: req.params.user_id
        }).populate('uploadPhoto', ['name', 'image']);
        if(!userPhoto) {
            return res.status(400).json({
                msg: 'Image not found!'
            })
        }
        return res.json(userPhoto)

    } catch (err) {
        console.error(err.message);
        if(err.kind !== 'ObjectId') {
            return res.status(404).json({
                msg: 'Image not found!'
            })
        }
        res.status(500).send('Server Error // Get Image')

    }
})

// @route    delete photo /upload_photo/:id
// @desc     Delete photo
// @access   Private
router.delete('/', auth, async(req, res) => {
    try {
        const userPhoto = await UploadPhoto.findOneAndRemove({
            user: req.user.id
        });
        if(!userPhoto) {
            return res.status(404).json({
                msg: 'Image not found!'
            })
        }
    
        await userPhoto.remove();
        return res.json({
            msg: 'Photo removed!'
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error // Delete Photo')
    }
})
 
module.exports = router;