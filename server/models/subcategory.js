const mongoose = require('mongoose');
var subCategorySchema = new mongoose.Schema({
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
    parentId: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
    },
},
{
    timestamps: true
  });
module.exports = mongoose.model('SubCategory', subCategorySchema);