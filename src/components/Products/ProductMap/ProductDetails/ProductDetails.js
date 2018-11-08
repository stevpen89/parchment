import React, { Component } from 'react'
import axios from 'axios';
import './ProductDetails.css'
import {Link} from 'react-router-dom'

class ProductDetails extends Component {
	constructor(){
		super()
		this.state={
			product: {},
			printPrices: {}
		}
	}

	componentDidMount(){
		axios.get(`/products/single/${this.props.match.params.sku}`).then((res)=>{
			this.setState({product:res.data})
			if (res.data.product_type === 'print_single' || res.data.product_type === 'print_binary' || res.data.product_type === 'print_inverted')
				{this.setState({printPrices: JSON.parse(res.data.o1)})}
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
		const { product_thumbs, product_sku, product_desc, product_image, product_price, product_sale, product_shipping, product_tags } = this.state.product
		const { normal8x10, normal12x18, normal16x20, normal18x24, normal24x36, sale8x10, sale12x18, sale16x20, sale18x24, sale24x36 } = this.state.printPrices;

		return (
			<div className="content">
				<div className="details-container">
					<div className="details-image-container" style={{backgroundImage: `url(${product_image})`, backgroundSize: `cover`, backgroundPosition: `center`}}>
					<div className="details-thumbnail-wrapper">
						{product_thumbs
							? product_thumbs.thumbnails.map((x,y)=>
							<div className="details-product-thumbnail" key={y}>{x}</div>) 
							: null}
					</div>
					</div>
					<div className="details-product-information">
						{product_thumbs ? 
						<div>
							<div className="details-product-data">SKU: {product_sku}</div>
							<div className="details-product-data">{product_desc}</div>
							{ Object.keys(this.state.printPrices).length === 0 && this.state.printPrices.constructor === Object ? 
									<div>
										<div className={product_sale ? 'details-product-data strikeout' : 'details-product-data'}>Price: ${product_price}</div>
										{product_sale ? <div className="details-product-data">Sale Price: ${product_sale}</div> : null}
									</div>
								:
									<div>
										<div><a>8 X 10 - </a><a class={sale8x10  ? `strikeout` : ``}>Price: ${normal8x10}</a>{sale8x10 ? <a>, Sale Price: {sale8x10}</a> : null}</div>
										<div><a>12 X 18 - </a><a class={sale12x18 ? `strikeout` : ``}>Price: ${normal12x18}</a>{sale12x18 ? <a>, Sale Price: {sale12x18}</a> : null}</div>
										<div><a>16 X 20 - </a><a class={sale16x20 ? `strikeout` : ``}>Price: ${normal16x20}</a>{sale16x20 ? <a>, Sale Price: {sale16x20}</a> : null}</div>
										<div><a>18 X 24 - </a><a class={sale18x24 ? `strikeout` : ``}>Price: ${normal18x24}</a>{sale18x24 ? <a>, Sale Price: {sale18x24}</a> : null}</div>
										<div><a>24 X 36 - </a><a class={sale24x36 ? `strikeout` : ``}>Price: ${normal24x36}</a>{sale24x36 ? <a>, Sale Price: {sale24x36}</a> : null}</div>
									</div>
							}
							{product_shipping > 0 ? <div className="details-product-data">Shipping: ${product_shipping}</div> : null}
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