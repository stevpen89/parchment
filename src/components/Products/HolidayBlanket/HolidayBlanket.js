import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import './HolidayBlanket.css'

class HolidayBlanket extends Component {
	constructor(){
		super()
		this.state={
			product:{},
			input1:''
		}
	}

	// axios call made on CDM, sets result to product

	componentDidMount () {
		axios.get(`/products/${this.props.match.params.sku}`).then((res)=>{
			this.setState({product:res.data})
		})
	}

	// tracks changes to the input field, maps to input1. 

	handleInput(val){
		this.setState({input1:val})
	}

	// *** currently not hooked up *** ... wasn't sure if we were sending this to server or redux?

	addToCart(){
		console.log(`${this.state.input1} added to cart`)
	}

	render() {
		const {product_image} = this.state.product
		return (
			<div className="holiday-content">
				<div className="image-holder">
					<div style={{background: `url(${product_image}) center`, backgroundSize: `cover`}} className="holiday-blanket-image">
					</div>
				</div>	
				<div className="right-menu">
					<div className="input-wrapper">
						Name Here:<input onChange={(e)=>this.handleInput(e.target.value)}/>
					</div>
					<div className="finalize-wrapper">
						<button onClick={()=>this.addToCart()}>Add To Cart</button>
					</div>
				</div>
			</div>
		)
	}
}

export default connect()(HolidayBlanket)