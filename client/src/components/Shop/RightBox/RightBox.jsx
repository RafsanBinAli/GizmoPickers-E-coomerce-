import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const RightBox = ({ searchName }) => {
  const [products, setProducts] = useState([]);
  const { categoryName, subcategory } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState('default'); 

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    const selectElement = document.getElementById('basic');
    selectElement.classList.toggle('show');
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [categoryName, subcategory, products, searchName , sortBy]);


  const filterProducts = () => {
    let filtered = products;
    if (searchName) {
      // Filter by searchName if it exists
      filtered = filtered.filter(product =>
        product.product_name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    if (categoryName && subcategory) {
      // Filter by categoryName and subcategory if they exist
      filtered = filtered.filter(product =>
        product.category.category_name === categoryName && product.category.subcategory_name === subcategory
      );
    } else if (categoryName && !subcategory) {
      // Filter by categoryName if it exists
      filtered = filtered.filter(product =>
        product.category.category_name === categoryName
      );
    }
    setFilteredProducts(filtered);
    sortProducts(filtered);
  };
  const sortProducts = (products) => {
    switch (sortBy) {
      case 'priceHighToLow':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'priceLowToHigh':
        products.sort((a, b) => a.price - b.price);
        break;
      default:
        // Default sorting (no sorting)
        break;
    }
    setFilteredProducts([...products]);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value); // Update sortBy state when select value changes
  };


  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:4000/show-all-product');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      console.log("data Products", data);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 shop-content-right">
      <div className="right-product-box">

        {/* New component */}
        <div className="product-item-filter row">
          <div className="col-12 col-sm-8 text-center text-sm-left">
            <div className="toolbar-sorter-right">
              <span onClick={toggleDropdown}>Sort by </span>
              <select
                className='selecting'
                id="basic"
                style={{ display: isOpen ? 'block' : 'none', height: '40px' }}
                data-placeholder="$ USD"
                value={sortBy} // Set selected value
                onChange={handleSortChange} // Handle change event
              >
                <option data-display="Select">Choose</option>
               <option value="priceHighToLow">Price - High to Low</option>
                <option value="priceLowToHigh">Price - Low to High</option>

              </select>
            </div>
            <p>Showing all {filteredProducts.length} results</p>
          </div>
          <div className="col-12 col-sm-4 text-center text-sm-right">
            <ul className="nav nav-tabs ml-auto">
              <li>
                <a className="nav-link active" href="#grid-view" data-toggle="tab"> <i className="fa fa-th"></i> </a>
              </li>

            </ul>
          </div>
        </div>
        {/* End component */}
        <div className="row product-categorie-box">
          <div className="tab-content">
            <div role="tabpanel" className="tab-pane fade show active" id="grid-view">
              <div className="row">
                {filteredProducts.map((product, index) => (
                  <div key={index} className="col-sm-6 col-md-6 col-lg-4 col-xl-4">
                    <Link to={`/product-details/${product._id}`} className="products-single-link">
                      <div className="products-single fix">
                        <div className="box-img-hover">
                          <div className="type-lb">
                            {product.sale && <p className="sale">Sale</p>}
                          </div>
                          <img src={product.imageUrls} className="img-fluid" alt="Product" />
                        </div>
                        <div className="why-text">
                          <h4>{product.product_name}</h4>
                          <h5>{product.price} BDT</h5>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RightBox;
