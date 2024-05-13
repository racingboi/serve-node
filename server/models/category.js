const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);