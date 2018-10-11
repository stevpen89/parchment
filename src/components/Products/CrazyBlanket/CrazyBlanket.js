import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import CrazyCard from './CrazyCard'

class CrazyBlanket extends Component {
	constructor () {
		super();
		this.state = {
			familyTree: [],
		}
	}

	componentDidMount() {
		const tree_type = 1
		axios.get(`/cards/${tree_type}`).then(res => this.setState({familyTree: res.data}))
	}

	addCard    ()       {}															  // this should add a new blank card to the cards table, then it 
																												// needs to get all cards with the matching tree ID which makes the tree
																												// reRender any new cards
	editCard   (cardId,changes) {axios.put(`/${cardId}`)} // this put line needs logic to take it's "changes" and send them to DB
	deleteCard (cardId) {axios.delete(`/${cardId}`)}

	render() {
		return (
			<div>
				This is Crazy Blanket
				{this.state.familyTree ? 
				this.state.familyTree.map((x)=><CrazyCard 
				{...x} 
				key={x.card_id}/>):null}
			</div>
		)
	}
}

function mapStateToProps ( state ) {return { user_id: state.auth0.user_id }};
export default connect ( mapStateToProps )( CrazyBlanket );