import React, { Component } from 'react';
import { withRouter, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { setCart } from '../../../ducks/products';
import StripeCheckout from 'react-stripe-checkout';
import moment from 'moment';
import axios from 'axios';
import './Checkout.css';

class Checkout extends Component {
	constructor () {
		super();
		this.state = {
			firstName : '',
			lastName  : '',
			email     : '',
			address   : '',
			city      : '',
			state     : '',
			zip       : '',
			phone     : '',
			paid      : false
		}
	}

	componentDidMount () {
		if (this.props.userCart.length <= 0) {this.props.history.push('/cart')}
	}

	handleInput(val,target){
		this.setState({[target]:val})
	}

	payment () {
		this.setState({paid: true});
	}

	completeCheckout() {
		const { userCart, userID } = this.props;
		const { firstName, lastName, email, address, city, state, zip, phone } = this.state;
		let sum = userCart.reduce((a, x) => a + (x.details.product_sale ? x.details.product_sale : x.details.product_price), 0);
		let shipping = userCart.reduce((a, x) => a + x.details.product_shipping, 0);
		let total = sum + shipping;
		let time = moment().format('MMMM Do YYYY, h:mm:ss a')

		let products = userCart.map((x) => {
			return {
				sku      : x.details.product_sku,
				name     : x.details.product_name,
				image    : x.details.product_image,
				price    : x.details.product_sale ? x.details.product_sale.toFixed(2) : x.details.product_price.toFixed(2),
				shipping : x.details.product_shipping.toFixed(2),
				type     : x.details.product_type,
				info     : x.info
			}
		})

		axios.post ( '/orders', {
			user_id          : userID,
			purchase_date    : time,
			products         : JSON.stringify(products),
			order_first_name : firstName,
			order_last_name  : lastName,
			order_email      : email,
			order_address    : address,
			order_city       : city,
			order_state      : state,
			order_zip        : zip,
			order_phone      : phone
		} ).then((res) => {
			axios.post ( '/api/mail/admin', {firstName, lastName, email, address, city, state, zip, phone,	time, sum, shipping, total, info: JSON.stringify(products), ticketID: res.data.order_id} )
				.then(() => {
					axios.post ( '/api/mail/customer', {firstName, lastName, email, address, city, state, zip, phone,	time, sum, shipping, total, info: JSON.stringify(products), ticketID: res.data.order_id} );
					axios.put ('products/rewritecart', [])
						.then((res) => {
							this.props.setCart(res.data);
							this.props.history.push('/');
						})
					})
		})
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
		const { userCart } = this.props;
		const { firstName, lastName, email, address, city, state, zip, phone, paid } = this.state;

		let formsFilled =
			firstName !== '' &&
			lastName  !== '' &&
			email     !== '' &&
			address   !== '' &&
			city      !== '' &&
			state     !== '' &&
			zip       !== '' &&
			phone     !== '' &&
			paid      === true;

		return (
			<div className="content">
				<a>Total: ${userCart.reduce((a, x) => a + x.details.product_price, 0)}</a><br />
				<input onChange={(e)=>this.handleInput(e.target.value, 'email')} placeholder="email"/>
				<Link to="/"><button onClick={() => this.completeCheckout()}>Complete</button></Link>
				<input onChange={ (e)=>this.handleInput(e.target.value, 'firstName') } placeholder="First Name"/><br />
				<input onChange={ (e)=>this.handleInput(e.target.value, 'lastName')  } placeholder="Last Name"/><br />
				<input onChange={ (e)=>this.handleInput(e.target.value, 'email')     } placeholder="Email"/><br />
				<input onChange={ (e)=>this.handleInput(e.target.value, 'address')   } placeholder="Address"/><br />
				<input onChange={ (e)=>this.handleInput(e.target.value, 'city')      } placeholder="City"/><br />
				<input onChange={ (e)=>this.handleInput(e.target.value, 'state')     } placeholder="State"/><br />
				<input onChange={ (e)=>this.handleInput(e.target.value, 'zip')       } placeholder="Zip Code"/><br />
				<input onChange={ (e)=>this.handleInput(e.target.value, 'phone')     } placeholder="Phone Number"/><br />
				<a>*Only ship within the continental US</a><br />
				<a>Total: ${userCart.reduce((a, x) => a + x.details.product_price, 0).toFixed(2)}</a><br />
				<button onClick={() => this.payment()} disabled={paid}>{paid ? 'Paid' : 'Pay'}</button>
				<button onClick={() => this.completeCheckout()} disabled={!formsFilled}>Complete</button>
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

function mapStateToProps  ( state ) { return { userCart: state.products.userCart, userID: state.auth0.user_id } };
export default withRouter ( connect ( mapStateToProps, {setCart} ) ( Checkout ) );