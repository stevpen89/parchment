import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setProducts } from '../../../ducks/products';
import './Filters.css'
import axios from 'axios';

class Filters extends Component {
	constructor(){
		super()
		this.state={
			tagInput   : '',
			tags       : [],
			tagWarning : false												
		}
		this.handleInput = this.handleInput.bind(this);
		this.getProducts = this.getProducts.bind(this);
		this.routeChange = this.routeChange.bind(this);
		this.addTag      = this.addTag.bind(this);
		this.deleteTag   = this.deleteTag.bind(this);
		this.clearTags   = this.clearTags.bind(this);
		this.keyPress    = this.keyPress.bind(this);
	}

	componentDidMount () {
		if (this.props.match.params.type === undefined) {
			axios.get(`/products`).then((res)=>{
				this.props.setProducts(res.data)
			})
		}
		else {this.updateTags();}
	}

  componentWillMount() {
	  this.routeChange();
	}
	
  componentWillUnmount() {
      this.unlisten();
  }

  getProducts (tags) {
    let tempTags = tags.slice(0);
		let percentified = tempTags.map(x => `%${x}%`);
		let fillTags = () => {
			if (percentified.length < 10) {
				percentified.push('%%');
				fillTags();
			}
		}
    fillTags();
		axios.put('/products/search', {tags: percentified}).then(res => {
			let data = res.data
			let stringData = JSON.stringify(data)
			if(stringData.includes("journal_missionary")){			
				axios.put('/products/search', {tags: ["%generic%", "%%", "%%", "%%", "%%", "%%", "%%", "%%", "%%", "%%"]}).then(res => {
					res.data.map((x)=>{data.push(x)})})
					// this.props.setProducts(data)
				}
			else{			
				console.log("it didn't work ya poop") }
			let poop = [
				{
					"product_sku": 6,
					"product_name": "Barbados Outline Journal",
					"product_tags": {
						"tags": [
							"journal",
							"leather",
							"missionary",
							"country",
							"barbados",
							"outline",
							"map",
							"world"
						]
					},
					"product_image": "https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_country_outline/Barbados.jpg",
					"product_thumbs": {
						"thumbnails": [
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Standing_Journal_Photo.jpg",
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Open_Journal_Photo.jpg"
						]
					},
					"product_desc": "Personalized Missionary Journal",
					"product_type": "journal_missionary",
					"product_price": 38.99,
					"product_sale": 29.99,
					"product_shipping": 3.99,
					"o1": "[\"name\",\"mission\",\"service dates\",\"scripture\"]"
				},
				{
					"product_sku": 208,
					"product_name": "Complete World Map Outline Journal",
					"product_tags": {
						"tags": [
							"journal",
							"generic",
							"state",
							"floral",
							"scenic",
							"service",
							"leather",
							"missionary",
							"country",
							"complete world map",
							"outline",
							"map",
							"world",
							"globe"
						]
					},
					"product_image": "https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_mission_generic/Complete_World_Map.jpg",
					"product_thumbs": {
						"thumbnails": [
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Standing_Journal_Photo.jpg",
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Open_Journal_Photo.jpg"
						]
					},
					"product_desc": "Personalized Missionary Journal",
					"product_type": "journal_everyday",
					"product_price": 38.99,
					"product_sale": 29.99,
					"product_shipping": 3.99,
					"o1": "[\"name\",\"mission\",\"service dates\",\"scripture\"]"
				},
				{
					"product_sku": 209,
					"product_name": "Footsteps Outline Journal",
					"product_tags": {
						"tags": [
							"journal",
							"generic",
							"state",
							"floral",
							"scenic",
							"service",
							"leather",
							"missionary",
							"country",
							"footsteps",
							"feet",
							"shoes",
							"path",
							"outline",
							"map",
							"world"
						]
					},
					"product_image": "https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_mission_generic/Footsteps.jpg",
					"product_thumbs": {
						"thumbnails": [
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Standing_Journal_Photo.jpg",
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Open_Journal_Photo.jpg"
						]
					},
					"product_desc": "Personalized Missionary Journal",
					"product_type": "journal_everyday",
					"product_price": 38.99,
					"product_sale": 29.99,
					"product_shipping": 3.99,
					"o1": "[\"name\",\"mission\",\"service dates\",\"scripture\"]"
				},
				{
					"product_sku": 210,
					"product_name": "Name Tag Elder Outline Journal",
					"product_tags": {
						"tags": [
							"journal",
							"generic",
							"state",
							"floral",
							"scenic",
							"service",
							"leather",
							"missionary",
							"country",
							"name tag elder",
							"shirt",
							"boys",
							"elders",
							"tie",
							"suit",
							"tag",
							"priesthood",
							"outline",
							"map",
							"world"
						]
					},
					"product_image": "https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_mission_generic/Name_Tag_Elder.jpg",
					"product_thumbs": {
						"thumbnails": [
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Standing_Journal_Photo.jpg",
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Open_Journal_Photo.jpg"
						]
					},
					"product_desc": "Personalized Missionary Journal",
					"product_type": "journal_everyday",
					"product_price": 38.99,
					"product_sale": 29.99,
					"product_shipping": 3.99,
					"o1": "[\"name\",\"mission\",\"service dates\",\"scripture\"]"
				},
				{
					"product_sku": 211,
					"product_name": "Name Tag Sister Outline Journal",
					"product_tags": {
						"tags": [
							"journal",
							"generic",
							"state",
							"floral",
							"scenic",
							"service",
							"leather",
							"missionary",
							"country",
							"name tag sister",
							"blouse",
							"skirt",
							"sister",
							"tag",
							"mission",
							"outline",
							"map",
							"world"
						]
					},
					"product_image": "https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_mission_generic/Name_Tag_Sister.jpg",
					"product_thumbs": {
						"thumbnails": [
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Standing_Journal_Photo.jpg",
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Open_Journal_Photo.jpg"
						]
					},
					"product_desc": "Personalized Missionary Journal",
					"product_type": "journal_everyday",
					"product_price": 38.99,
					"product_sale": 29.99,
					"product_shipping": 3.99,
					"o1": "[\"name\",\"mission\",\"service dates\",\"scripture\"]"
				},
				{
					"product_sku": 212,
					"product_name": "Name Tag With Scripture Outline Journal",
					"product_tags": {
						"tags": [
							"journal",
							"generic",
							"state",
							"floral",
							"scenic",
							"service",
							"leather",
							"missionary",
							"country",
							"name tag with scripture",
							"plain",
							"simple",
							"mission",
							"elder",
							"sister",
							"outline",
							"map",
							"world"
						]
					},
					"product_image": "https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_mission_generic/Name_Tag_With_Scripture.jpg",
					"product_thumbs": {
						"thumbnails": [
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Standing_Journal_Photo.jpg",
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Open_Journal_Photo.jpg"
						]
					},
					"product_desc": "Personalized Missionary Journal",
					"product_type": "journal_everyday",
					"product_price": 38.99,
					"product_sale": 29.99,
					"product_shipping": 3.99,
					"o1": "[\"name\",\"mission\",\"service dates\",\"scripture\"]"
				},
				{
					"product_sku": 213,
					"product_name": "Preach The Gospel Outline Journal",
					"product_tags": {
						"tags": [
							"journal",
							"generic",
							"state",
							"floral",
							"scenic",
							"service",
							"leather",
							"missionary",
							"country",
							"preach the gospel",
							"preach",
							"duty",
							"important",
							"work",
							"outline",
							"map",
							"world"
						]
					},
					"product_image": "https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_mission_generic/Preach_The_Gospel.jpg",
					"product_thumbs": {
						"thumbnails": [
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Standing_Journal_Photo.jpg",
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Open_Journal_Photo.jpg"
						]
					},
					"product_desc": "Personalized Missionary Journal",
					"product_type": "journal_everyday",
					"product_price": 38.99,
					"product_sale": 29.99,
					"product_shipping": 3.99,
					"o1": "[\"name\",\"mission\",\"service dates\",\"scripture\"]"
				},
				{
					"product_sku": 214,
					"product_name": "Salt Lake Temple Outline Journal",
					"product_tags": {
						"tags": [
							"journal",
							"generic",
							"state",
							"floral",
							"scenic",
							"service",
							"leather",
							"missionary",
							"country",
							"salt lake temple",
							"salt",
							"lake",
							"city",
							"temple",
							"utah",
							"outline",
							"map",
							"world"
						]
					},
					"product_image": "https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_mission_generic/Salt_Lake_Temple.jpg",
					"product_thumbs": {
						"thumbnails": [
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Standing_Journal_Photo.jpg",
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Open_Journal_Photo.jpg"
						]
					},
					"product_desc": "Personalized Missionary Journal",
					"product_type": "journal_everyday",
					"product_price": 38.99,
					"product_sale": 29.99,
					"product_shipping": 3.99,
					"o1": "[\"name\",\"mission\",\"service dates\",\"scripture\"]"
				},
				{
					"product_sku": 215,
					"product_name": "Shepherd Outline Journal",
					"product_tags": {
						"tags": [
							"journal",
							"generic",
							"state",
							"floral",
							"scenic",
							"service",
							"leather",
							"missionary",
							"country",
							"shepherd",
							"sheep",
							"crook",
							"staff",
							"hand",
							"flock",
							"fold",
							"scripture",
							"outline",
							"map",
							"world"
						]
					},
					"product_image": "https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_mission_generic/Shepherd.jpg",
					"product_thumbs": {
						"thumbnails": [
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Standing_Journal_Photo.jpg",
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Open_Journal_Photo.jpg"
						]
					},
					"product_desc": "Personalized Missionary Journal",
					"product_type": "journal_everyday",
					"product_price": 38.99,
					"product_sale": 29.99,
					"product_shipping": 3.99,
					"o1": "[\"name\",\"mission\",\"service dates\",\"scripture\"]"
				},
				{
					"product_sku": 216,
					"product_name": "Tree Outline Journal",
					"product_tags": {
						"tags": [
							"journal",
							"generic",
							"state",
							"floral",
							"scenic",
							"service",
							"leather",
							"missionary",
							"country",
							"tree",
							"path",
							"life",
							"commence",
							"rod",
							"iron",
							"outline",
							"map",
							"world"
						]
					},
					"product_image": "https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_mission_generic/Tree.jpg",
					"product_thumbs": {
						"thumbnails": [
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Standing_Journal_Photo.jpg",
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Open_Journal_Photo.jpg"
						]
					},
					"product_desc": "Personalized Missionary Journal",
					"product_type": "journal_everyday",
					"product_price": 38.99,
					"product_sale": 29.99,
					"product_shipping": 3.99,
					"o1": "[\"name\",\"mission\",\"service dates\",\"scripture\"]"
				},
				{
					"product_sku": 217,
					"product_name": "World Map Country Outlines Outline Journal",
					"product_tags": {
						"tags": [
							"journal",
							"generic",
							"state",
							"floral",
							"scenic",
							"service",
							"leather",
							"missionary",
							"country",
							"world map country outlines",
							"globe",
							"international",
							"earth",
							"world",
							"big",
							"outline",
							"map",
							"world"
						]
					},
					"product_image": "https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_mission_generic/World_Map_Country_Outlines.jpg",
					"product_thumbs": {
						"thumbnails": [
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Standing_Journal_Photo.jpg",
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Open_Journal_Photo.jpg"
						]
					},
					"product_desc": "Personalized Missionary Journal",
					"product_type": "journal_everyday",
					"product_price": 38.99,
					"product_sale": 29.99,
					"product_shipping": 3.99,
					"o1": "[\"name\",\"mission\",\"service dates\",\"scripture\"]"
				},
				{
					"product_sku": 218,
					"product_name": "World Map Silhouette Outline Journal",
					"product_tags": {
						"tags": [
							"journal",
							"generic",
							"state",
							"floral",
							"scenic",
							"service",
							"leather",
							"missionary",
							"country",
							"world map silhouette",
							"globe",
							"international",
							"earth",
							"world",
							"big",
							"outline",
							"map",
							"world"
						]
					},
					"product_image": "https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_mission_generic/World_Map_Silhouette.jpg",
					"product_thumbs": {
						"thumbnails": [
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Standing_Journal_Photo.jpg",
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Open_Journal_Photo.jpg"
						]
					},
					"product_desc": "Personalized Missionary Journal",
					"product_type": "journal_everyday",
					"product_price": 38.99,
					"product_sale": 29.99,
					"product_shipping": 3.99,
					"o1": "[\"name\",\"mission\",\"service dates\",\"scripture\"]"
				},
				{
					"product_sku": 219,
					"product_name": "Wreath 1 Outline Journal",
					"product_tags": {
						"tags": [
							"journal",
							"generic",
							"state",
							"floral",
							"scenic",
							"service",
							"leather",
							"missionary",
							"country",
							"wreath 1",
							"leaves",
							"wreath",
							"nature",
							"christmas",
							"symbolic",
							"outline",
							"map",
							"world"
						]
					},
					"product_image": "https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_mission_generic/Wreath_1.jpg",
					"product_thumbs": {
						"thumbnails": [
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Standing_Journal_Photo.jpg",
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Open_Journal_Photo.jpg"
						]
					},
					"product_desc": "Personalized Missionary Journal",
					"product_type": "journal_everyday",
					"product_price": 38.99,
					"product_sale": 29.99,
					"product_shipping": 3.99,
					"o1": "[\"name\",\"mission\",\"service dates\",\"scripture\"]"
				},
				{
					"product_sku": 220,
					"product_name": "Wreath 2 Outline Journal",
					"product_tags": {
						"tags": [
							"journal",
							"generic",
							"state",
							"floral",
							"scenic",
							"service",
							"leather",
							"missionary",
							"country",
							"wreath 2",
							"leaves",
							"wreath",
							"nature",
							"christmas",
							"symbolic",
							"outline",
							"map",
							"world"
						]
					},
					"product_image": "https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_mission_generic/Wreath_2.jpg",
					"product_thumbs": {
						"thumbnails": [
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Standing_Journal_Photo.jpg",
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Open_Journal_Photo.jpg"
						]
					},
					"product_desc": "Personalized Missionary Journal",
					"product_type": "journal_everyday",
					"product_price": 38.99,
					"product_sale": 29.99,
					"product_shipping": 3.99,
					"o1": "[\"name\",\"mission\",\"service dates\",\"scripture\"]"
				},
				{
					"product_sku": 221,
					"product_name": "Wreath 3 Outline Journal",
					"product_tags": {
						"tags": [
							"journal",
							"generic",
							"state",
							"floral",
							"scenic",
							"service",
							"leather",
							"missionary",
							"country",
							"wreath 3",
							"leaves",
							"wreath",
							"nature",
							"christmas",
							"symbolic",
							"outline",
							"map",
							"world"
						]
					},
					"product_image": "https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_mission_generic/Wreath_3.jpg",
					"product_thumbs": {
						"thumbnails": [
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Standing_Journal_Photo.jpg",
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Open_Journal_Photo.jpg"
						]
					},
					"product_desc": "Personalized Missionary Journal",
					"product_type": "journal_everyday",
					"product_price": 38.99,
					"product_sale": 29.99,
					"product_shipping": 3.99,
					"o1": "[\"name\",\"mission\",\"service dates\",\"scripture\"]"
				},
				{
					"product_sku": 222,
					"product_name": "Wreath 4 Outline Journal",
					"product_tags": {
						"tags": [
							"journal",
							"generic",
							"state",
							"floral",
							"scenic",
							"service",
							"leather",
							"missionary",
							"country",
							"wreath 4",
							"leaves",
							"wreath",
							"nature",
							"christmas",
							"symbolic",
							"outline",
							"map",
							"world"
						]
					},
					"product_image": "https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_mission_generic/Wreath_4.jpg",
					"product_thumbs": {
						"thumbnails": [
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Standing_Journal_Photo.jpg",
							"https://s3-us-west-1.amazonaws.com/parchmentgoods/product-images/journal_thumbnails/Open_Journal_Photo.jpg"
						]
					},
					"product_desc": "Personalized Missionary Journal",
					"product_type": "journal_everyday",
					"product_price": 38.99,
					"product_sale": 29.99,
					"product_shipping": 3.99,
					"o1": "[\"name\",\"mission\",\"service dates\",\"scripture\"]"
				}
			]
			// this.props.setProducts(data)
			console.log("Final Log of Data:",data)
		})
	}

  routeChange () {
    let historyArr = []
    this.unlisten = this.props.history.listen((location, action) => {
			historyArr = location.pathname.split('/')
			if (historyArr[historyArr.length - 1] !== 'products') {
				historyArr.splice(0, 2);
        this.setState({tags: historyArr})
        this.getProducts(historyArr)
			}
			else {
        this.setState({tags: []})
        this.getProducts([])
			}
    });
  }

	updateTags () {
		let historyArr = this.props.location.pathname.split('/')
			if (historyArr[historyArr.length - 1] !== 'products') {
				historyArr.splice(0, 2);
        this.setState({tags: historyArr})
        this.getProducts(historyArr)
			}
			else {
        this.setState({tags: []})
        this.getProducts([])
			}
	}

	keyPress(e) {
		if (e.keyCode === 13) {this.addTag()}
	}	

	handleInput (val) {
		this.setState({tagInput: val});
	}

	addTag () {
		let tempTags = this.state.tags.slice(0)
		let inputArr = this.state.tagInput.toLowerCase().split(/[ ,]+/)
		if (inputArr.length + this.state.tags.length <= 10 && this.state.tagInput !== '') {
			inputArr.map(x=>tempTags.push(x))
      this.setState({tags:tempTags, tagInput: '', tagWarning: false});
      this.getProducts(tempTags)
		}
		else if (this.state.tagInput === '') {return null}
		else {
			this.setState({tagWarning: true});
    }
	}

	deleteTag (index) {
		let tempTags=this.state.tags.slice(0)
		tempTags.splice(index, 1)
    this.setState({tags:tempTags})
    this.getProducts(tempTags)
	}

	clearTags () {
    this.setState({tags: [], tagInput: '', tagWarning: false})
    this.getProducts([])
	}

	render() {
		const { tags, tagInput, tagWarning } = this.state;
		const { handleInput, addTag, deleteTag, clearTags } = this;

		return (
			<div>
				{/* <div className="products-banner"></div> */}

				<div className="filter-area">
					<div className="search-area">
						<input className="tag-input" onChange={(e) => handleInput(e.target.value)} value={tagInput} onKeyDown={this.keyPress} placeholder="Search with tags"/>
						<button onClick={() => addTag()} className="add-tags-button"><i className="fas fa-tags"></i> Add Tag</button>
						<button onClick={() => clearTags()} className="clear-tags-button"><i className="fas fa-backspace"></i></button>
					</div>
					<div className="tag-wrapper">
						{tags.map((x,y)=>
							<div className="tag" key={y}><a>{x}</a><button onClick={() => deleteTag(y)} id="addButton">x</button></div>
						)}
						{tagWarning ? <a>No more than 10 tags can be searched at one time, please refine your search.</a> : null}
					</div>
				</div>

			</div>
		)
	}
}

export default withRouter ( connect ( null, { setProducts } )(Filters) );