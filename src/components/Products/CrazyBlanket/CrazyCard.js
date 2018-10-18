import React, { Component } from 'react'
import './CrazyCard.css'
import CrazyCardCSS from './CrazyCardCSS'
import _ from 'lodash'

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

			currentDepth   : props.currentDepth,
			maxDepth       : props.maxDepth,
			totalChildren  : props.totalChildren,
			lastChildCount : props.lastChildCount,
			firstOrLast    : 'single'
		}
	}

	componentDidMount() {this.calculations()}

	calculations () {
		//SETUP
		const {tree, cardIndex, duplicates, parent_id} = this.props
		let childCount = 0;
		let lastChildCount = 0;
		

		//FIND DUPLICATES
			//checks if the card is the first or last card
		let findDuplicates = () => {
			if (duplicates[parent_id]) {
				this.setState({firstOrLast: 'middle'})
				cardIndex === duplicates[parent_id][0] ? this.setState({firstOrLast: 'first'}) : null;
				cardIndex === duplicates[parent_id][duplicates[parent_id].length-1] ? this.setState({firstOrLast: 'last'}) : null;
			}
		}

		findDuplicates();


		//UNFLATTEN
			//turns the tree into a nested object, and adds to the childCount
		let unflatten = ( array, current_id, lastActive, parent, tree ) => {
			tree = typeof tree !== 'undefined' ? tree : [];
			parent = typeof parent !== 'undefined' ? parent : { card_id: current_id };

			let children = _.filter( array, function(child){ return child.parent_id === parent.card_id; });

			if( !_.isEmpty( children )  ){
				if (parent.card_id === current_id) {tree = children}
				else {parent['children'] = children}
				_.each ( children, function( child ) { unflatten( array, current_id, lastActive, child ) } );
			}

			lastActive ? lastChildCount++ : childCount++;
			return tree;
		}
	
		//turns the card data into a a nested object
		let newTree = unflatten( tree, this.props.card_id, false )
		//captures the number of children of the last direct child of the current card has
		newTree[newTree.length - 1] ? unflatten(tree, newTree[newTree.length - 1].card_id, true) : null

	
		//DEPTH OF
			//finds the maximum depth of the tree
		let depthOf = (object) => {
			let level = 1;
			let key;
			for(key in object) {
				if (!object.hasOwnProperty(key)) continue;

				if (typeof object[key] === 'object'){
					let depth = depthOf(object[key]) + 1;
					level = Math.max(depth, level);
				}
			}
			return level;
		}

		
		//SETSTATE WITH RESULTS
		let currentDepth = Math.trunc(depthOf(newTree)/2);
		this.setState({
			maxDepth: currentDepth,
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
		const {card_name, card_birth, card_death, spouse_added, spouse_name, spouse_birth, spouse_death, currentDepth, maxDepth, totalChildren, lastChildCount, firstOrLast} = this.state
		const {card_id, addChild, editCard, deleteCard} = this.props
		return (
			<div>
				<CrazyCardCSS 
					currentDepth   = {currentDepth}
					maxDepth       = {maxDepth}
					totalChildren  = {totalChildren}
					lastChildCount = {lastChildCount}
					firstOrLast    = {firstOrLast}
					card_id        = {card_id}
				/>
			<div className={`crazy-card-${card_id}`}>
				<div className={`crazy-card-wrapper-${card_id}`}>
					<div className={`card-spacer-${card_id}`}>
						<div className={`card-line-${card_id}`}></div>
					</div>
					<div className="crazy-card-content">
						<div>
							<button onClick={()=>addChild(card_id)}>Add Child</button>
							<button onClick={()=>{this.setState({spouse_added: true});  editCard(true, this.state)}}>Add Spouse</button>
							<button onClick={()=>{this.setState({spouse_added: false}); editCard(false, this.state)}}>Delete Spouse</button>
							<button onClick={()=>deleteCard(card_id)}>Delete Card</button>
						</div>
						<div>
							{/* {'Card Position: ' + this.state.firstOrLast}<br />
							{'Total Children: ' + this.state.totalChildren}<br />
							{'Last Child Count: ' + this.state.lastChildCount}<br /><br /><br />
							{'Current Depth: ' + this.state.currentDepth}<br />
							{'Maximum Card Depth: ' + this.state.maxDepth}<br />
							{'Number of Direct Children: ' + JSON.stringify(this.props.duplicates[this.props.card_id] ? this.props.duplicates[this.props.card_id].length : 1)}<br /> */}
							<input onChange={(e)=>this.handleInput(e.target.value,'card_name')}  onBlur={() => editCard(spouse_added, this.state)} placeholder="name" value={card_name}/><br />
							<input onChange={(e)=>this.handleInput(e.target.value,'card_birth')} onBlur={() => editCard(spouse_added, this.state)} placeholder="birth" value={card_birth}/><br />
							<input onChange={(e)=>this.handleInput(e.target.value,'card_death')} onBlur={() => editCard(spouse_added, this.state)} placeholder="death" value={card_death}/>
						</div>
						{spouse_added ? <div>
							<input onChange={(e)=>this.handleInput(e.target.value,'spouse_name')}  onBlur={() => editCard(spouse_added, this.state)} placeholder="spouse name" value={spouse_name}/><br />
							<input onChange={(e)=>this.handleInput(e.target.value,'spouse_birth')} onBlur={() => editCard(spouse_added, this.state)} placeholder="spouse birth" value={spouse_birth}/><br />
							<input onChange={(e)=>this.handleInput(e.target.value,'spouse_death')} onBlur={() => editCard(spouse_added, this.state)} placeholder="spouse death" value={spouse_death}/>
						</div>
						: null}
					 </div>
				</div>
					 <div className={`crazy-card-underline-${card_id}`}></div>
				{
					this.props.tree ? 
						this.props.tree.map((x, i)=>{
							return x.parent_id === this.props.card_id ?
								<CrazyCard       {...x}
									key          = {x.card_id}
									cardIndex    = {i}
									currentDepth = {this.state.currentDepth + 1}
									tree         = {this.props.tree}
									addChild     = {this.props.addChild}
									editCard     = {this.props.editCard}
									deleteCard   = {this.props.deleteCard}
									duplicates   = {this.props.duplicates}
								/> : null
						}) : null
				}
			</div>
			</div>
		)
	}
}

export default CrazyCard