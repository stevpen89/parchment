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
			familyTree: []
		}
		this.addChild = this.addChild.bind(this)
		this.editCard = this.editCard.bind(this)
		this.deleteCard = this.deleteCard.bind(this)
	}

	componentDidMount() {
		this.updateFamilyTree();
	}

	updateFamilyTree() {
		const {user_id} = this.props;
		axios.get(`/cards/crazy/${user_id}`).then(res => this.setState({familyTree: res.data}))
	}

	addChild (parent_id, state) {
		// const {card_name, card_birth, card_death, spouse_name, spouse_birth, spouse_death} = state
		const {user_id} = this.props;
		const {familyTree} = this.state;
		let newTree = [...familyTree];

		axios.post(`/cards/${user_id}`, {
			user_id,
			tree_type:'crazy',
			parent_id
		})
		.then((res) => {
			newTree.push(res.data);
			this.setState({familyTree: newTree});
			console.log(this.state.familyTree)
		})
	}

	editCard (cardId,changes) {axios.put(`/${cardId}`)} // this put line needs logic to take it's "changes" and send them to DB
	deleteCard (cardId) {axios.delete(`/${cardId}`)}

	render() {
		console.log(this.state)
		return (
			<div>
				{this.state.familyTree ? this.state.familyTree.map((x)=>{
					return x.parent_id === 0 ? 
					<TrialCard tree={this.state.familyTree}{...x} addChild={this.addChild} editCard={this.editCard} deleteCard={this.deleteCard} key={x.card_id}/>:
					null
				}):null}
			</div>
		)
	}
}

function mapStateToProps ( state ) {return { user_id: state.auth0.user_id }};
export default connect ( mapStateToProps )( CrazyBlanket );