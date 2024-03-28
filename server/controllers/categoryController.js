const Category = require('../models/Category');
const {authenticateToken} =require("../middlewares/authenticateToken")
// Controller function to create a new category
const createCategory = async (req, res) => {
    try {
        // Call the authenticateToken middleware before handling the request
        authenticateToken(req, res, async () => {
            const { category_name, imageUrl } = req.body;
            const category = new Category({
                category_name,
                imageUrl,
                subCategories: new Map()
            });
            await category.save();
            res.status(201).json({ message: 'Category created successfully', category });
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create category', error: error.message });
    }
};

// Controller function to add a subCategory to a category

const addSubCategory = async (req, res) => {
    try {
        // Call the authenticateToken middleware before handling the request
        authenticateToken(req, res, async () => {
            console.log(req.body)
            const { category_id } = req.params;
            const { subCategory_name, count } = req.body;
            console.log("category"+category_id+"subcategory= "+subCategory_name,count);
            
            const category = await Category.findById(category_id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            const subCategoryCount = count !== undefined ? count : 0;
            category.subCategories.set(subCategory_name, count);
            await category.save();
            res.status(200).json({ message: 'subCategory added successfully', category });
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add subCategory', error: error.message });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve categories', error: error.message });
    }
};
const deleteSubCategory = async (req, res) => {
    try {
        // Call the authenticateToken middleware before handling the request
        authenticateToken(req, res, async () => {
            const { categoryId, subCategoryName } = req.params;

            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            if (!category.subCategories.has(subCategoryName)) {
                return res.status(404).json({ message: 'Sub-category not found' });
            }

            // Check if the count of the sub-category is 0
            if (category.subCategories.get(subCategoryName) !== 0) {
                return res.status(400).json({ message: 'Sub-category count is not 0, cannot be deleted' });
            }

            category.subCategories.delete(subCategoryName);

            await category.save();

            // Respond with success message
            res.status(200).json({ message: 'Sub-category deleted successfully' });
        });
    } catch (error) {
        // Handle errors
        console.error('Error deleting sub-category:', error);
        res.status(500).json({ message: 'Failed to delete sub-category', error: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        // Call the authenticateToken middleware before handling the request
        authenticateToken(req, res, async () => {
            const { categoryId } = req.params;

            // Find the category by ID and delete it
            const deletedCategory = await Category.findByIdAndDelete(categoryId);

            if (!deletedCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.status(200).json({ message: 'Category deleted successfully' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete category', error: error.message });
    }
};
module.exports = { createCategory, addSubCategory,getAllCategories,deleteSubCategory ,deleteCategory};
