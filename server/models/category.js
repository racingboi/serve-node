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
    },
    children: {
        type: [
            {
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
            }
        ],
        default: []
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Category', categorySchema);