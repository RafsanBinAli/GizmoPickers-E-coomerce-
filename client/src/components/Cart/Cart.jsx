import React, { useState, useEffect } from 'react';
import List from "./List/List";
import Summary from "./Summary/Summary";
import "./cart.css"
const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Fetch cart items from local storage
        const cartData = localStorage.getItem('cart');
        if (cartData) {
            setCartItems(JSON.parse(cartData));
        }
    }, []);
    return (
        <>
            <div className="cart-box-main">
                <div className="container">
                    <div className="row">
                        <List cartItems={cartItems} setCartItems={setCartItems} />
                        <Summary cartItems={cartItems} />
                    </div>
                </div>
            </div>

        </>
    )
}
export default Cart;