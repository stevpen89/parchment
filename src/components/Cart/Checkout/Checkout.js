import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCart } from '../../../ducks/products';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import './Checkout.css';

class Checkout extends Component {
	constructor () {
		super();
		this.state = {
			email: ''
		}
	}

	componentDidMount () {
		if (this.props.userCart.length <= 0) {this.props.history.push('/cart')}
	}

	handleInput(val,target){
		this.setState({[target]:val})
	}

	completeCheckout() {
		axios.put ('products/rewritecart', [])
			.then((res) => this.props.setCart(res.data))
	}

	    //---------------------Stripe-----------------//

			onToken = (token) => {
        token.card = void 0
        axios.post(`/api/charge`, { token, amount: Math.floor(100) }).then(res => {
            console.log(res)
            // axios.delete(`/api/empty_cart`).then(() => {
            //     this.getCart()
            //     this.getTotal()
            // })
        })
    }
			//---------------------Stripe----------------------//

	render() {
		const { userCart } = this.props
		return (
			<div className="content">
				<a>Total: ${userCart.reduce((a, x) => a + x.details.product_price, 0)}</a><br />
				<input onChange={(e)=>this.handleInput(e.target.value, 'email')} placeholder="email"/>
				<Link to="/"><button onClick={() => this.completeCheckout()}>Complete</button></Link>
				<StripeCheckout
					name="Parchment Goods"
					description="Complete Your Purchase"
					image="https://s3-us-west-1.amazonaws.com/parchmentgoods/logo/logo.png"
					token={this.onToken}
					stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
					amount={100}
				/>
			</div>
		)
	}
}

function mapStateToProps  ( state ) { return { userCart: state.products.userCart } };
export default withRouter ( connect ( mapStateToProps, {setCart} ) ( Checkout ) );