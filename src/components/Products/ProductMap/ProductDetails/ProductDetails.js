import React, { Component } from 'react'
import axios from 'axios';
import './ProductDetails.css'
import {Link} from 'react-router-dom'
/*eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }]*/

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
			journalCount:0,
			showDeets:false
		}
	}

	componentDidMount(){
		let tempArr = [];
		axios.get(`/products/single/${this.props.match.params.sku}`).then((res)=>{
			tempArr.push(res.data.product_image)
			res.data.product_thumbs.thumbnails.map((x)=>{return tempArr.push(x)})	
			this.setState({product:res.data,imagesArray:tempArr,selectedImage:tempArr[0]})
			if (res.data.product_type === 'print_single' || res.data.product_type === 'print_binary' || res.data.product_type === 'print_inverted')
				{this.setState({printPrices: JSON.parse(res.data.o1)})}
		})
		this.countOrders()
		
	}

	countOrders(){
		axios.post(`/products/ordercount`,{product:`%Journal%`}).then((res)=>{
			this.setState({journalCount:res.data[0].count})
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
		const {product_type} = this.state.product
		if(product_type==='blanket_single' || product_type==='blanket_binary' || product_type==='blanket_inverted'){
			switch (val) {
			case "1" : return this.setState({parameter:"dark_brown_fall"})
			case "2" : return this.setState({parameter:"grey_brown_fall"})
			case "3" : return this.setState({parameter:"beige_brown_fall"})
			case "4" : return this.setState({parameter:"olive_green_fall"})
			case "5" : return this.setState({parameter:"gold_fall"})
			case "6" : return this.setState({parameter:"blue_fall"})
			case "7" : return this.setState({parameter:"beige_summer"})
			default  : console.log('triggered default')
		}}
		else if(product_type==='print_single' || product_type==='print_binary' || product_type==='print_inverted'){
			switch (val) {
				case "1" : return this.setState({parameter:"blue_fall"})
				case "2" : return this.setState({parameter:"gold_fall"})
				case "3" : return this.setState({parameter:"grey_original_fall"})
				case "4" : return this.setState({parameter:"beige_summer"})
				case "5" : return this.setState({parameter:"olive_green_fall"})
				default  : console.log('triggered default')
		}}
		else{return null}
	}

	makeDropdown(){
		const {product_type} = this.state.product
		if(product_type==='blanket_single' || product_type==='blanket_binary' || product_type==='blanket_inverted'){
			return( 
				<select onChange={(e)=>this.selectTemplate(e.target.value)}>
					<option disabled selected value>Choose a Color</option>
					<option value="1">1. Dark Brown (Fall)</option>
					<option value="2">2. Grey Brown (Fall)</option>
					<option value="3">3. Beige Brown (Fall)</option>
					<option value="4">4. Olive Green (Fall)</option>
					<option value="5">5. Gold (Fall)</option>
					<option value="6">6. Blue (Fall)</option>
					<option value="7">7. Beige (Summer)</option>
				</select>
			)}
		else if(product_type==='print_single' || product_type==='print_binary' || product_type==='print_inverted'){
			return( 
				<select onChange={(e)=>this.selectTemplate(e.target.value)}>
					<option disabled selected value>Choose a Color</option>
					<option value="1">1. Blue (Fall)</option>
					<option value="2">2. Gold (Fall)</option>
					<option value="3">3. Grey Original (Fall)</option>
					<option value="4">4. Beige (Summer)</option>
					<option value="5">5. Olive Green (Fall)</option>
				</select>
			)}
		else{return null}
	}

	makeCustomizeNow(){
		const {product_type} = this.state.product
		if(product_type.includes('single') || product_type.includes('binary') || product_type.includes('inverted')){
			if(this.state.parameter !== ''){return <div className="details-customize-button">Customize Now</div>}
			else{
				return null
			}
		}
		else{
		if(product_type.includes('journal') && this.state.journalCount >= 485){return null}
		else{
			return <div  className="details-customize-button">Customize Now</div>
		}
	}}

	makeSelectionBorder(val){
		const {product_type} = this.state.product
		if(product_type==='blanket_single' || product_type==='blanket_binary' || product_type==='blanket_inverted'){
			if(val === this.state.selectedTemplate*1+1){
				return <div className="details-product-thumbnail-highlight"></div>
			}
		}
		else if(product_type==='print_single' || product_type==='print_binary' || product_type==='print_inverted'){
			if(val === this.state.selectedTemplate*1-1){
				return <div className="details-product-thumbnail-highlight"></div>
			}
		}
		else{return null}
	}

	detailsToggle(){
		this.setState({showDeets:!this.state.showDeets})
	}

	makeProductDescription(){
		const {product_type,product_price} = this.state.product
		if(product_type==='journal_missionary' || product_type==='journal_everyday'){
			return(
			<div className="details-message">
				<button className="hide-details" onClick={()=>this.detailsToggle()}>Hide Details...</button>
				<p id="message-text">	Dimensions: 5.5” x 8”</p>
				<p id="message-text">	Pages: 240 Lined</p>
				<p id="message-text">	Ready to ship in 5-7 business days</p>
			</div>)
		}
		else if(product_type==='blanket_holiday'){
			return(
			<div className="details-message">
				<button className="hide-details" onClick={()=>this.detailsToggle()}>Hide Details...</button>
				<p id="message-text">	Our custom holiday blankets make the perfect personalized
						gift for Christmas. Fabric is 100% polyester
						minky fabric with an extremely soft feel. Blankets are made with
						special color-fast technology that helps the dye last through repeated
						washings.</p>
				<p id="message-text">	{product_price === 59.99 ? 'Size: 30” x 40”': 'Size: 50" x 60"'}</p>
				<p id="message-text">	After you have placed your order there is a 3-8 day turn around
						production time before shipping.
						You will be notified once your purchase has shipped.</p>
				<p id="message-text">	PLEASE NOTE: After you have submitted your order we are
						not liable for any mistakes in spelling, punctuation, capitalization
						or grammatical errors.
						All sales are final on personalized products. Thank you!</p>
			</div>)
		}
		else if(product_type==='blanket_single' || product_type==='blanket_binary' || product_type==='blanket_inverted'){
			return(
			<div className="details-message">
				<button className="hide-details" onClick={()=>this.detailsToggle()}>Hide Details...</button>
				<p id="message-text">	Our custom family history blankets make the perfect personalized
						gift for weddings, birthdays, and anniversaries. Fabric is 100% polyester
						minky fabric with an extremely soft feel. Blankets are made with
						special color-fast technology that helps the dye last through repeated
						washings. Available colors shown in listing photos.</p>
				<p id="message-text">	Size: 50” x 60”</p>
				<p id="message-text">	After you place your order, you will receive an email with a
						digital proof of your family tree in 2-4 days.
						After you have approved the proof there is a 3-8 day turn around
						production time before shipping.
						You will be notified once your purchase has shipped.</p>
				<p id="message-text">	PLEASE NOTE: After you have approved the digital proof we are
						not liable for any mistakes in spelling, punctuation, capitalization
						or grammatical errors.
						All sales are final on personalized products. Thank you!</p>
			</div>)
		}
		else if(product_type==='print_single' || product_type==='print_binary' || product_type==='print_inverted'){
			return(
			<div className="details-message">
				<button className="hide-details" onClick={()=>this.detailsToggle()}>Hide Details...</button>
				<p id="message-text">	Our custom family history prints make the perfect personalized
						gift for weddings, birthdays, and anniversaries. Printed on museum-quality
						posters made on thick, durable, matte paper. A statement in any room.
						These are printed on archival, acid-free paper.
						Available colors shown in listing photos.</p>
				<p id="message-text">	After you place your order, you will receive an email with a
						digital proof of your family tree in 2-4 days.
						After you have approved the proof there is a 3-8 day turn around
						production time before shipping.
						You will be notified once your purchase has shipped.</p>
				<p id="message-text">	PLEASE NOTE: After you have approved the digital proof we are
						not liable for any mistakes in spelling, punctuation, capitalization
						or grammatical errors.
						All sales are final on personalized products. Thank you!</p>
			</div>)
		}

		else{
			return null
		}
	}

	render(){
		const { product_name, product_thumbs, product_sku, product_desc, product_price, product_sale, product_shipping, product_tags } = this.state.product
		const { normal8x10, normal12x18, normal16x20, normal18x24, normal24x36, sale8x10, sale12x18, sale16x20, sale18x24, sale24x36 } = this.state.printPrices;
		const {product_type} = this.state.product
		// if(product_type){this.state.journalCount >= 485 && product_type.includes('journal') ? alert('Journals Are Currently Out of Stock, Please Check Back Later') : null}

		return (
			<div className="content">
				<div className="details">
					<div className="details-left-side">
						<div className="details-image-container" style={{backgroundImage: `url(${this.state.selectedImage})`, backgroundSize: `contain`, backgroundPosition: `center`, backgroundRepeat:'no-repeat'}}></div>
						<div className="details-thumbnail-wrapper">
							{this.state.imagesArray ? this.state.imagesArray.map((x,y)=>
								<div onClick={()=>this.selectImage(x)} id="details-product-thumbnail" 
								key={y} style={{backgroundImage: `url(${x})`, 
								backgroundSize: `contain`, backgroundPosition: `center`, backgroundRepeat:'no-repeat'}}> 
									{this.makeSelectionBorder(y)}
								</div>) 
								: null}
						</div>
					</div>
					<div className="product-information">
						{product_thumbs ? 
						<div>
							<div><h1>{product_name}</h1></div>
							<div><a>{product_desc}</a></div>
							{/* { Object.keys(this.state.printPrices).length === 0 && this.state.printPrices.constructor === Object ? 
									<div>
										<div className={product_sale ? 'strikeout' : ''}>Price: ${product_price}</div>
										{product_sale ? <div><a>Sale Price: ${product_sale}</a></div> : null}
									</div>
								:
									<div>
										<div><a>8 X 10 - </a><a class={sale8x10  ? `strikeout` : ``}>Price: ${normal8x10}</a>{sale8x10 ? <a>, Sale Price: {sale8x10}</a> : null}</div>
										<div><a>12 X 18 - </a><a class={sale12x18 ? `strikeout` : ``}>Price: ${normal12x18}</a>{sale12x18 ? <a>, Sale Price: {sale12x18}</a> : null}</div>
										<div><a>16 X 20 - </a><a class={sale16x20 ? `strikeout` : ``}>Price: ${normal16x20}</a>{sale16x20 ? <a>, Sale Price: {sale16x20}</a> : null}</div>
										<div><a>18 X 24 - </a><a class={sale18x24 ? `strikeout` : ``}>Price: ${normal18x24}</a>{sale18x24 ? <a>, Sale Price: {sale18x24}</a> : null}</div>
										<div><a>24 X 36 - </a><a class={sale24x36 ? `strikeout` : ``}>Price: ${normal24x36}</a>{sale24x36 ? <a>, Sale Price: {sale24x36}</a> : null}</div>
									</div>
							} */}
							{/* <div><a>SKU: {product_sku}</a></div> */}
							{this.state.showDeets ? this.makeProductDescription() : <div className="details-customize-button" onClick={()=>this.detailsToggle()}>Show Details</div>}
							{this.makeDropdown()}
							{product_shipping > 0 ? <div>Shipping: ${product_shipping}</div> : null}
							{/* <div>
								{product_tags.tags.map((x,y)=><Link to={`/products/${x}`} className="details-tag" key={y}>{x}</Link>)}
							</div>    ---   Jana Says she doesn't want the tags rendering on this page, even though I think they are dope   ---   */}
							<div className="customize-link-wrapper">
								<Link className="customize-link" to={ this.editorSwitch() }>
									{this.makeCustomizeNow()}
								</Link>
							</div>
							<div><Link to={`/products/${product_tags.tags[0]}`}><button className="return-to-products"><i class="fas fa-caret-left"></i>  Return to Products</button></Link></div>
						</div>
						: null}
					</div>
				</div>
			</div>
		)
	}
}

export default ProductDetails