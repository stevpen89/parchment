import React, { Component } from 'react';
import './Journal.css';
import axios from 'axios';

class Journal extends Component {
	constructor () {
		super()
		this.state = {
			product:{},
			loaded:false,
			input1:'',
			input2:'',
			input3:'',
			input4:'',
			input5:'',
		}
	}

	componentDidMount () {
		axios.get(`/products/${this.props.match.params.sku}`).then((res)=>{
			this.setState({loaded:true, product:res.data})
		})
	}

	handleChange(target,val){
		this.setState({[target]:val})
		console.log(this.state)

	}


	render() {
		const {product_image,o1} = this.state.product
		return (
			<div className="journal-content">
				<div className="journal-image-holder">
					<div style={{background: `url(${product_image}) center`, backgroundSize: `cover`}} className="journal-image"></div>
				</div>
				<div className="journal-right-menu">
				{this.state.loaded ? JSON.parse(o1).map((x,y)=>{return <div className="journal-input-holder" key={y}>{x}<input onChange={(e)=>{this.handleChange(`input${y+1}`,e.target.value)}}/></div>}) : <div> Loaded = False</div>}
				</div>
			</div>
		)
	}
}

export default Journal