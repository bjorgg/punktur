const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true,
        maxLength: [20, 'Username can not be more than 20 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    terms: {
        type: Boolean,
        required: [true, 'You must accept our terms of use to create an account']
    }
})

module.exports = mongoose.models.User || MongoServerSelectionError.model('User', UserSchema);