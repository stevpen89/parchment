import React, { Component } from 'react'

class SingleCard extends Component {
	render() {
		const {valn,vald1,vald2,n,d1,d2,callback,parent} = this.props
		return (
			<div className="person">
				<div className="name">
					<h3>{parent ? parent : null}</h3>
					<input placeholder='name'	value={valn} onChange={(e)=>callback(n,e.target.value)}/>
				</div>
				<div className="dates">
					<div className="date-inputs">
						<input placeholder='birth date' value={vald1} onChange={(e)=>callback(d1,e.target.value)}/>
						<input placeholder='death date' value={vald2} onChange={(e)=>callback(d2,e.target.value)}/>
					</div>
				</div>
			</div>
		)
	}
}

export default SingleCard
