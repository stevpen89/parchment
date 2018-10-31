import React, { Component } from 'react';
import './Journal.css';
import axios from 'axios';

class Journal extends Component {
	constructor () {
		super()
		this.state = {
			product:{},
			input1:'',
			input2:'',
			input3:'',
			input4:'',
			input5:'',
		}
	}

	componentDidMount () {
		axios.get(`/products/${this.props.match.params.sku}`).then((res)=>{
			this.setState({product:res.data})
			console.log(this.state.product.o1)
		})
	}

	handleChange(target,val){
		this.setState({[target]:val})

	}

	inputMaker(){

	}

	render() {
		return (
			<div className="content">
        		This is the journal customizer.
			</div>
		)
	}
}

export default Journal