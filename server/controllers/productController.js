const Product =require("../models/product");
const Category = require("../models/Category")
const { authenticateToken } = require("../middlewares/authenticateToken");

exports.createProduct = async (req, res) => {
  try {
    // Call the authenticateToken middleware before handling the request
    authenticateToken(req, res, async () => {
      const product = new Product(req.body);
      
      await product.save();

      const subcategoryName = req.body.category.subcategory_name;
      const categoryName = req.body.category.category_name;
      
      // Check if the category name is "Others" and if it has a subcategory
      if (categoryName === 'Others' && !subcategoryName) {
        // Save the product under the "Others" category
        const category = await Category.findOne({ category_name: 'Others' });
        if (category) {
          // Increment the count of the subcategory if it's not empty or undefined
          category.count += 1;
          await category.save();
        } else {
          console.error('Category not found');
          // Handle the case where the category is not found
        }
      } else {
        // Update subcategory count only if the category name is not "Others"
        const category = await Category.findOne({ category_name: categoryName });
        if (category) {
          // Increment the count of the subcategory if it's not empty or undefined
          if (subcategoryName) {
            category.subCategories.set(subcategoryName, (category.subCategories.get(subcategoryName) || 0) + 1);
          }
           category.count += 1;
          await category.save();
        } else {
          console.error('Category not found');
          // Handle the case where the category is not found
        }
      }

      res.status(201).json(product);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

  exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };

  // Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // Update a product by ID
  exports.updateProductById = async (req, res) => {
    try {
      // Call the authenticateToken middleware before handling the request
      authenticateToken(req, res, async () => {
        const product = await Product.findByIdAndUpdate(req.params.productId, req.body, {
          new: true,
          runValidators: true
        });
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  
  // Delete a product by ID
  exports.deleteProductById = async (req, res) => {
    try {
      // Call the authenticateToken middleware before handling the request
      authenticateToken(req, res, async () => {
        const product = await Product.findByIdAndDelete(req.params.productId);
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
  
        const { category_name, subcategory_name } = product.category;
  
        if (category_name === 'Others') {
          // Decrease the count of the "Others" category
          await Category.findOneAndUpdate(
              { category_name: 'Others' },
              { $inc: { count: -1 } }
          );
      } else {
          // Decrease the count of the subcategory in the category schema
          await Category.findOneAndUpdate(
              { category_name },
              { $inc: { [`subCategories.${subcategory_name}`]: -1 } },
              { $inc: { count: -1 } }
          );
      }
        res.json({ message: 'Product deleted successfully' });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };

exports.getFeaturedProducts= async (req, res) => {
    try {
        // Fetch featured products from the database where isItFeatured is true
        const featuredProducts = await Product.find({ isItFeatured: true });

        // Send the response with the fetched featured products
        res.json(featuredProducts);
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error fetching featured products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  };
  