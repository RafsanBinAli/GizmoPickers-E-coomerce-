import React, { useState, useEffect } from 'react';
import "./category.css";
import LeftPart from '../Dashboard/LeftPart';

const Category = () => {
    const authToken = localStorage.getItem('authToken');
    const [imageFile, setImageFile] = useState(null);
    const [newCategory, setNewCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [isMount, setIsMount] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [newSubCategories, setNewSubCategories] = useState([]);

    useEffect(() => {
        setNewSubCategories(categories.map(() => ''));
    }, [categories]);

    useEffect(() => {
        const initialSubCategories = categories.map(() => '');
        setNewSubCategories(initialSubCategories);
    }, [categories]);

    useEffect(() => {
        // Fetch categories from the backend API
        fetch('http://localhost:4000/admin/show-categories')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                return response.json();
            })
            .then(data => {
                setCategories(data); // Update categories state with fetched data
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                // Handle error: Show a message to the user or retry fetching categories
            });
    }, [newCategory, isMount, isDelete]);


    const handleSubCategoryChange = (index, value) => {
        const updatedSubCategories = [...newSubCategories];
        updatedSubCategories[index] = value;

        setNewSubCategories(updatedSubCategories);
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };


    const handleAddCategory = () => {
        // Create a FormData object to send the image file
        const formData = new FormData();
        formData.append('image', imageFile);
        // Send a POST request to upload the image
        fetch('https://api.imgbb.com/1/upload?key=c9af6d674adfdc89791fbbddc0ca6ff6', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Image uploaded successfully, set the obtained image URL
                    const imageUrl = data.data.display_url;
                    // Create the request body for adding the category
                    const requestBody = {
                        category_name: newCategory,
                        imageUrl: imageUrl, // Use the obtained image URL
                        subCategories: new Map() // Initialize with an empty map or handle subCategories as needed
                    };

                    // Send a POST request to save the category data
                    fetch('http://localhost:4000/admin/add-categories', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${authToken}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestBody)
                    })
                        .then(response => {
                            if (response.ok) {
                                setNewCategory('');
                                alert('Category added successfully!');
                            } else {

                                alert('Failed to add category!');
                            }
                        })
                        .catch(error => {
                            console.error('Error adding category:', error);
                            alert('Failed to add category!');
                        });
                } else {
                    console.error('Error uploading image:', data.error);
                    alert('Failed to upload image!');
                }
            })
            .catch(error => {
                console.error('Error uploading image:', error);
                alert('Failed to upload image!');
            });
    };



    const handleAddSubCategory = (categoryId, subCategoryName, index) => {
        setIsMount(false)
        const requestBody = {
            subCategory_name: subCategoryName,
            count: 0 // Assuming the count is initially set to 0
        };


        fetch(`http://localhost:4000/admin/categories/${categoryId}/subcategories`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.message === 'subCategory added successfully') {
                    setIsMount(true);
                    const updatedSubCategories = [...newSubCategories];
                    updatedSubCategories[index] = '';

                    alert('Sub-category added successfully!');

                } else {
                    alert('Failed to add sub-category!');
                }
            })
            .catch(error => {
                console.error('Error adding sub-category:', error);
                alert('Failed to add sub-category!');
            });
    };

    const handleDeleteSubCategory = (categoryId, subCategoryName) => {
        setIsDelete(false)

        fetch(`http://localhost:4000/admin/categories/${categoryId}/subcategories/${subCategoryName}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,

            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Sub-category deleted successfully') {
                    // Update the UI or fetch categories again to reflect the changes
                    // fetchCategories();
                    setIsDelete(true)
                    alert('Sub-category deleted successfully!');

                } else {
                    alert('Failed to delete sub-category!');
                }
            })
            .catch(error => {
                console.error('Error deleting sub-category:', error);
                alert('Failed to delete sub-category!');
            });
    };
    const handleDeleteCategory = (categoryId) => {
        // Check if there are no sub-categories for the category
        const category = categories.find(cat => cat._id === categoryId);
        if (Object.keys(category.subCategories).length !== 0) {
            alert("Cannot delete category with sub-categories");
            return; // Exit the function early
        }

        // If there are no sub-categories, proceed with category deletion
        fetch(`http://localhost:4000/admin/categories/${categoryId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,

            },
        })
            .then(response => {
                if (response.ok) {
                    // If category is deleted successfully, update categories state
                    setCategories(prevCategories => prevCategories.filter(cat => cat._id !== categoryId));
                    alert('Category deleted successfully!');
                } else {
                    alert('Failed to delete category!');
                }
            })
            .catch(error => {
                console.error('Error deleting category:', error);
                alert('Failed to delete category!');
            });
    };


    return (
        <>
            <LeftPart />
            <div className="category-management">
                <h2>Add Category</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleAddCategory();
                }}>
                    <div className="form-wrapper">
                        <div className="input-wrapper">
                            <label htmlFor="categoryInput">New Category:</label>
                            <input
                                type="text"
                                id="categoryInput"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                placeholder="Enter category name"
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="imageInput">Select Image:</label>
                            <input
                                type="file"
                                id="imageInput"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </div>
                        <div className="button-wrapper">
                            <button className="add-category">Add Category</button>
                        </div>
                    </div>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '20%' }}>Image</th>
                            <th style={{ width: '25%' }}>Category</th>
                            <th>Sub-categories</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={index}>
                                <td style={{ width: '20%' }}>
                                    <img src={category.imageUrl} alt={category.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                </td>
                                <td style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '18px' }}>{category.category_name} ({category.count})</td>
                                <td className='ted'>
                                    <ul>
                                        {Object.entries(category.subCategories).map(([subCategory, count], subIndex) => (
                                            <li key={subIndex} style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '18px' }}>
                                                {subCategory} ({count})
                                                {count === 0 && (
                                                    <button
                                                        className="delete-sub-category"
                                                        onClick={() => handleDeleteSubCategory(category._id, subCategory)}
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                    {category.category_name.toLowerCase() !== 'others' && (
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            // Add sub-category logic
                                        }}>
                                            {newSubCategories[index] !== undefined && (
                                                <input
                                                    type="text"
                                                    placeholder="New Sub-category"
                                                    style={{ width: '200px' }}
                                                    value={newSubCategories[index]}
                                                    onChange={(e) => handleSubCategoryChange(index, e.target.value)}
                                                />
                                            )}
                                            <button
                                                type="submit"
                                                className="add-sub-category"
                                                onClick={() => handleAddSubCategory(category._id, newSubCategories[index], index)}
                                            >
                                                Add Sub-category
                                            </button>
                                        </form>
                                    )}
                                </td>
                                <td> {/* Action column */}
                                    <button
                                        className="delete-category"
                                        onClick={() => handleDeleteCategory(category._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
export default Category;