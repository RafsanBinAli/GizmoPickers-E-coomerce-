import React from 'react';
import { useNavigate } from 'react-router-dom';

const Summary = () => {
    const navigate =useNavigate();
    // Retrieve cart data from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const totalSum = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    const deliveryCharge = 10;

    // Calculate final total including discount and delivery charges
    const finalTotal = totalSum + deliveryCharge;

    const handleCheckout = () => {
        if(cartItems.length===0){
            alert("Please Select an Item");
            return;
        }
        const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
        console.log(isUserLoggedIn)
        if (isUserLoggedIn === 'false' || isUserLoggedIn===null) {
            navigate('/user/login?location=cart'); // Redirect to login page if user is not logged in
        } else {
           navigate('/checkout'); // Redirect to checkout page if user is logged in
        }
    };

    return (
        <div className="col-lg-4 col-sm-12 border border-dark rounded p-3">
            <div className="order-box">
                <h3>Order summary</h3>
                <hr className="my-3" />
                {cartItems.map((item, index) => (
                    <div key={index} className="d-flex">
                        <h4>{item.product_name}</h4>
                        <div className="ml-auto font-weight-bold">  {item.price * item.quantity}  ৳</div>
                    </div>
                ))}
                <hr className="my-3" />
                <div className="d-flex">
                    <h4>Sub Total</h4>
                    <div className="ml-auto font-weight-bold">  {totalSum}  ৳</div>
                </div>
                
                <div className="d-flex">
                    <h4>Delivery Charge</h4>
                    <div className="ml-auto font-weight-bold">  {deliveryCharge}  ৳</div>
                </div>
                <hr className="my-4" />
                <div className="d-flex gr-total">
                    <h5>Grand Total</h5>
                    <div className="ml-auto h5">  {finalTotal}  ৳</div>
                </div>
                <hr />
                {/* Checkout button */}
                
            </div>

           
            <div className="col-12 d-flex shopping-box">
                    <button className="btn hvr-hover p" onClick={handleCheckout}>
                        Checkout
                    </button>
                </div>
        </div>
    );
};

export default Summary;
