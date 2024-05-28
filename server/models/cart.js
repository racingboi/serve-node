const mongoose = require('mongoose');



var cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
       
    },
  productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        
    },
    quantity: {
        type: Number,
       
    },
  totalPrice: {
        type: Number,
       
    }
}, {
    timestamps: true
});
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;