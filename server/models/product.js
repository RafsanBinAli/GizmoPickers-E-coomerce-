const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    // required: true
  },
  description: {
    type: String,
    // required: true
  },
  price: {
    type: Number,
    // required: true
  },
  category: {
    type: {
      category_name: String,
      subcategory_name: String  // Add subcategory field
    },
    ref: 'Category',
    // required: true
  },
  
  imageUrls: {
    type: String
  },

  isItFeatured: {
    type: Boolean,
    default: false 
}
  // Add more fields as needed
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
