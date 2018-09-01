import React from 'react';

import PropTypes from 'prop-types'

//import styles from './style.scss';

class Search extends React.Component {
  render() {
    const {products} = this.props;
    const productNames = products.map((product, index) => (
      <button onClick={() => this.props.clickSelect(index)} key= {product.itemId}>
       {product.name}
      </button>
    ));

    return (
      <div>
        <input onChange= {this.props.onChange} />
        <button onClick= {this.props.onClick}>Search</button>
        <div>{productNames}</div>
      </div>
    );
  }
}

Search.propTypes = {
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    products: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Search;
