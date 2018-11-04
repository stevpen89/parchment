import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCart } from '../../ducks/products';
import axios from 'axios';
import './Cart.css';

class Cart extends Component {

	deleteItem(i) {
		let tempCart = [...this.props.userCart];
		tempCart.splice(i, 1);
		axios.put ('products/rewritecart', tempCart)
			.then((res) => this.props.setCart(res.data))
	}

	render() {
		const { userCart } = this.props
		console.log(userCart)
		if (userCart.length > 0) {
			return (
				<div className="content">
					<div className="cart-wrapper">
						<div>
							{userCart.map((x, i) => {
								return (
									<div className="cart-item" key={i}>
										<div className="card-item-image" style={{background: `linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%), center url(${x.details.product_image})`, backgroundSize: `cover`}}>
											<a>{x.details.product_name} </a>
										</div>
										<div className="cart-item-details">
											<a>SKU: {x.details.product_sku}</a>
											<a>Description: {x.details.product_desc}</a>
											<a>Info: {JSON.stringify(x.info)}</a>
											<a>Price: ${x.details.product_price}</a>
										</div>
										<div className="card-item-delete">
											<button onClick={() => this.deleteItem(i)}>X</button>
										</div>
									</div>
								)
							})}
					</div>
					<div>
						<a>Total: ${userCart.reduce((a, x) => a + x.details.product_price, 0)}</a><br />
						<Link to="/checkout"><button className="checkout-button">Checkout</button></Link>
					</div>
					</div>
				</div>
			)
		}
		else {
			return (
				<div className="content">
					<div className="empty-cart">No items added to cart</div>
				</div>
			)
		}
	}
}

function mapStateToProps  ( state ) { return { userCart: state.products.userCart } };
export default connect ( mapStateToProps, {setCart} ) ( Cart );