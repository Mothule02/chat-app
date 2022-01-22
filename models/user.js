const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    phone: Number,
    password: String,
    username: String,
    friendId: Array, 
    friends: Array,
    messages: Array,
    filenames: Array,
    fileId: Array,
    
})

const userData = mongoose.model('userData', userSchema)
module.exports = userData
