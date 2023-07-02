const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
   maxBlogId: { type: Number }
});

module.exports = mongoose.model('Sequence', sequenceSchema);