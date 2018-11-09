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
			selectedTemplate: 1,
			parameter:'',
		}
	}

	componentDidMount(){
		let tempArr = [];
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
		const {parameter} = this.state
			switch (this.props.match.path) {
				case "/product/:sku/inverted"      : return `/product/${sku}/inverted/customize/${parameter}`
				case "/product/:sku/binary"        : return `/product/${sku}/binary/customize/${parameter}`
				case "/product/:sku/single"        : return `/product/${sku}/single/customize/${parameter}`
				case "/product/:sku/printInverted" : return `/product/${sku}/printInverted/customize/${parameter}`
				case "/product/:sku/printBinary"   : return `/product/${sku}/printBinary/customize/${parameter}`
				case "/product/:sku/printSingle"   : return `/product/${sku}/printSingle/customize/${parameter}`
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
		this.setParam(val)
	}

	setParam(val){
		switch (val) {
			case "1" : return this.setState({parameter:"dark_brown_fall"})
			case "2" : return this.setState({parameter:"grey_brown_fall"})
			case "3" : return this.setState({parameter:"beige_brown_fall"})
			case "4" : return this.setState({parameter:"olive_green_fall"})
			case "5" : return this.setState({parameter:"gold_fall"})
			case "6" : return this.setState({parameter:"blue_fall"})
			case "7" : return this.setState({parameter:"beige_summer"})
			default  : console.log('triggered default')
		}
	}

	render() {
		const { product_thumbs, product_sku, product_desc, product_image, product_price, product_sale, product_shipping, product_tags,product_type } = this.state.product
		const { normal8x10, normal12x18, normal16x20, normal18x24, normal24x36, sale8x10, sale12x18, sale16x20, sale18x24, sale24x36 } = this.state.printPrices;

		return (
			<div className="content">
				<div className="details-container">
					<div className="details-image-container" style={{backgroundImage: `url(${this.state.selectedImage})`, backgroundSize: `cover`, backgroundPosition: `center`}}>
					<div className="details-thumbnail-wrapper">
						{this.state.imagesArray
							? this.state.imagesArray.map((x,y)=>
							<div onClick={()=>this.selectImage(x)} className="details-product-thumbnail" key={y} style={{backgroundImage: `url(${x})`, backgroundSize: `cover`, backgroundPosition: `center`}}>
							{((this.state.selectedTemplate*1+1) === y  && (product_type.includes('single') || product_type.includes('binary') || product_type.includes('inverted'))) 
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
							{product_type==='blanket_single' || product_type==='blanket_binary' || product_type==='blanket_inverted' || 
								product_type==='print_single' || product_type==='print_binary' || product_type==='print_inverted' ?
										<select onChange={(e)=>this.selectTemplate(e.target.value)}>
											<option value="1">1. Dark Brown (Fall)</option>
											<option value="2">2. Grey Brown (Fall)</option>
											<option value="3">3. Beige Brown (Fall)</option>
											<option value="4">4. Olive Green (Fall)</option>
											<option value="5">5. Gold (Fall)</option>
											<option value="6">6. Blue (Fall)</option>
											<option value="7">7. Beige (Summer)</option>
										</select> : null}
							{product_shipping > 0 ? <div className="details-product-data">Shipping: ${product_shipping}</div> : null}
							<div className="details-product-data">
								{product_tags.tags.map((x,y)=><Link to={`/products/${x}`} className="details-tag" key={y}>{x}</Link>)}
							</div>
							<div>																			<Link to={`/products/${product_tags.tags[0]}`}><button>Return to Products</button></Link></div>
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