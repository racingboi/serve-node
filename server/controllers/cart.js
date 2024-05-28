const asyncHandler = require('express-async-handler');
const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');
const createCart = asyncHandler(async (req, res) => {
  const { userId, productId, quantity, totalPrice } = req.body;

  // Find an existing cart item with the same userId and productId
  const existingCart = await Cart.findOne({
    where: {
      userId: userId,
      productId: productId
    }
  });

  let opere = {};
  opere.s = 0;
  if (existingCart) {
    // If the product exists, update the quantity
    existingCart.quantity += quantity;
    await existingCart.save();
    return res.status(200).json({ 
      success: true,
      data: existingCart
     });
  } else {
    // If the product does not exist, create a new entry
    const cart = await Cart.create({
      userId,
      productId,
      quantity,
      totalPrice
    });
    return res.status(201).json({
      success: !!cart,
      data: cart ? cart : 'Cannot create cart'
     });
  }
});

const handleCart = async (userId, productId, quantity) => {
  const existingCart = await Cart.findOne({
        where: {
          userId: userId,
          productId: productId

        }
      }
  )

};


// const getCarts = asyncHandler(async (req, res) => {
//   const carts = await Cart.find({ userId: req.user._id });
//   const data = [];
//   for (let i = 0; i < carts.length; i++) {
//     const user= await User.findById(carts[i].userId);
//     const product = await Product.findById(carts[i].productId);
//     if (!user || !product) {
//       res.status(404);
//       throw new Error('User or Product not found');
//     }
//     data.push({
//       id: carts[i]._id,
//       user: user,
//       product: product,
//       quantity: carts[i].quantity,
//       totalPrice: carts[i].totalPrice
//     });
//   }
//   res.json({ data: data });
// }
// );

const getCarts = asyncHandler(async (req, res) => {
  const carts = await Cart.find({ userId: req.user._id });
  if (!carts.length) {
    return res.status(404).json({
      success: false,
      message: 'Cart not found'
    });
  }

  // Aggregate quantities by productId
  const cartAggregation = carts.reduce((acc, cart) => {
    if (acc[cart.productId]) {
      acc[cart.productId].quantity += cart.quantity;
    } else {
      acc[cart.productId] = { ...cart.toObject(), quantity: cart.quantity };
    }
    return acc;
  }, {});

  // Convert aggregation object back to array
  const aggregatedCarts = Object.values(cartAggregation);

  // Extract unique product IDs
  const productIds = aggregatedCarts.map(cart => cart.productId);

  // Fetch all products in bulk
  const products = await Product.find({ '_id': { $in: productIds } });
  const productMap = products.reduce((map, product) => map.set(product._id.toString(), product), new Map());

  // Build the final data array
  const data = aggregatedCarts.map(cart => {
    const product = productMap.get(cart.productId.toString());
    if (!product) {
      console.error(`Product not found for productId: ${cart.productId}`);
      return null;
    }
    return {
      id: cart._id,
      product: product,
      quantity: cart.quantity,
      totalPrice: cart.totalPrice // Adjust if totalPrice needs to be recalculated
    };
  }).filter(item => item !== null);

  return res.status(200).json({ 
    success: true,
    data: data
   });
});

const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.cid);
  const user = await User.findById(cart.userId);
  console.log(user);
  const product = await Product.findById(cart.productId);
  if (!user || !product) {
    return res.status(404).json({
      success: false,
      message: 'User or Product not found'
    });
  }
  if (!cart) {
    return res.status(404).json({
      success: false,
      message: 'Cart not found'
    });
  }
  const data = {
    id: cart._id,
    user: user,
    product: product,
    quantity: cart.quantity,
    totalPrice: cart.totalPrice
  };
  return res.status(200).json({
    success: true,
    data: data
  });
}
);
const updateCart = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const cart = await Cart.findById(cid);
  if (!cart) {
    res.status(404).send({ message: 'Cart not found' });
    return;
  }
  const { quantity } = req.body;
  cart.quantity = quantity;

  // Save the updated cart
  await cart.save();

  res.send(cart);
});


const deleteCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.cid);
  if (!cart) {
    return res.status(404).json({ 
      success: false,
      message: 'Cart not found'
     });
  }
  await cart.remove();
  return res.status(200).json({
    success: true,
    data: cart ? cart : 'Cannot delete category'
  } );
});

module.exports = { createCart, getCarts, getCart, updateCart, deleteCart };