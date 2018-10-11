import React, { Component } from 'react'

class CrazyCard extends Component {
	constructor(props){
		super(props)
		this.state={
			spouseToggle  : false,
			name          : this.props.name,
			birth         : this.props.birth,
			death         : this.props.death,
			sname         : this.props.sname,
			sbirth        : this.props.sbirth,
			sdeath        : this.props.sdeath
		}
	}

	addSpouse(){
		this.setState({spouseToggle:true})
	}

	deleteSpouse(){
		this.setState({spouseToggle:false,sname:null,sbirth:null,sdeath:null})

	}

	trackChanges(){}

	render() {
		return (
			<div onBlur={()=>this.props.editCard(this.props.cardId,this.state)}>
				<div>
					<button onClick={()=>{this.props.deleteCard()}}>Delete Card</button>
					<button onClick={()=>{this.addSpouse()}}>Add Spouse</button>
					<button onClick={()=>{this.deleteSpouse()}}>Delete Spouse</button>
					<button onClick={()=>{this.props.addCard()}}>Add Child</button>
				</div>
				<div>
					<div>
						<div>{this.props.card_name}</div>
						<div>{this.props.card_birth}</div>
						<div>{this.props.card_death}</div>
					</div>
					<div>
						<input onClick={(e)=>this.trackChanges(e.target.value)} placeholder="name"/>
						<input onClick={(e)=>this.trackChanges(e.target.value)} placeholder="birth year"/>
						<input onClick={(e)=>this.trackChanges(e.target.value)} placeholder="death year"/>
					</div>
				</div>
				{this.state.spouseToggle || this.props.spouse_name ? <div>
					<div>
						<div>{this.props.spouse_name}</div>
						<div>{this.props.spouse_birth}</div>
						<div>{this.props.spouse_death}</div>
					</div>
					<div>
						<input onClick={(e)=>this.trackChanges(e.target.value)} placeholder="spouse's name"/>
						<input onClick={(e)=>this.trackChanges(e.target.value)} placeholder="spouse's birth year"/>
						<input onClick={(e)=>this.trackChanges(e.target.value)} placeholder="spouse's death year"/>
					</div>
				</div>:null}
			</div>
		)
	}
}

export default CrazyCard