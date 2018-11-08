import React, { Component } from 'react'
import axios from 'axios';
import './ProductDetails.css'
import {Link} from 'react-router-dom'

class ProductDetails extends Component {
	constructor(){
		super()
		this.state={
			product: {},
			printPrices: {},
			selectedImage:'',
			imagesArray:'',
			selectedTemplate:null
		}
	}

	componentDidMount(){
		let tempArr = []
		axios.get(`/products/single/${this.props.match.params.sku}`).then((res)=>{
			tempArr.push(res.data.product_image)
			res.data.product_thumbs.thumbnails.map((x)=>{tempArr.push(x)})	
			this.setState({product:res.data,imagesArray:tempArr,selectedImage:tempArr[0]})
			if (res.data.product_type === 'print_single' || res.data.product_type === 'print_binary' || res.data.product_type === 'print_inverted')
				{this.setState({printPrices: JSON.parse(res.data.o1)})}
		})
	}

	editorSwitch(){
		const {sku} = this.props.match.params
			switch (this.props.match.path) {
				case "/product/:sku/inverted"      : return `/product/${sku}/inverted/customize/color`
				case "/product/:sku/binary"        : return `/product/${sku}/binary/customize/color`
				case "/product/:sku/single"        : return `/product/${sku}/single/customize/color`
				case "/product/:sku/printInverted" : return `/product/${sku}/printInverted/customize/color`
				case "/product/:sku/printBinary"   : return `/product/${sku}/printBinary/customize/color`
				case "/product/:sku/printSingle"   : return `/product/${sku}/printSingle/customize/color`
				case "/product/:sku/baby"          : return `/product/${sku}/baby/customize`
				case "/product/:sku/holiday"       : return `/product/${sku}/journal/customize`
				case "/product/:sku/journal"       : return `/product/${sku}/journal/customize`
				default                            : return `/`
			}
	}

	selectImage(url){
		this.setState({selectedImage:url})
	}
	selectTemplate(val){
		this.setState({selectedTemplate:val})
	}

	render() {
		const { product_thumbs, product_sku, product_desc, product_image, product_price, product_shipping, product_tags } = this.state.product
		const { normal8x10, normal12x18, normal16x20, normal18x24, normal24x36, sale8x10, sale12x18, sale16x20, sale18x24, sale24x36 } = this.state.printPrices;

		return (
			<div className="content">
				<div className="details-container">
					<div className="details-image-container" style={{backgroundImage: `url(${this.state.selectedImage})`, backgroundSize: `cover`, backgroundPosition: `center`}}>
					<div className="details-thumbnail-wrapper">
						{this.state.imagesArray
							? this.state.imagesArray.map((x,y)=>
							<div onClick={()=>this.selectImage(x)} className="details-product-thumbnail" key={y} style={{backgroundImage: `url(${x})`, backgroundSize: `cover`, backgroundPosition: `center`}}>
							{(this.state.selectedTemplate*1+1) === y 
							? <div style={{border:"3px solid red"}}></div>:null}</div>) 
							: null}
					</div>
					</div>
					<div className="details-product-information">
						{product_thumbs ? 
						<div>
							<div className="details-product-data">SKU: {product_sku}</div>
							<div className="details-product-data">{product_desc}</div>
							{ Object.keys(this.state.printPrices).length === 0 && this.state.printPrices.constructor === Object ? 
									<div className="details-product-data">Price: ${product_price}</div>
								:
									<div>
										<div> 8 X 10 - Price: ${normal8x10},  Sale Price: {sale8x10} </div>
										<div>12 X 18 - Price: ${normal12x18}, Sale Price: {sale12x18}</div>
										<div>16 X 20 - Price: ${normal16x20}, Sale Price: {sale16x20}</div>
										<div>18 X 24 - Price: ${normal18x24}, Sale Price: {sale18x24}</div>
										<div>24 X 36 - Price: ${normal24x36}, Sale Price: {sale24x36}</div>
									</div>
							}
							<div className="details-product-data">Shipping: ${product_shipping}</div>
							<select onChange={(e)=>this.selectTemplate(e.target.value)}>
								<option value="1">1. Dark Brown (Fall)</option>
								<option value="2">2. Grey Brown (Fall)</option>
								<option value="3">3. Beige Brown (Fall)</option>
								<option value="4">4. Olive Green (Fall)</option>
								<option value="5">5. Gold (Fall)</option>
								<option value="6">6. Blue (Fall)</option>
								<option value="7">7. Beige (Summer)</option>
							</select>
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
