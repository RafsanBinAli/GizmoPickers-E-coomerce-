import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./details.css"
const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);

    const addToCart = () => {
        // Get existing cart data from localStorage
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
        // Check if the product already exists in the cart
        const existingItemIndex = existingCart.findIndex(item => item.productId === productId);
    
        if (existingItemIndex !== -1) {
            // If the product already exists, update the quantity
            const updatedCart = [...existingCart];
            updatedCart[existingItemIndex].quantity += quantity;
            localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update cart in local storage
        } else {
            // If the product does not exist, add it to the cart
            const updatedCart = [...existingCart, { productId, product_name: product.product_name, imageUrls: product.imageUrls, quantity, price: product.price }];
            localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update cart in local storage
        }
        
        alert(`${product.product_name} is added to the Cart`);
    };


    useEffect(() => {
        // Fetch product details from the database using productId
        const fetchProduct = async () => {
            console.log(productId)
            try {
                const response = await fetch(`http://localhost:4000/product-details/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();

                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();


        return () => {
            // Cleanup logic
        };
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>; // Add loading indicator while fetching data
    }
    return (
        <>
            <div className="shop-detail-box-main">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-5 col-lg-5 col-md-6">
                            <div id="carousel-example-1" className="single-product-slider carousel slide" data-ride="carousel">
                                <div className="carousel-inner" role="listbox">
                                    <div className="carousel-item active"> <img className="d-block w-100" src={product.imageUrls} alt="First slide" /> </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-7 col-md-6">
                            <div className="single-product-details">
                                <h2>{product.product_name}</h2>
                                <h5> <del>2000 BDT</del> {product.price} BDT</h5>
                                <p className="available-stock"><span> More than 20 available / <a href="#">8 sold </a></span>
                                </p>
                                <h4>Short Description:</h4>
                                <p>{product.description} </p>
                                <ul>

                                    <li>
                                        <div className="form-group quantity-box">
                                            <label className="control-label">Quantity</label>
                                            <input className="form-control" value={quantity} min="1" max="20" type="number" onChange={(e) => setQuantity(parseInt(e.target.value))} />
                                        </div>
                                    </li>
                                </ul>

                                <div className="price-box-bar">
                                    <div className="cart-and-bay-btn">
                                        <a className="btn hvr-hover" data-fancybox-close="" href="#">Buy New</a>
                                        <button className="btn hvr-hover" onClick={addToCart}>Add to cart</button>
                                    </div>
                                </div>

                                <div className="add-to-btn">
                                    <div className="add-comp">
                                        <a className="btn hvr-hover" href="#"><i className="fas fa-heart"></i> Add to wishlist</a>

                                    </div>

                                </div>
                            </div>



                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default ProductDetails;