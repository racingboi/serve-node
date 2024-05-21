const asyncHandler = require('express-async-handler')
const Category = require('../models/category')
const slugify = require('slugify')
const createCategory = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
  if (req.body && req.body.name) req.body.slug = slugify(req.body.name);
  if(req.body && req.body.children) {
    req.body.children = req.body.children.map(child => {
      if (child.name) child.slug = slugify(child.name);
      return child;
    });
  }
  const category = await Category.create(req.body);

  return res.status(201).json({
    success: category ? true : false,
    data: category ? category : 'Cannot create category'
  });
}
);
const getCategories = asyncHandler(async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const categories = await Category.find({}).skip((page - 1)* limit).limit(limit).sort({createdAt: -1});

  return res.status(200).json({
    success: categories ? true : false,
    data: categories ? categories : 'Cannot get categories'
  });
});
const updateCategory = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
  if (req.body && req.body.name) req.body.slug = slugify(req.body.name);
  const updatedCategory = await Category.findByIdAndUpdate(req.params.cid, req.body, {
    new: true,
    runValidators: true
  });
  return res.status(200).json({
    success: updatedCategory ? true : false,
    data: updatedCategory ? updatedCategory : 'Cannot update category'
  });
}
);

const deleteCategory = asyncHandler(async (req, res) => {
  const deletedCategory = await Category.findByIdAndDelete(req.params.cid);
  return res.status(200).json({
    success: deletedCategory ? true : false,
    data: deletedCategory ? deletedCategory : 'Cannot delete category'
  });
}
);
const getCategory = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const category = await Category.findById(cid);
  return res.status(200).json({
    success: category ? true : false,
    data: category ? category : 'Cannot get category'
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