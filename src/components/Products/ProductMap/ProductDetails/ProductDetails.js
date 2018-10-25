import React, { Component } from 'react'
import axios from 'axios';
import './ProductDetails.css'
import {Link} from 'react-router-dom'

class ProductDetails extends Component {
	constructor(){
		super()
		this.state={
			product:[]
		}
	}

	componentDidMount(){
		axios.get(`/products/${this.props.match.params.sku}`).then((res)=>{
			console.log(this.state.product)
			this.setState({product:res.data})
			console.log(this.state.product)
		})
	}

	editorSwitch(){
		const {sku} = this.props.match.params
			if			(this.props.match.path === "/products/:sku/inverted"){
				return <Link to={`/products/${sku}/inverted/customize`}>	<button>Customize Now</button>	</Link>}

			else if	(this.props.match.path === "/products/:sku/binary"){
				return <Link to={`/products/${sku}/binary/customize`}>		<button>Customize Now</button>			</Link>}

			else if	(this.props.match.path === "/products/:sku/single"){
				return <Link to={`/products/${sku}/single/customize`}>		<button>Customize Now</button>			</Link>}
				
			else if	(this.props.match.path === "/products/:sku/baby"){
				return <Link to={`/products/${sku}/baby/customize`}>			<button>Customize Now</button>				</Link>}
				
			else if	(this.props.match.path === "/products/:sku/journal"){
				return <Link to={`/products/${sku}/journal/customize`}>		<button>Customize Now</button>						</Link>}
			
			else
				<div>product not found...</div>
	}

	render() {
		const {product} = this.state
		console.log(this.props.match)
		return (
			<div className="content">
				<div className="details-container">
					<div className="details-image-container">
					{this.state.product[0] 
						? this.state.product[0].product_thumbs.thumbnails.map((x,y)=>
						<div className="details-product-thumbnail">thumbnail {y+1} -- {x}</div>) 
						: null}
					</div>
					<div className="details-product-information">
						{this.state.product[0] ? 
						<div>
							<div className="details-product-data">{product[0].product_sku}</div>
							<div className="details-product-data">{product[0].product_desc}</div>
							<div className="details-product-data">{product[0].product_image}</div>
							<div className="details-product-data">{product[0].product_price}</div>
							{product[0].product_tags.tags.map((x,y)=><div className="details-product-data">tag:{y+1} -- {x}</div>)}
							<div className="details-product-data">{this.editorSwitch()}</div>
						</div>
						: null}
					</div>
				</div>
			</div>
		)
	}
}

export default ProductDetails