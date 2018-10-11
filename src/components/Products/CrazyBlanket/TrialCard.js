import React, { Component } from 'react'

class TrialCard extends Component {
	constructor(props){
		super(props)
		this.state={
			spouseToggle :false,
			card_name    : props.card_name,
			card_birth   : props.card_birth,
			card_death   : props.card_death,
			spouse_name  : props.spouse_name,
			spouse_birth : props.spouse_birth,
			spouse_death : props.spouse_death
		}
	}

	handleInput(val,target){
		this.setState({[target]:val})
	}

	addSpouse(){
		this.setState({spouseToggle:true})
	}

	deleteSpouse(){
		this.setState({spouseToggle:false})
		//this nulls the spouse fields as the toggle closes.
	}


	render() {
		const {card_name, card_birth, card_death, spouse_name, spouse_birth, spouse_death} = this.state
		return (
			<div style={{padding:"10px 0 0 40px", background:"rgba(0,50,25,.2)"}}>
				<div>
					<div>
						<button onClick={()=>this.props.addChild(this.props.parent_id,this.state)}>Add Child</button>
						<button onClick={()=>this.addSpouse()}>Add Spouse</button>
						<button onClick={()=>this.deleteSpouse()}>Delete Spouse</button>
						<button onClick={()=>this.props.deleteCard()}>Delete Card</button>
					</div>
					<div>
						<input onChange={(e)=>this.handleInput(e.target.value,'card_name')} placeholder="name" value={card_name}/>
						<input onChange={(e)=>this.handleInput(e.target.value,'card_birth')} placeholder="birth" value={card_birth}/>
						<input onChange={(e)=>this.handleInput(e.target.value,'card_death')} placeholder="death" value={card_death}/>
					</div>
					{this.state.spouseToggle ? <div>
						<input onChange={(e)=>this.handleInput(e.target.value,'spouse_name')} placeholder="spouse name" value={spouse_name}/>
						<input onChange={(e)=>this.handleInput(e.target.value,'spouse_birth')} placeholder="spouse birth" value={spouse_birth}/>
						<input onChange={(e)=>this.handleInput(e.target.value,'spouse_death')} placeholder="spouse death" value={spouse_death}/>
					</div> : null}
				</div>
					
				{this.props.tree ? 
				this.props.tree.map((x)=>{
					return x.parent_id === this.props.card_id ?
					<TrialCard tree={this.props.tree} {...x} key={x.card_id} addChild={this.props.addChild} editCard={this.props.editCard} deleteCard={this.props.deleteCard}/>:
					null
				}): 
				null
			}
			</div>
		)
	}
}

export default TrialCard