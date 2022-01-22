const mongoose = require('mongoose')

const friendSchema = mongoose.Schema({
    phone: Array,
    messages: Array,
});
const friendRoom = mongoose.model('friendRoom', friendSchema);
module.exports = friendRoom