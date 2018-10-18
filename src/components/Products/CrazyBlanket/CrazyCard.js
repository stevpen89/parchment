import React, { Component } from 'react'
import CrazyCardCSS from './CrazyCardCSS'
import './CrazyCard.css'

class CrazyCard extends Component {
	constructor(props){
		super(props)
		this.state={
			card_id        : props.card_id,
			card_name      : props.card_name,
			card_birth     : props.card_birth,
			card_death     : props.card_death,
			spouse_added   : props.spouse_added,
			spouse_name    : props.spouse_name,
			spouse_birth   : props.spouse_birth,
			spouse_death   : props.spouse_death,
			depth          : props.depth,
			totalChildren  : props.totalChildren,
			lastChildCount : props.lastChildCount
		}
	}

	componentDidMount() {this.calculations()}

	//finds the calculations for the connecting lines
	calculations () {
		const {tree, card_id} = this.props
		let variables = {
			i              : 0,
			j              : 0,
			childCount     : 0,
			lastChild      : 0,
			lastChildCount : 0,
			foundChildren  : [],
			secondRun      : false
		}
		let {i, j, childCount, lastChild, lastChildCount, foundChildren, secondRun} = variables;

		//finds all children directly under the id its given (current_id)
		let childrenFinder = (current_id) => {
			if (i < tree.length) {
				if (current_id === tree[i].parent_id) {
					secondRun ? lastChildCount++ : childCount++;
					foundChildren.push(tree[i].card_id);
				}
				i++;
				childrenFinder(current_id);
			}
		}
	
		childrenFinder(card_id);
		//records the last child relevant to the current_id
		lastChild = foundChildren[foundChildren.length - 1];
		//resets the iterator counter
		i = 0;
	
		//finds all children past the direct children
		let repeater = () => {
			j = foundChildren.length
			if (j > 0) {
				childrenFinder(foundChildren[0]);
				i = 0;
				foundChildren.shift();
				repeater();
			}
		}
	
		repeater();

		//uses the repeater to find the number of children on the last child
		//relative to this card's id
		let findLastChildren = () => {
			secondRun = true;
			foundChildren.push(lastChild);
			repeater();
		}

		findLastChildren();

		//sets the state
		this.setState({
			totalChildren: childCount - 1,
			lastChildCount: lastChildCount
		})
	}

	handleInput(val,target){
		this.setState({[target]:val})
	}

	editingCard(){
		this.setState({spouseToggle:true})
	}

	render() {
		const {card_name, card_birth, card_death, spouse_added, spouse_name, spouse_birth, spouse_death, depth, totalChildren, lastChildCount} = this.state
		const {card_id, addChild, editCard, deleteCard} = this.props
		return (
			<div className="crazy-card">
				<CrazyCardCSS
					depth          = {depth}
					totalChildren  = {totalChildren}
					lastChildCount = {lastChildCount}
					card_id        = {card_id}
				/>
				<div className={`crazy-card-${card_id}`}>
					<div className="crazy-card-wrapper">
						<div className={`card-spacer-${card_id}`}>
							<div className="card-line"></div>
						</div>
						<div className={`crazy-card-content-${card_id}`}>
							<div className="crazy-inputs">
								<div className="crazy-inputs-card">
									<input onChange={(e)=>this.handleInput(e.target.value,'card_name')}  onBlur={() => editCard(spouse_added, this.state)} placeholder="name"  value={card_name}/><br />
									<input onChange={(e)=>this.handleInput(e.target.value,'card_birth')} onBlur={() => editCard(spouse_added, this.state)} placeholder="birth" value={card_birth}/><br />
									<input onChange={(e)=>this.handleInput(e.target.value,'card_death')} onBlur={() => editCard(spouse_added, this.state)} placeholder="death" value={card_death}/>
								</div>
								{spouse_added ?
									<div className="crazy-inputs-spouse">
										<input onChange={(e)=>this.handleInput(e.target.value,'spouse_name')}  onBlur={() => editCard(spouse_added, this.state)} placeholder="spouse name"  value={spouse_name}/><br />
										<input onChange={(e)=>this.handleInput(e.target.value,'spouse_birth')} onBlur={() => editCard(spouse_added, this.state)} placeholder="spouse birth" value={spouse_birth}/><br />
										<input onChange={(e)=>this.handleInput(e.target.value,'spouse_death')} onBlur={() => editCard(spouse_added, this.state)} placeholder="spouse death" value={spouse_death}/>
									</div>
								: null}
							</div>
							<div className="crazy-buttons">
								<button
									onClick={()=>addChild(card_id)}
									className="crazy-card-add-child">
									<i class="fas fa-child"></i>  Add Child
								</button>
								{spouse_added ? null :
									<button
										onClick={()=>{this.setState({spouse_added: true}); editCard(true, this.state)}}
										className="crazy-card-spouse">
										<i class="fas fa-heart"></i>  Add Spouse
									</button>}
								{spouse_added ? 
									<button
										onClick={()=>{this.setState({spouse_added: false}); editCard(false, this.state)}}
										className="crazy-card-spouse">
										<i class="fas fa-minus-circle"></i>  Delete Spouse
									</button> : null
								}
								<button
									onClick={()=>deleteCard(card_id)}
									disabled={totalChildren >= 0 ? true : false}
									className="crazy-card-delete">
									<i class="fas fa-trash-alt"></i>  Delete
								</button>
							</div>
						</div>
					</div>
					<div className={`crazy-card-underline-${card_id}`}></div>
					{
						this.props.tree ? 
							this.props.tree.map((x, i)=>{
								return x.parent_id === this.props.card_id ?
									<CrazyCard     {...x}
										key        = {x.card_id}
										tree       = {this.props.tree}
										depth      = {this.state.depth + 1}
										addChild   = {this.props.addChild}
										editCard   = {this.props.editCard}
										deleteCard = {this.props.deleteCard}
									/> : null
							}) : null
					}
				</div>
			</div>
		)
	}
}

export default CrazyCard