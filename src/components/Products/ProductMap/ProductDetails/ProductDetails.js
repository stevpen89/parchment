import React, { Component } from 'react'
import axios from 'axios';
import './ProductDetails.css'
import {Link} from 'react-router-dom'

class ProductDetails extends Component {
	constructor(){
		super()
		this.state={
			product: {}
		}
	}

	componentDidMount(){
		axios.get(`/products/single/${this.props.match.params.sku}`).then((res)=>{
			this.setState({product:res.data})
		})
	}

	editorSwitch(){
		const {sku} = this.props.match.params
			switch (this.props.match.path) {
				case "/product/:sku/inverted"      : return `/product/${sku}/inverted/customize`
				case "/product/:sku/binary"        : return `/product/${sku}/binary/customize`
				case "/product/:sku/single"        : return `/product/${sku}/single/customize`
				case "/product/:sku/printInverted" : return `/product/${sku}/printInverted/customize`
				case "/product/:sku/printBinary"   : return `/product/${sku}/printBinary/customize`
				case "/product/:sku/printSingle"   : return `/product/${sku}/printSingle/customize`
				case "/product/:sku/baby"          : return `/product/${sku}/baby/customize`
				case "/product/:sku/holiday"       : return `/product/${sku}/journal/customize`
				case "/product/:sku/journal"       : return `/product/${sku}/journal/customize`
				default                            : return `/`
			}
	}

	render() {
		const { product_thumbs, product_sku, product_desc, product_image, product_price, product_shipping, product_tags } = this.state.product
		return (
			<div className="content">
				<div className="details-container">
					<div className="details-image-container" style={{backgroundImage: `url(${product_image})`, backgroundSize: `cover`, backgroundPosition: `center`}}>
					{/* <div className="details-thumbnail-wrapper">
						{product_thumbs
							? product_thumbs.thumbnails.map((x,y)=>
							<div className="details-product-thumbnail" key={y}>{x}</div>) 
							: null}
					</div> */}
					</div>
					<div className="details-product-information">
						{product_thumbs ? 
						<div>
							<div className="details-product-data">SKU: {product_sku}</div>
							<div className="details-product-data">{product_desc}</div>
							<div className="details-product-data">Price: ${product_price}</div>
							<div className="details-product-data">Shipping: ${product_shipping}</div>
							<div className="details-product-data">
								{product_tags.tags.map((x,y)=><Link to={`/products/${x}`} className="details-tag" key={y}>{x}</Link>)}
							</div>
							<div className="details-customize-button"><Link to={ this.editorSwitch() }><button>Customize Now</button></Link></div>
						</div>
						: null}
					</div>
				</div>
			</div>
		)
	}
}

export default ProductDetails