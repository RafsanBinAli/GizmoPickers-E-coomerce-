const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    subCategories: {
        type: Map,
        of: Number // Each value in the map represents the count of that subcategory
    },
    count: {
        type: Number,
        default: 0 // Default count is 0
    },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;