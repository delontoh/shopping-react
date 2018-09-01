import React from 'react';

import Search from './components/search/search';
import Product from './components/product/product';
import Cart from './components/cart/cart';

import styles from './styles.scss'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: 'hello',
      search: "",
      products: [],
      selectedProduct: null,
      cart: []
    };
  }


  inputHandler(event) {
    this.setState({search: event.target.value});
    console.log("searching", event.target.value);
  };

  async clickHandler(event) {
    const response = await fetch(`/api/query?search=${this.props.search}`);
    const data = await response.json();
    this.setState({product: data.items});
  };

  displayProduct(index) {
    this.setState(({products}) => {
      const selectedProduct = products[index];  // get element of product array from index
      selectedProduct['index'] = index;
      return {selectedProduct};
    });
  };

  addToCart(index){   // parameter index is selectedProduct.index
    this.setState(({products, cart}) => {
      let addedProduct = products[index];
      const productIds = cart.map((product) => product.itemId);
      const addedProductId = productIds.indexOf(addedProduct.itemId);

      if (addedProductId > -1) {
        cart[addedProductId].count++;
      }
      else {
        cart[index].count--;
      } 
      return {cart}
    });
  };

  removeFromCart(index) {
    this.setState(({cart}) => {
      if(cart[index].count === 1) {
        cart.splice(index, 1);  // remove cart item totally if count is just 1 
      }
      else {
        cart[index].count--;    // reduce number of item if count is > 1
      }
      return {cart};
    });
  };

  addFromCart(index) {
    this.setState(({cart}) => {
      if(cart[index].count >= 1) {
        cart[index].count++;
      }
      return {cart};
    });
  };


  render() {
    return (
      <div className={styles['app-container']}>
        <div className={styles['search-container']}> 
          Search Product
          <Search 
            clickSelect= {this.displayProduct}
            onChange= {this.inputHandler}
            onClick= {this.clickHandler}
            products= {this.state.products}
          />
        </div>

        {this.state.selectedProduct && (
          <div className={styles['product-container']}>
            Product Display
            <Product 
              selectedProduct= {this.state.selectedProduct}
              addCart= {this.addToCart}
            />
          </div>
        )}

        <div className={styles['cart-container']}>
          Cart
          <Cart 
            cart= {this.state.cart}
            removeFromCart= {this.removeFromCart}
            addFromCart= {this.addFromCart}
          />
        </div>

      </div>
    );
  }
}

export default hot(module)(App);
