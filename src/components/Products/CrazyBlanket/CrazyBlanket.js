import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import CrazyCard from './CrazyCard'
import TrialCard from './TrialCard'

class CrazyBlanket extends Component {
	constructor () {
		super();
		this.state = {
			count:1,
			familyTree: 
			[ {card_name:'hello',id:1,parent_id:0},{id:2,parent_id:1},{id:3,parent_id:1},
				{id:4,parent_id:2},{id:5,parent_id:2},{id:6,parent_id:3},
				{id:7,parent_id:3},{id:8,parent_id:3},{id:9,parent_id:7},
				{id:10,parent_id:7},{id:11,parent_id:7},{id:12,parent_id:7} ]
		}
		this.addChild = this.addChild.bind(this)
		this.editCard = this.editCard.bind(this)
		this.deleteCard = this.deleteCard.bind(this)
	}

	componentDidMount() {
		// this.setState({count:2})
		// this.updateFamilyTree();
	}

	updateFamilyTree() {
		const {user_id} = this.props;
		axios.get(`/cards/crazy/${user_id}`).then(res => this.setState({familyTree: 'hello'}))
		console.log(this.state)
	}

	addChild (parent_id, state) {
		const {card_name, card_birth, card_death, spouse_name, spouse_birth, spouse_death} = state
		const {user_id} = this.props;
		const {familyTree} = this.state;
		let newTree = [...familyTree];

		axios.put(`/cards/${user_id}`, {
			user_id,
			tree_type:'crazy',
			parent_id,
			// card_name,
			// card_birth,
			// card_death,
			// spouse_name,
			// spouse_birth,
			// spouse_death
		})
		.then((res) => {
			this.updateFamilyTree();
		})
	}
	editCard (cardId,changes) {axios.put(`/${cardId}`)} // this put line needs logic to take it's "changes" and send them to DB
	deleteCard (cardId) {axios.delete(`/${cardId}`)}

	render() {

		return (
			<div>
				{/* This is Crazy Blanket
				{this.state.familyTree ? 
				this.state.familyTree.map((x)=><CrazyCard 
				{...x} 
				key={x.card_id}/>):null} */}
				{this.state.familyTree.map((x)=>{
					return x.parent_id === 0 ? 
					<TrialCard tree={this.state.familyTree}{...x} addChild={this.addChild} editCard={this.editCard} deleteCard={this.deleteCard}/>:
					null
				})}
			</div>
		)
	}
}

function mapStateToProps ( state ) {return { user_id: state.auth0.user_id }};
export default connect ( mapStateToProps )( CrazyBlanket );