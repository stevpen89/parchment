import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class ProductCard extends Component {

	productDetailsSwitch(){
		let {product_tags,product_sku} = this.props
			if(product_tags.includes('inverted')){
				return <Link to={`/products/${product_sku}/inverted`}><button>this is a inverted blanket</button></Link>}

			else if(product_tags.includes('binary')){
				return <Link to={`/products/${product_sku}/binary`}><button>this is a binary blanket</button></Link>}

			else if(product_tags.includes('single')){
				return <Link to={`/products/${product_sku}/single`}><button>this is a single blanket</button></Link>}
				
			else if(product_tags.includes('baby')){
				return <Link to={`/products/${product_sku}/baby`}><button>this is a baby blanket</button></Link>}
				
			else if(product_tags.includes('journal')){
				return <Link to={`/products/${product_sku}/journal`}><button>this is a journal</button></Link>}
			
			else
				<div>internal error...</div>}

	render() {
		const {product_sku,product_name,
			product_tags,product_image,
			product_thumbs,product_desc,product_price} = this.props
		return (
			<div className="product-card">
				<div>{product_thumbs}</div>
				<div>{product_desc}</div>
				<div className="product-card-footer">
					<div>{product_name}</div>
					<div>{product_price}</div>
				</div>
				{this.productDetailsSwitch()}
			</div>
		)
	}
}

export default ProductCard


