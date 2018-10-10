import React, { Component } from 'react'

class PairCard extends Component {
	render() {
		return (
			<div className="person">
				<div className="name">
					<h3>{this.props.parent}</h3>
					<input placeholder='name' onChange={(e)=>this.props.callback(this.props.n,e.target.value)}/>
				</div>
				<div className="dates">
					<div className="date-inputs">
						<input placeholder='birth date' onChange={(e)=>this.props.callback(this.props.d1,e.target.value)}/>
						<input placeholder='death date' onChange={(e)=>this.props.callback(this.props.d2,e.target.value)}/>
					</div>
				</div>
			</div>
		)
	}
}

export default PairCard
