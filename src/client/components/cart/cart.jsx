import React from 'react'

import PropTypes from 'prop-types';

class Cart extends React.Component {
    render() {
        const {cart, removeFromCart, addFromCart} = this.props;
        const cartItems = cart.map((item, index) => (
            <div key={index}>
                <div>{item.name}</</div>

                <div>
                    <button onClick= {() => removeFromCart(index)}>-</button>
                    <button onClick= {() => addFromCart(index)}>+</button>
                    {item.count}
                </div>
            </div>
        ));

        let subtotal = 0;   // calculating subtotal

        if (cart.length > 0) {
            subtotal = cart.reduce(
                (acc, currentProduct) => acc + parseFloat(currentProduct.salePrice) * parseInt(currentProduct.count), 0
            );
        };

        let shipping = 10;

        if(subtotal > 50) {     // shipping is free above $50
            shipping = 0;
        };

        const gst = subtotal * 0.07     // gst 7%
        
        let total = subtotal + shipping + gst   // calculat total

        return(
            <div>
              <div>{cartItems}</div>
              <div>Subtotal: $ {subtotal.toFixed(2)}</div> 
              <div>Shipping: $ {shipping > 0 ? shipping.toFixed(2) : 'Free Shipping!'}</div>
              <div>GST: $ {gst.toFixed(2)}</div>
              <div>Total: $ {total.toFixed(2)}</div>
            </div>
        );
    }
}

Cart.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.object).isRequired,
    removeFromCart: PropTypes.func.isRequired,
    addFromCart: PropTypes.func.isRequired
};

export default Cart;