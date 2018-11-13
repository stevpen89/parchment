import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Footer.css';

class Footer extends Component {
	constructor(){
		super()
		this.state={}
	}
	render() {
		return (
			<div className="footer">
				<a>© Parchment Goods 2018    | <Link to="/about" className="privacy-link">Privacy Policy</Link>  | <Link to="/contact" className="privacy-link">Contact Us</Link></a>
			</div>
		)
	}
}

export default Footer