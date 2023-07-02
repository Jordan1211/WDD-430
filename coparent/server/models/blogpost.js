const mongoose = require('mongoose');

const blogpostSchema = mongoose.Schema({
   id: { type: String, required: true },
   title: { type: String },
   imageUrl: { type: String },
   description: { type: String},
   author: { type: String}
});

module.exports = mongoose.model('Blogpost', blogpostSchema);