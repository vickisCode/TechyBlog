let mongoose = require('mongoose');

let postBlog = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    Images: {
        type: String, // store image URL or base64
        default: '',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subdescription: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserData',
        required: true
    }
}, {
    timestamps: true  // adds createdAt and updatedAt automatically data of user
})

module.exports = mongoose.model('Blogpost', postBlog);