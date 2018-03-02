var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  id:{
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  sellerName: {
    type: String,
    required: true,
    trim: true
  },
  stock: {
    type: Number,
    default: 1
  }
});

mongoose.model('Product', productSchema);
