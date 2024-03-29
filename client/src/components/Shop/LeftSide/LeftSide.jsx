import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./leftSide.css";

const LeftSide = ({ onCategorySelect, selectSearchName }) => {

    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:4000/admin/show-categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);
    const handleCategory = (categoryId) => {
        setSelectedCategoryId(prevId => prevId === categoryId ? null : categoryId);

    };
    const handleSearchInputChange = (e) => {
        const searchName = e.target.value;
        selectSearchName(searchName);
        console.log(searchName)
    };

    const handleSubCategorySelect = (categoryName, subcategoryName) => {
        onCategorySelect(categoryName, subcategoryName);
        console.log(categoryName, subcategoryName)
    };

    return (
        <>
            <div className="col-xl-3 col-lg-3 col-sm-12 col-xs-12 sidebar-shop-left">
                <div className="product-categori">
                    <div className="search-product">
                        <form action="#">
                            <input className="form-control" placeholder="Search here..." type="text" onChange={handleSearchInputChange} />
                            <button type="submit"> <i className="fa fa-search"></i> </button>
                        </form>
                    </div>
                    <div className="filter-sidebar-left">
                        <div className="title-left">
                            <h3>Categories</h3>
                        </div>
                        <div className="list-group list-group-collapse list-group-sm list-group-tree"  >
                            <Link
                                to="/shop"
                                className={`list-group-item list-group-item-action`}
                                aria-expanded="true"
                            >
                                All
                            </Link>
                            {[...categories.filter(category => category.category_name !== 'Others'), ...categories.filter(category => category.category_name === 'Others')].map((category, index) => (


                                <div key={index} className="list-group-collapse ">
                                    {Object.values(category.subCategories).reduce((acc, count) => acc + count, 0) > 0 || category.category_name=='Others' ? (
                                        <>
                                            <Link
                                                to={`/shop/${category.category_name}`}
                                                className={`list-group-item list-group-item-action ${selectedCategoryId === category._id ? 'active' : ''}`}
                                                onClick={() => handleCategory(category._id)}
                                                aria-expanded="true"
                                            >
                                                {category.category_name} <small className="text-muted"> ({category.count})</small>
                                            </Link>
                                            <div className={`collapse ${selectedCategoryId === category._id ? 'show' : ''}`} >
                                                <div className="list-group">
                                                    {Object.keys(category.subCategories).map((subcategoryName, subIndex) => (
                                                        <Link
                                                            key={subIndex}
                                                            to={`/shop/${category.category_name}/${subcategoryName}`}
                                                            className="list-group-item list-group-item-action"
                                                            onClick={() => handleSubCategorySelect(category.category_name, subcategoryName)}
                                                        >
                                                            {subcategoryName} <small className="text-muted">({category.subCategories[subcategoryName]})</small>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="filter-price-left">
                        <div className="title-left">
                            
                        </div>
                        <div className="price-box-slider">
                            <div id="slider-range"></div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default LeftSide;