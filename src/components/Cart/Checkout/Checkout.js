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
			journalCount : 0,
			containsJournal:false,
			selectedState:'',
			totalWithTax:0,
			tax:0,
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
		hasShipping ? this.setState({containsJournal:true}) : null
		this.countOrders()
		let taxrate = 1.0575
		let totalWithTax = total*taxrate 
		this.setState({totalWithTax})
	}

	countOrders(){
		axios.post(`/products/ordercount`,{product:`%Journal%`}).then((res)=>{
			this.setState({journalCount:res.data[0].count})
		})
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
		let total = this.state.totalWithTax + (hasShipping === true ? shipping : 0);


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
    axios.post(`/api/charge`, { token, amount: Math.floor(this.state.selectedState==='Utah' ? this.state.totalWithTax*100 : this.state.total*100) }).then(res => {
			const { address_city, address_line1, address_state, address_zip, name } = res.data.source
			this.completeCheckout(name, address_line1, address_city, address_state, address_zip);
    })
	}
	
	handleSelect(val){
		this.setState({selectedState:val})
	}

	render() {
		const { email,phone,validEmail,confirmEmail,journalCount,containsJournal,selectedState } = this.state;
		const { userCart } = this.props


		let formsFilled =
			phone        !== '' &&
			validEmail   === true &&
			confirmEmail === email &&
			selectedState !== '';

		return (
			<div className="content">
				<div className="checkout">
					<div>
						<input onChange={ (e)=>this.handleInput(e.target.value, 'email')} placeholder="Email"/>
						{validEmail ? <a><i className="fas fa-check"></i></a> : null}
					</div>
					<div>
						<input onChange={ (e)=>this.handleInput(e.target.value, 'confirmEmail')} placeholder="Verify Email"/>
						{confirmEmail === email && confirmEmail !== '' && validEmail ? <a><i className="fas fa-check"></i></a> : null}
					</div>
					<div>
						<input onChange={ (e)=>this.handleInput(e.target.value, 'phone')} placeholder="Phone Number"/>
						{phone ? <a><i className="fas fa-check"></i></a> : null}
					</div>
					<div>
					<select onChange={(e)=>this.handleSelect(e.target.value)}>
						<option disabled selected value> --- State ---</option>
						<option value='Alaska'>Alaska</option>
						<option value='Alabama'>Alabama</option>
						<option value='Arkansas'>Arkansas</option>
						<option value='American Samoa'>American Samoa</option>
						<option value='Arizona'>Arizona</option>
						<option value='California'>California</option>
						<option value='Colorado'>Colorado</option>
						<option value='Connecticut'>Connecticut</option>
						<option value='District of Columbia'>District of Columbia</option>
						<option value='Delaware'>Delaware</option>
						<option value='Florida'>Florida</option>
						<option value='Georgia'>Georgia</option>
						<option value='Guam'>Guam</option>
						<option value='Hawaii'>Hawaii</option>
						<option value='Iowa'>Iowa</option>
						<option value='Idaho'>Idaho</option>
						<option value='Illinois'>Illinois</option>
						<option value='Indiana'>Indiana</option>
						<option value='Kansas'>Kansas</option>
						<option value='Kentucky'>Kentucky</option>
						<option value='Louisiana'>Louisiana</option>
						<option value='Massachusetts'>Massachusetts</option>
						<option value='Maryland'>Maryland</option>
						<option value='Maine'>Maine</option>
						<option value='Michigan'>Michigan</option>
						<option value='Minnesota'>Minnesota</option>
						<option value='Missouri'>Missouri</option>
						<option value='Mississippi'>Mississippi</option>
						<option value='Montana'>Montana</option>
						<option value='North Carolina'>North Carolina</option>
						<option value='North Dakota'> North Dakota</option>
						<option value='Nebraska'>Nebraska</option>
						<option value='New Hampshire'>New Hampshire</option>
						<option value='New Jersey'>New Jersey</option>
						<option value='New Mexico'>New Mexico</option>
						<option value='Nevada'>Nevada</option>
						<option value='New York'>New York</option>
						<option value='Ohio'>Ohio</option>
						<option value='Oklahoma'>Oklahoma</option>
						<option value='Oregon'>Oregon</option>
						<option value='Pennsylvania'>Pennsylvania</option>
						<option value='Puerto Rico'>Puerto Rico</option>
						<option value='Rhode Island'>Rhode Island</option>
						<option value='South Carolina'>South Carolina</option>
						<option value='South Dakota'>South Dakota</option>
						<option value='Tennessee'>Tennessee</option>
						<option value='Texas'>Texas</option>
						<option value='Utah'>Utah</option>
						<option value='Virginia'>Virginia</option>
						<option value='Virgin Islands'>Virgin Islands</option>
						<option value='Vermont'>Vermont</option>
						<option value='Washington'>Washington</option>
						<option value='Wisconsin'>Wisconsin</option>
						<option value='West Virginia'>West Virginia</option>
						<option value='Wyoming'>Wyoming</option>
					</select>
					{selectedState !== '' ? <a><i className="fas fa-check"></i></a> : null}
					</div>
					<a>* Shipping only available within the continental US</a><br />
					<a>* Read our <Link to="about">privacy policy</Link></a><br />
					{this.state.selectedState === "Utah" ? <div><a className="checkout-total">Tax: ${(this.state.total*.0575).toFixed(2)}</a><br /></div> : null}
					<a className="checkout-total">Total: ${(this.state.selectedState==='Utah' ? this.state.totalWithTax : this.state.total).toFixed(2)}</a><br />
				{containsJournal && journalCount >= 485 ? null : <StripeCheckout
					name="Parchment Goods"
					description="Complete Your Purchase"
					image="https://s3-us-west-1.amazonaws.com/parchmentgoods/logo/square-logo-dark.png"
					token={this.onToken}
					email={this.state.email}
					shippingAddress={true}
					zipCode={true}
					currency="USD"
					stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
					amount={(this.state.selectedState==='Utah' ? this.state.totalWithTax*100 : this.state.total*100)}
					className={ formsFilled ? `checkout-button` : `checkout-button checkout-disabled` }
				/>}
				</div>
			</div>
		)
	}
}

function mapStateToProps  ( state ) { return { userCart: state.products.userCart, userID: state.auth0.user_id } };
export default withRouter ( connect ( mapStateToProps, {setCart} ) ( Checkout ) );