const asyncHandler = require('express-async-handler')
const Category = require('../models/category')
const slugify = require('slugify')
const createCategory = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
    if (req.body && req.body.name) req.body.slug = slugify(req.body.name);
    const newCategory = await Category.create(req.body);
    return res.status(200).json({
        success: newCategory ? true : false,
        datacategory: newCategory ? newCategory : 'Cannot create new category'
    });
});
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    return res.status(200).json({
        success: categories ? true : false,
        datacategory: categories ? categories : 'Cannot get categories'
    });
});
const updateCategory = asyncHandler(async (req, res) => {
  const updatedCategory = await Category.findByIdAndUpdate(req.params.cid, req.body, {
    new: true,
    runValidators: true
  });
  return res.status(200).json({
    success: updatedCategory ? true : false,
    datacategory: updatedCategory ? updatedCategory : 'Cannot update category'
  });
}
);
const deleteCategory = asyncHandler(async (req, res) => {
  const deletedCategory = await Category.findByIdAndDelete(req.params.cid);
  return res.status(200).json({
    success: deletedCategory ? true : false,
    datacategory: deletedCategory ? deletedCategory : 'Cannot delete category'
  });
}
);
const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.cid);
  return res.status(200).json({
    success: category ? true : false,
    datacategory: category ? category : 'Cannot get category'
  });
}
);
module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    getCategory
}