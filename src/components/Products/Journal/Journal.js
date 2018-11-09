import React, { Component } from 'react';
import './Journal.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { setCart } from '../../../ducks/products'

class Journal extends Component {
	constructor () {
		super()
		this.state = {
			product:{},
			inputArr:[],
			values:{},
		}
	}

	componentDidMount () {
		axios.get(`/products/single/${this.props.match.params.sku}`).then((res)=>{
      this.setState({inputArr: JSON.parse(res.data.o1), product: res.data});
		})
	}

	handleChange(target,val){
		this.setState({[target]:val})
	}

	inputMaker(){
		return (
    <div className="journal-input">
      <input placeholder=""/>
    </div>      
		)
	}

	updateInputArr (key, value) {
		let tempValues = Object.assign({}, this.state.values)
		tempValues[key] = value;
		this.setState({values: tempValues})
	}

	writeToSession () {
		axios.post('/products/addtocart', 
			{details: this.state.product, info: this.state.values}
		).then((res) => {
				this.props.setCart(res.data);
				this.props.history.go(-2);
			}
		)
	}

	render() {
		const {inputArr} = this.state
		return (
      <div className="content">
				<div className="journal-inputs">
					{inputArr.map((x, i) => {
						return (
							<div className="journal-input-divs">
								<div class="journal-input-name">
									<a>{x} </a>
								</div>
								<div>
									<input onChange={(e) => this.handleChange(`input${i+1}`, e.target.value)} onBlur={(e) => this.updateInputArr(x, e.target.value)}/>	
								</div>
							</div>
						)
					})}
					<button onClick={() => this.writeToSession()}>Add to Cart</button>
				</div>
      </div>
		)
	}
}

export default withRouter ( connect ( null, { setCart } )( Journal ) );