import React, { Component } from 'react'
import './Admin.css'

class Admin extends Component {
	constructor(){
		super()
		this.state={
			selected:'add'
		}
	}

	selectMode(val){
		this.setState({selected:val})
	}

	addOrEdit(){
		return this.state.selected === 'add'
		? 
		<div className="add-wrapper">
			<div className="type-selector-wrapper">
				<div className="type-selector-option">J</div>
				<div className="type-selector-option">B</div>
				<div className="type-selector-option">S</div>
				<div className="type-selector-option">C</div>
			</div>
			<div className="product-name-wrapper">
			<div className="product-name-label">Product Name:</div>
				<input className="product-name-input" placeholder="Product Name Here..."/>
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
			</div>
		)
	}
}

export default Admin