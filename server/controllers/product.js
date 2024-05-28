const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

const createProduct = asyncHandler(async (req, res) => {
    
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
    if (req.body && req.body.name) req.body.slug = slugify(req.body.name);
    const newProduct = await Product.create(req.body);
    return res.status(200).json({
        success: !!newProduct,
        createdProduct: newProduct ? newProduct : 'Cannot create new product'
    });
});

const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const product = await Product.findById(pid)
    return res.status(200).json({
        success: !!product,
        productData: product ? product : 'Cannot get product'
    })
})
// Filtering, sorting & pagination
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()
    return res.status(200).json({
        success: products ? 'đúng' : 'sai',
        productDatas: products ? products : 'Cannot get products'
    })
})
console.log(1)
const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    if (req.body && req.body.name) req.body.slug = slugify(req.body.name)
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true })
    return res.status(200).json({
        success: !!updatedProduct,
        updatedProduct: updatedProduct ? updatedProduct : 'Cannot update product'
    })
})
const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const deletedProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: !!deletedProduct,
        deletedProduct: deletedProduct ? deletedProduct : 'Cannot delete product'
    })
})

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
}