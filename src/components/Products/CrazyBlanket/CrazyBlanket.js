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
			[ 
				{card_id:1,user_id:1,tree_type:'crazy',parent_id:0,card_name:'bob',card_birth:'1990',card_death:'2020',spouse_name:'gerbabella',spouse_birth:'1990',spouse_death:'2020'},
				{card_id:2,user_id:1,tree_type:'crazy',parent_id:1,card_name:'bob',card_birth:'1990',card_death:'2020',spouse_name:'gerbabella',spouse_birth:'1990',spouse_death:'2020'},
				{card_id:3,user_id:1,tree_type:'crazy',parent_id:1,card_name:'bob',card_birth:'1990',card_death:'2020',spouse_name:'gerbabella',spouse_birth:'1990',spouse_death:'2020'},
				{card_id:4,user_id:1,tree_type:'crazy',parent_id:1,card_name:'bob',card_birth:'1990',card_death:'2020',spouse_name:'gerbabella',spouse_birth:'1990',spouse_death:'2020'},
				{card_id:5,user_id:1,tree_type:'crazy',parent_id:2,card_name:'bob',card_birth:'1990',card_death:'2020',spouse_name:'gerbabella',spouse_birth:'1990',spouse_death:'2020'},
				{card_id:6,user_id:1,tree_type:'crazy',parent_id:2,card_name:'bob',card_birth:'1990',card_death:'2020',spouse_name:'gerbabella',spouse_birth:'1990',spouse_death:'2020'},
				{card_id:7,user_id:1,tree_type:'crazy',parent_id:4,card_name:'bob',card_birth:'1990',card_death:'2020',spouse_name:'gerbabella',spouse_birth:'1990',spouse_death:'2020'},
				{card_id:8,user_id:1,tree_type:'crazy',parent_id:4,card_name:'bob',card_birth:'1990',card_death:'2020',spouse_name:'gerbabella',spouse_birth:'1990',spouse_death:'2020'}
			]
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
	}

	addChild (parent_id, state) {
		// const {card_name, card_birth, card_death, spouse_name, spouse_birth, spouse_death} = state
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
					<TrialCard tree={this.state.familyTree}{...x} addChild={this.addChild} editCard={this.editCard} deleteCard={this.deleteCard} key={x.card_id}/>:
					null
				})}
			</div>
		)
	}
}

function mapStateToProps ( state ) {return { user_id: state.auth0.user_id }};
export default connect ( mapStateToProps )( CrazyBlanket );