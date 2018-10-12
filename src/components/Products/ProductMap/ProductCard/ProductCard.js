import React, { Component } from 'react'

class ProductCard extends Component {

	productDetailsSwitch(arr){
		switch(arr){
			case arr.includes('baby'):
				return <div>this is a baby blanket</div>
				
			case arr.includes('history'):
				return <div>this is a family history blanket</div>
				
			case arr.includes('missionary'):
				return <div>this is a missionary journal</div>
				
			case arr.includes('everyday'):
				return <div>this is an everyday journal</div>
				
			default: 
				<div>internal error...</div>

		}
		
			
	}

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
				{this.productDetailsSwitch(product_tags)}
			</div>
		)
	}
}

export default ProductCard


