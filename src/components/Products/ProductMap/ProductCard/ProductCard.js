import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './ProductCard.css'

class ProductCard extends Component {

	productDetailsSwitch(){
		let {product_type, product_sku} = this.props
		
		switch (product_type) {
			case 'blanket_inverted'   : return `/product/${product_sku}/inverted`
			case 'blanket_binary'     : return `/product/${product_sku}/binary`
			case 'blanket_single'     : return `/product/${product_sku}/single`
			case 'print_inverted'     : return `/product/${product_sku}/printInverted`
			case 'print_binary'       : return `/product/${product_sku}/printBinary`
			case 'print_single'       : return `/product/${product_sku}/printSingle`
			case 'blanket_baby'       : return `/product/${product_sku}/baby`
			case 'blanket_holiday'    : return `/product/${product_sku}/journal`
			case 'journal_missionary' : return `/product/${product_sku}/journal`
			case 'journal_everyday'   : return `/product/${product_sku}/journal`
			default                   : return `/`
		}
	}

	contentRender(){
		const {	product_name, product_image, product_price, product_sale, product_type } = this.props;
		const printPrice = JSON.parse(this.props.o1);
		return(
			<Link to={this.productDetailsSwitch()}>
				<div className="product-card">
					<div style={{background: `url(${product_image}) center`, backgroundSize: `cover`}} className="product-image">
					</div>
					<div className="product-card-footer">
						<div className="product-name">{product_name}</div>
						<div className="product-desc-price">
						{
							product_type === 'print_inverted' || product_type === 'print_single' || product_type === 'print_binary' ?
							<div>
								<a className={printPrice.sale8x10 || printPrice.sale12x18 || printPrice.sale16x20 || printPrice.sale18x24 || printPrice.sale24x36 ? 'strikeout' : ''}>Starting at: ${printPrice.normal8x10}</a><br />
								{ printPrice.sale8x10 || printPrice.sale12x18 || printPrice.sale16x20 || printPrice.sale18x24 || printPrice.sale24x36 ?
									<a>On Sale</a>
									:
									null
								}
							</div>
							:
							<div>
								<div className={product_sale ? 'strikeout' : ''}>Price: ${product_price}</div>
								{product_sale ? <div>Sale Price: ${product_sale}</div> : null}
							</div>
						}
						</div>
					</div>
				</div>
			</Link>)
		
	}

	render() {

		return (
			<div>
				{this.contentRender()}
			</div>
		)
	}
}

export default ProductCard


