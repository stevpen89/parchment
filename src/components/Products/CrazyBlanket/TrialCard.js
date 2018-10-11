import React, { Component } from 'react'

class TrialCard extends Component {
	constructor(){
		super()
		this.state={
		}
	}

	convertTree(arr){
		let newArr = []
		arr.map((x)=>{
			this.props.id === x.parent ? null : newArr.push(x)
		})
		return newArr
	}

	render() {

		return (
			<div>
				<div>
					<h3>{this.props.id}</h3>
					<h3>{this.props.name ? this.props.name : 'noname'}</h3>
				</div>
				<div>
 
					{
						this.props.tree ? this.props.tree.map((x)=>
						<TrialCard id={x.id} parent={x.parent} tree={this.convertTree(this.props.tree)} name={x.name}/>
						): null
					}
					
				</div>
			</div>
		)
	}
}

export default TrialCard