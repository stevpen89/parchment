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
			email        : '',
			phone        : '',
			validEmail   : false,
			confirmEmail : '',
			shipping     : 3.99,
			total			   : 0,
		}
	}

	componentDidMount () {
		const { shipping } = this.state;
		const { userCart } = this.props;

		let sum = userCart.reduce((a, x) => a + (x.details.product_sale ? x.details.product_sale : x.details.product_price), 0);
		let hasShipping = false ;

		userCart.map((x)=>{return x.details.product_type === 'journal_missionary' || x.details.product_type === 'journal_everyday' ? hasShipping = true : null});
		let total = sum + (hasShipping === true ? shipping : 0);
		this.setState({total})
		if (this.props.userCart.length <= 0) {this.props.history.push('/cart')}
	}

	handleInput(val,target){
		let emailRegEx = /(.+)@(.+){2,}\.(.+){2,}/;
		this.setState({[target]:val});
		emailRegEx.test(this.state.email) ? this.setState({validEmail: true}) : this.setState({validEmail: false});
	}

	completeCheckout(name, address, city, state, zip) {
		//declare variables
		const { userCart, userID } = this.props;
		const { email, phone, shipping } = this.state;

		//find the prices
		let hasShipping = false
		userCart.map((x)=>{return x.details.product_type === 'journal_missionary' || x.details.product_type === 'journal_everyday' ? hasShipping = true : null})
		let sum = userCart.reduce((a, x) => a + (x.details.product_sale ? x.details.product_sale : x.details.product_price), 0);
		let time = moment().format('MMMM Do YYYY, h:mm:ss a')
		let total = sum + (hasShipping === true ? shipping : 0);

		//product info, which includes their customization
		let products = userCart.map((x) => {
			return {
				sku      : x.details.product_sku,
				name     : x.details.product_name,
				image    : x.details.product_image,
				price    : x.details.product_sale ? x.details.product_sale.toFixed(2) : x.details.product_price.toFixed(2),
				shipping : (hasShipping === true ? shipping : 0),
				type     : x.details.product_type,
				info     : x.info
			}
		})

		//sends the data to the orders table
		axios.post ( '/orders', {
			user_id          : userID,
			purchase_date    : time,
			products         : JSON.stringify(products),
			order_name       : name,
			order_email      : email,
			order_address    : address,
			order_city       : city,
			order_state      : state,
			order_zip        : zip,
			order_phone      : phone
		} ).then((res) => {
			//emails the admin the receipt and data
			axios.post ( '/api/mail/admin', {name, email, address, city, state, zip, phone,	time, sum, shipping, hasShipping, total, info: JSON.stringify(products), ticketID: res.data.order_id} )
				.then(() => {
					//emails the customer their receipt
					axios.post ( '/api/mail/customer', {name, email, address, city, state, zip, phone,	time, sum, shipping, hasShipping, total, info: JSON.stringify(products), ticketID: res.data.order_id} );
					//empties the cart and sends you to the home page
					axios.put ('products/rewritecart', [])
						.then((res) => {
							this.props.setCart(res.data);
							this.props.history.go(-2);
						})
					})
		})
	}


	onToken = (token) => {
    token.card = void 0;
    axios.post(`/api/charge`, { token, amount: Math.floor(this.state.total*100) }).then(res => {
			const { address_city, address_line1, address_state, address_zip, name } = res.data.source
			this.completeCheckout(name, address_line1, address_city, address_state, address_zip);
    })
  }

	render() {
		const { email, phone, validEmail, confirmEmail } = this.state;

		let formsFilled =
			phone        !== '' &&
			validEmail   === true &&
			confirmEmail === email;

		return (
			<div className="content">
				<a>Email: </a><input onChange={ (e)=>this.handleInput(e.target.value, 'email')} placeholder="Email"/>
				{validEmail ? <a><i className="fas fa-check"></i></a> : null}<br />
				<a>Verify Email: </a><input onChange={ (e)=>this.handleInput(e.target.value, 'confirmEmail')} placeholder="Verify Email"/>
				{confirmEmail === email && confirmEmail !== '' && validEmail ? <a><i className="fas fa-check"></i></a> : null}<br />
				<input onChange={ (e)=>this.handleInput(e.target.value, 'phone')} placeholder="Phone Number"/>
				{phone ? <a><i className="fas fa-check"></i></a> : null}<br />
				<a>*Only ship within the continental US</a><br />
				<a>*Read our <Link to="about">privacy policy</Link></a><br />
				<a>Total: ${this.state.total.toFixed(2)}</a><br />
				{formsFilled ?
				<StripeCheckout
					name="Parchment Goods"
					description="Complete Your Purchase"
					image="https://s3-us-west-1.amazonaws.com/parchmentgoods/logo/square-logo-dark.png"
					token={this.onToken}
					email={this.state.email}
					shippingAddress={true}
					zipCode={true}
					currency="USD"
					stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
					amount={(this.state.total * 100)}
				/> : null}
			</div>
		)
	}
}

function mapStateToProps  ( state ) { return { userCart: state.products.userCart, userID: state.auth0.user_id } };
export default withRouter ( connect ( mapStateToProps, {setCart} ) ( Checkout ) );