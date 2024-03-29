import { useState } from "react";

const Checkout = () => {
    const authToken = localStorage.getItem('userAuthToken');
    const [couponName, setCouponName] = useState('');
    const [percentage, setPercentage] = useState('');
    const [isValidCoupon, setIsValidCoupon] = useState(false);

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalSum = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryCharge = 10;

const [formData, setFormData] = useState({
        recipientName: '',
        phoneNumber: '',
        houseNo: '',
        area: '',
        city: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    // Function to handle applying the coupon
    const handleApplyCoupon = async () => {
        try {
            // Make an API call to fetch the coupon details
            const response = await fetch(`http://localhost:4000/users/coupon-details/${couponName}`);
            const couponData = await response.json();
            setPercentage(couponData.coupon.discount)
            // Check if the coupon data is empty or null
            if (!couponData || !couponData.coupon) {
                // Coupon not found in the database
                alert('Coupon not found');
                setIsValidCoupon(false); // Set isValidCoupon to false
                return;
            }
            if (!response.ok) {
                throw new Error('Failed to fetch coupon details');
            }
            // Get the expiration date from the fetched coupon data
            const expirationDate = new Date(couponData.coupon.expiryDate);
            const currentDate = new Date();
            const isValid = currentDate <= expirationDate;

            console.log(isValid)
            setIsValidCoupon(isValid);

        } catch (error) {
            console.log('Error applying coupon:', error.message);
        }
    };

    const calculateTotal = () => {
        let total = finalTotal;
        if (isValidCoupon) {

            total -= (finalTotal * percentage) / 100;
        }
        return total;
    };
    const finalTotal = totalSum + deliveryCharge;


    const handlePlaceOrder = async () => {
        if (!cartItems.length ||  !formData.recipientName || !formData.phoneNumber || !formData.houseNo || !formData.area || !formData.city) {
            // If any required data is missing, show an alert message to the user
            alert('Please fill in all Shipping Details');
            return;
        }
        if (!cartItems.length ) {
            // If any required data is missing, show an alert message to the user
            alert('Please select any item before placing an order');
            return;
        }

        try {
            // Make an HTTP POST request to your backend API endpoint
            const orderData = {
                cartItems: cartItems,
                coupon: couponName, // Assuming you have the coupon data available
                total: calculateTotal(),
                shippingDetails: formData
            };

            // Make an HTTP POST request to your backend API endpoint
            const response = await fetch('http://localhost:4000/order', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData) // Send combined data in the request body
            });

            if (!response.ok) {
                throw new Error('Failed to place order');
            }
            const responseData = await response.json();
            localStorage.removeItem('cart');
            const redirectUrl = responseData.redirectUrl;

            // Redirect the user to the received URL
            window.location.href = redirectUrl;

            // Optionally, you can redirect the user to the order confirmation page

        } catch (error) {
            console.error('Error placing order:', error);
            // Handle the error (e.g., show an error message to the user)
        }
    }

    // Calculate final total including discount and delivery charges

    return (
        <>
            <div className="cart-box-main">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-lg-6 mb-3">
                            <div className="checkout-address">
                                <div className="title-left">
                                    <h3>Shipping address</h3>
                                </div>
                                <form className="needs-validation" >
                                    <div className="row">
                                        <div className="col-md-10 mb-3">
                                            <label htmlFor="recipientName">Recipient's Name *</label>
                                            <input type="text" className="form-control" id="recipientName" name="recipientName" value={formData.recipientName} onChange={handleChange} placeholder="Enter recipient's name" required />
                                            <div className="invalid-feedback">Please provide a valid name.</div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phoneNumber">Phone Number</label>
                                        <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter phone number" required />
                                        <div className="invalid-feedback">Please provide a valid phone number.</div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="houseNo">House No.</label>
                                        <input type="text" className="form-control" id="houseNo" name="houseNo" value={formData.houseNo} onChange={handleChange} placeholder="Enter house number" required />
                                        <div className="invalid-feedback">Please provide a valid house number.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="area">Area</label>
                                        <input type="text" className="form-control" id="area" name="area" value={formData.area} onChange={handleChange} placeholder="Enter area" />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5 mb-3">
                                            <label htmlFor="city">City</label>
                                            <select className="custom-select d-block w-100" id="city" name="city" value={formData.city} onChange={handleChange} required>
                                                <option value="">Choose...</option>
                                                <option>United States</option>
                                            </select>
                                            <div className="invalid-feedback">Please select a valid city.</div>
                                        </div>
                                    </div>
                                    <hr className="mb-4" />
                                    
                                </form>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-md-12 col-lg-12">

                                </div>
                                <div className="col-md-12 col-lg-12">
                                    <div className="odr-box">
                                        <div className="title-left">
                                            <h3>Shopping cart</h3>
                                        </div>
                                        <div className="rounded p-2 bg-light">
                                            {cartItems.map((item, index) => (
                                                <div key={index} className="media mb-2 border-bottom">
                                                    <div className="media-body">
                                                        <a href="detail.html">{item.product_name}</a>
                                                        <div className="small text-muted">
                                                            Price: {item.price} ৳
                                                            <span className="mx-2">|</span> Qty: {item.quantity}
                                                            <span className="mx-2">|</span> Subtotal: {item.price * item.quantity} ৳
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-12">
                                    <div className="order-box">
                                        <div className="title-left">
                                            <h3>Your order</h3>
                                        </div>
                                        <div className="d-flex">
                                            <div className="font-weight-bold">Product</div>
                                            <div className="ml-auto font-weight-bold">Total</div>
                                        </div>

                                        <hr className="my-3" />
                                        <div className="d-flex">
                                            <h4>Sub Total</h4>
                                            <div className="ml-auto font-weight-bold">  {totalSum}  ৳</div>
                                        </div>

                                        <div className="d-flex">
                                            <h4>Delivery Charge</h4>
                                            <div className="ml-auto font-weight-bold">  {deliveryCharge}  ৳</div>
                                        </div>
                                        <hr className="my-1" />
                                        <div className="d-flex gr-total">
                                            <h5>Grand Total</h5>
                                            <div className="ml-auto h5">  {finalTotal}  ৳</div>
                                        </div>
                                        <hr />
                                        <hr />
                                        <div className="coupon-box">
                                            <h4> If you have any Coupon:</h4>
                                            <div className="input-group input-group-sm">
                                                <input
                                                    id="couponInput"
                                                    className="form-control"
                                                    placeholder="Enter your coupon code"
                                                    aria-label="Coupon Name"
                                                    type="text"
                                                    onChange={(e) => setCouponName(e.target.value)}
                                                />
                                                <div className="input-group-append">
                                                    <button className="btn btn-theme" type="button" onClick={handleApplyCoupon}>
                                                        Apply Coupon
                                                    </button>
                                                </div>
                                            </div>
                                            <hr />
                                            {isValidCoupon && (
                                                <div className="d-flex gr-total">
                                                    <h5>Total Now</h5>
                                                    <div className="ml-auto h5"> {calculateTotal()} ৳
                                                        <hr className="my-3" /></div>
                                                    <hr className="my-3" />
                                                </div>

                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 d-flex shopping-box">
                                    <button className="ml-auto btn hvr-hover" type="submit" onClick={handlePlaceOrder}>Place Order</button>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Checkout;