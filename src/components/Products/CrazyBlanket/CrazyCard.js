import React, { Component } from 'react'
import './CrazyCard.css'

class CrazyCard extends Component {
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
			spouse_death : props.spouse_death,
			depth        : props.depth,
			firstOrLast  : 'single'
		}
		this.firstOrLast = this.firstOrLast.bind(this);
	}

	componentDidMount() {this.firstOrLast()}

	firstOrLast () {
		const {duplicates, parent_id, cardIndex} = this.props

		if (duplicates[parent_id]) {
			this.setState({firstOrLast: 'middle'})
			cardIndex === duplicates[parent_id][0] ? this.setState({firstOrLast: 'first'}) : null;
			cardIndex === duplicates[parent_id][duplicates[parent_id].length-1] ? this.setState({firstOrLast: 'last'}) : null;
		}
	}

	handleInput(val,target){
		this.setState({[target]:val})
	}

	editingCard(){
		this.setState({spouseToggle:true})
	}

	render() {
		const {card_name, card_birth, card_death, spouse_added, spouse_name, spouse_birth, spouse_death, depth} = this.state
		const {card_id, addChild, editCard, deleteCard} = this.props
		return (
			<div className="crazy-card">
				<div className="crazy-card-wrapper">
					<div className="card-spacer">
						<div className="card-line" style={{width: `${depth * 50}px`}}></div>
					</div>
					<div className="crazy-card-content">
						<div>
							<button onClick={()=>addChild(card_id)}>Add Child</button>
							<button onClick={()=>{this.setState({spouse_added: true});  editCard(true, this.state)}}>Add Spouse</button>
							<button onClick={()=>{this.setState({spouse_added: false}); editCard(false, this.state)}}>Delete Spouse</button>
							<button onClick={()=>deleteCard(card_id)}>Delete Card</button>
						</div>
						<div>
							{this.state.firstOrLast}<br />
							<input onChange={(e)=>this.handleInput(e.target.value,'card_name')}  onBlur={() => editCard(spouse_added, this.state)} placeholder="name" value={card_name}/>
							<input onChange={(e)=>this.handleInput(e.target.value,'card_birth')} onBlur={() => editCard(spouse_added, this.state)} placeholder="birth" value={card_birth}/>
							<input onChange={(e)=>this.handleInput(e.target.value,'card_death')} onBlur={() => editCard(spouse_added, this.state)} placeholder="death" value={card_death}/>
						</div>
						{spouse_added ? <div>
							<input onChange={(e)=>this.handleInput(e.target.value,'spouse_name')}  onBlur={() => editCard(spouse_added, this.state)} placeholder="spouse name" value={spouse_name}/>
							<input onChange={(e)=>this.handleInput(e.target.value,'spouse_birth')} onBlur={() => editCard(spouse_added, this.state)} placeholder="spouse birth" value={spouse_birth}/>
							<input onChange={(e)=>this.handleInput(e.target.value,'spouse_death')} onBlur={() => editCard(spouse_added, this.state)} placeholder="spouse death" value={spouse_death}/>
						</div>
						: null}
					 </div>
				</div>
				{
					this.props.tree ? 
						this.props.tree.map((x, i)=>{
							return x.parent_id === this.props.card_id ?
								<CrazyCard      {...x}
									key         = {x.card_id}
									cardIndex   = {i}
									depth       = {this.state.depth + 1}
									tree        = {this.props.tree}
									addChild    = {this.props.addChild}
									editCard    = {this.props.editCard}
									deleteCard  = {this.props.deleteCard}
									duplicates  = {this.props.duplicates}
								/> : null
						}) : null
				}
			</div>
		)
	}
}

export default CrazyCard