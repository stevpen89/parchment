import React, { Component } from 'react'

class TrialCard extends Component {
	constructor(props){
		super(props)
		this.state={
			card_id      : props.card_id,
			card_name    : props.card_name,
			card_birth   : props.card_birth,
			card_death   : props.card_death,
			spouse_added : props.spouse_added,
			spouse_name  : props.spouse_name,
			spouse_birth : props.spouse_birth,
			spouse_death : props.spouse_death
		}
	}

	handleInput(val,target){
		this.setState({[target]:val})
	}

	editingCard(){
		this.setState({spouseToggle:true})
	}

	render() {
		const {card_name, card_birth, card_death, spouse_added, spouse_name, spouse_birth, spouse_death} = this.state
		const {card_id, addChild, editCard, deleteCard} = this.props
		return (
			<div style={{padding:"10px 0 0 40px", background:"rgba(0,50,25,.2)"}}>
				<div>
					<div>
						<button onClick={()=>addChild(card_id)}>Add Child</button>
						<button onClick={()=>{this.setState({spouse_added: true});  editCard(true, this.state)}}>Add Spouse</button>
						<button onClick={()=>{this.setState({spouse_added: false}); editCard(false, this.state)}}>Delete Spouse</button>
						<button onClick={()=>deleteCard(card_id)}>Delete Card</button>
					</div>
					<div>
						<input onChange={(e)=>this.handleInput(e.target.value,'card_name')}  onBlur={() => editCard(spouse_added, this.state)} placeholder="name" value={card_name}/>
						<input onChange={(e)=>this.handleInput(e.target.value,'card_birth')} onBlur={() => editCard(spouse_added, this.state)} placeholder="birth" value={card_birth}/>
						<input onChange={(e)=>this.handleInput(e.target.value,'card_death')} onBlur={() => editCard(spouse_added, this.state)} placeholder="death" value={card_death}/>
					</div>
					{spouse_added ? <div>
						<input onChange={(e)=>this.handleInput(e.target.value,'spouse_name')}  onBlur={() => editCard(spouse_added, this.state)} placeholder="spouse name" value={spouse_name}/>
						<input onChange={(e)=>this.handleInput(e.target.value,'spouse_birth')} onBlur={() => editCard(spouse_added, this.state)} placeholder="spouse birth" value={spouse_birth}/>
						<input onChange={(e)=>this.handleInput(e.target.value,'spouse_death')} onBlur={() => editCard(spouse_added, this.state)} placeholder="spouse death" value={spouse_death}/>
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