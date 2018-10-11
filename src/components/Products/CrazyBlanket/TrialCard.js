import React, { Component } from 'react'

class TrialCard extends Component {
	constructor(){
		super()
		this.state={}
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
						this.props.tree.map((x)=>
						<TrialCard id={x.id} parent={x.parent} tree={this.props.tree ? this.props.tree : null} name={x.name}/>
						)
					}
					
				</div>
			</div>
		)
	}
}

export default TrialCard