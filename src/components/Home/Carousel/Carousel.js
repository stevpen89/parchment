import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Carousel.css'

class Carousel extends Component {
	constructor(){
		super()
		this.state={}
	}
	render() {
		return (
			<div className="carousel">
				<img src="https://s3-us-west-1.amazonaws.com/parchmentgoods/home-page/logo.png" alt="parchment logo" className="parchment-logo"/><br />
				<Link to="/products"><button>Order Now</button></Link>
				<div className="broken">Please contact us at sales@parchmentgoods.com if you experience any difficulty placing an order. Thank you.</div>
				<div className="down-arrow"><i class="fas fa-chevron-down"></i></div>
			</div>
		)
	}
}

export default Carousel
