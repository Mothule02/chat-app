const mongoose = require('mongoose')

const fileSchema = mongoose.Schema({
    filename: String,
    data: Buffer,
    mimeType: String,
})

const files = mongoose.model('files', fileSchema)
module.exports = files