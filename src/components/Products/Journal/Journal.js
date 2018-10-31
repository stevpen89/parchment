import React, { Component } from 'react';
import './Journal.css';
import axios from 'axios';

class Journal extends Component {
	constructor () {
		super()
		this.state = {
		}
	}

	componentDidMount () {
		axios.get(`/products/${this.props.match.params.sku}`).then((res)=>{
			this.setState({inputs: JSON.parse(res.data[0].o1)})
		})
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