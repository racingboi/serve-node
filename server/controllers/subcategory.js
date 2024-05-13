const asyncHandler = require('express-async-handler')
const Subcategory = require('../models/subcategory')
const slugify = require('slugify')
const createSubcategory = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
    if (req.body && req.body.name) req.body.slug = slugify(req.body.name);
    const newSubcategory = await Subcategory.create(req.body);
    return res.status(200).json({
        success: newSubcategory ? true : false,
        createdSubcategory: newSubcategory ? newSubcategory : 'Cannot create new subcategory'
    });
});
const getSubcategories = asyncHandler(async (req, res) => {
    const subcategories = await Subcategory.find({});
    return res.status(200).json({
        success: subcategories ? true : false,
        subcategories: subcategories ? subcategories : 'Cannot get subcategories'
    });
});
const updateSubcategory = asyncHandler(async (req, res) => {
  const updatedSubcategory = await Subcategory.findByIdAndUpdate(req.params.sid, req.body, {
    new: true,
    runValidators: true
  });
  return res.status(200).json({
    success: updatedSubcategory ? true : false,
    updatedSubcategory: updatedSubcategory ? updatedSubcategory : 'Cannot update subcategory'
  });
}
);
const deleteSubcategory = asyncHandler(async (req, res) => {
  const deletedSubcategory = await Subcategory.findByIdAndDelete(req.params.sid);
  return res.status(200).json({
    success: deletedSubcategory ? true : false,
    deletedSubcategory: deletedSubcategory ? deletedSubcategory : 'Cannot delete subcategory'
  });
}
);
const getSubcategory = asyncHandler(async (req, res) => {
  const subcategory = await Subcategory.findById(req.params.sid);
  return res.status(200).json({
    success: subcategory ? true : false,
    subcategory: subcategory ? subcategory : 'Cannot get subcategory'
  });
}
);
module.exports = {
    createSubcategory,
    getSubcategories,
    updateSubcategory,
    deleteSubcategory,
    getSubcategory
}