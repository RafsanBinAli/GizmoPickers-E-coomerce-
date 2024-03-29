import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeftPart from '../Dashboard/LeftPart';
import "./upload.css"

const Upload = () => {
  const authToken = localStorage.getItem('authToken');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    imageName: "",
    category: {
      category_name: "", // Initialize category name
      subcategory_name: "" // Initialize subcategory name
    },
    price: "",
    description: ""
  });

  useEffect(() => {
    // Fetch categories from the backend API
    fetch('http://localhost:4000/admin/show-categories')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setCategories(data); // Update categories state with fetched data
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        // Handle error: Show a message to the user or retry fetching categories
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      category: {
        category_name: value, // Update category_name with the selected category value
        subcategory_name: "" // Reset subcategory_name to an empty string
      }
    }));
  };

  const handleSubcategoryChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      category: {
        ...prevState.category,
        subcategory_name: value // Update the subcategory name
      }
    }));
    console.log("formData", formData)
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  


  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('image', image);
  
    Object.keys(formData).forEach(key => {
      formDataObj.append(key, formData[key]);
    });
  
    axios.post('https://api.imgbb.com/1/upload?key=c9af6d674adfdc89791fbbddc0ca6ff6', formDataObj)
      .then(response => {
        const data = response.data;
        if (data.success) {
          console.log('Image uploaded:', data.data.display_url);
  
          axios.post('http://localhost:4000/admin/create-product', {
            product_name: formData.imageName,
            imageUrls: data.data.display_url,
            category: {
              category_name: formData.category.category_name,
              subcategory_name: formData.category.subcategory_name
            },
            price: formData.price,
            description: formData.description
          }, {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json'
            }
          })
            .then(savedData => {
              
              setFormData({
                imageName: "",
                category: { category_name: "", subcategory_name: "" },
                price: "",
                description: ""
              });
              setImage(null);
              alert("Data saved in Database");
            })
            .catch(error => {
              console.error('Error saving data in database:', error);
              alert(error.response.data.error || 'Error saving data in database');
            });
        } else {
          console.error('Error uploading image:', data);
          alert(data.error || 'Error uploading image');
        }
      })
      .catch(error => {
        console.error('Error uploading image:', error);
        alert('Error uploading image');
      });
  };

  return (
    <>
      <LeftPart />
      <div className="upload-form">
        <h2>Create a Product</h2>
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="imageName">Product Name:</label>
            <input type="text" id="imageName" name="imageName" value={formData.imageName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="category" className="label">Category:</label>
            <select id="category" name="category" value={formData.category.category_name} onChange={handleCategoryChange} required className="select">
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category._id} value={category.category_name}>{category.category_name}</option>
              ))}
            </select>
          </div>
          {formData.category.category_name !== 'Others' && (
              <div className="form-group">
                <label htmlFor="subcategory" className="label">Subcategory:</label>
                <select id="subcategory" name="subcategory" value={formData.category.subcategory_name} onChange={handleSubcategoryChange} required className="select">
                  <option value="">Select a subcategory</option>
                  {categories.find(category => category.category_name === formData.category.category_name)?.subCategories &&
                    Object.entries(categories.find(category => category.category_name === formData.category.category_name)?.subCategories).map(([subcategory, count]) => (
                      <option key={subcategory} value={subcategory}>{subcategory}</option>
                    ))
                  }
                </select>
              </div>
            )}
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="image">Product


              Image:</label>
            <input type="file" id="image" onChange={handleImageChange} accept="image/*" required />
          </div>
          <button type="submit" className="primary-button">Upload</button>
        </form>
      </div>
    </>
  );
};

export default Upload;
