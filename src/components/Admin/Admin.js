import React, { Component } from 'react'
import ImageUploader from './ImageUploader'
import './Admin.css'

class Admin extends Component {
	constructor(){
		super()
		this.state={
			addEdit:'add',
			selectedType:'',
			productName:'',
			productPrice:0,
			tagName:'',
			currentTags:['bob','tuna','taryn','samich']
		}
		this.keyPress = this.keyPress.bind(this);
	}

	keyPress(e) {
		e.keyCode === 13 ? this.addToCurrentTags() : null
	}

	selectMode(val){
		this.setState({addEdit:val})
	}

	selectType(val){
		this.setState({selectedType:val})
	}

	handleName(val){
		this.setState({productName:val})
	}

	handlePrice(val){
		this.setState({productPrice:val})
	}

	handleTag(val){
		this.setState({tagName:val})
	}

	addToCurrentTags(){
		let tempTags = this.state.currentTags.slice(0)
		tempTags.push(this.state.tagName)
		this.setState({currentTags:tempTags,tagName:''})	 
	}

	// need to add methods that interact with S3 to allow for image uploads
	// these methods will return a url  that we will store in the database. 
	// watch your profamity...

	addOrEdit(){
		return this.state.addEdit === 'add'
		? 
		<div className="add-wrapper">
			<div className="type-selector-wrapper">
				<div className="type-selector-option" onClick={()=>{this.selectType('journal')}}>J</div>
				<div className="type-selector-option" onClick={()=>{this.selectType('babyblanket')}}>B</div>
				<div className="type-selector-option" onClick={()=>{this.selectType('singleblanket')}}>S</div>
				<div className="type-selector-option" onClick={()=>{this.selectType('crazyblanket')}}>C</div>
			</div>
			<div className="product-name-wrapper">
				<div className="product-name-label">
					Product Name:
				</div>
				<input className="product-name-input" onChange={e=>this.handleName(e.target.value)} placeholder="Product Name Here..."/>
			</div>
			<div className="product-name-wrapper">
				<div className="product-name-label">
					Product Price:
				</div>
				<input className="product-name-input" onChange={e=>this.handlePrice(e.target.value)} placeholder="Product Price Here..."/>
			</div>
			<div className="product-tags-wrapper">
				<div className="product-tags-label-1">
					Product Tags:
				</div>
				<input className="product-tags-input" onChange={(e)=>{this.handleTag(e.target.value)}} onKeyDown={this.keyPress} placeholder="Type Tag Here..." value={this.state.tagName} />
				<button className="product-tags-label-2" onClick={()=>this.addToCurrentTags()}>Use Tag</button>
			</div>
			<div className="current-tags">
				Current Tags: {this.state.currentTags.map(x=>` ${x} `)}
			</div>
			<div className="tag-button-wrapper">
				<div className="tag-half"> Create Tag </div>
				<div className="tag-half"> All Tags </div>
			</div>
			<div className="image-button-wrapper">
				<div className="image-half">
					Main Image 
				</div>
				<div className="image-half">
					Thumbnails 
				</div>
			</div>
		</div>
		:
		<div className="edit-wrapper">
			Edit Selected
		</div>
	}

	render() {
		return (
			<div className = "admin-wrapper">
				<div className="admin-selector-wrapper">
					<div className="admin-selector" onClick={()=>this.selectMode('add')}>ADD</div>
					<div className="admin-selector" onClick={()=>this.selectMode('edit')}>EDIT</div>
				</div>
				{this.addOrEdit()}
				<ImageUploader />
			</div>
		)
	}
}

export default Admin