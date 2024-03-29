import React from 'react';

const List = ({ cartItems, setCartItems }) => {
    const handleRemove = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1); // Remove the item at the specified index
        setCartItems(updatedCartItems); // Update the cart items state
        localStorage.setItem('cart', JSON.stringify(updatedCartItems)); // Update cart in local storage
    };
    const handleQuantityChange = (e, index) => {
        const newQuantity = parseInt(e.target.value);
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity = newQuantity;
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };
    return (
        <>
            
            <div className="col-lg-8">
                <div className="table-main table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Images</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td className="thumbnail-img">
                                        <img className="img-fluid" src={item.imageUrls} alt={item.product_name} />
                                    </td>
                                    <td className="name-pr" style={{ fontWeight: 'bold', color: 'black' }}>
                                        {item.product_name}
                                    </td>
                                    <td className="price-pr" style={{ fontWeight: 'bold', color: 'black' }}>
                                        <p>${item.price}</p>
                                    </td>
                                    <td className="quantity-box">
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min="0"
                                        step="1"
                                        className="c-input-text qty text"
                                        
                                        onChange={(e) => handleQuantityChange(e, index)}
                                    />
                                </td>
                                    <td className="total-pr" style={{ fontWeight: 'bold', color: 'black' }}>
                                        <p>${item.price * item.quantity}</p>
                                    </td>
                                    <td className="remove-pr">
                                        <button onClick={() => handleRemove(index)}>
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default List;