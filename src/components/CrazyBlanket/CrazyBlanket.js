import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class CrazyBlanket extends Component {
	constructor () {
		super();
		this.state = {
			familyTree: {},
			results:{},
			resultsArr:[]
		}
	}

	componentDidMount() {
		const tree_id = 1
		axios.get(`/cards/${tree_id}`).then(res => this.setState({familyTree: res.data}))
	}

	addCard    ()       {}															  // this should add a new blank card to the cards table, then it 
																												// needs to get all cards with the matching tree ID which makes the tree
																												// reRender any new cards
	editCard   (cardId,changes) {axios.put(`/${cardId}`)} // this put line needs logic to take it's "changes" and send them to DB
	deleteCard (cardId) {axios.delete(`/${cardId}`)}

	builder(){
		let sqlResults = {one:1,two:2,three:3}
		let arrayOfResults = []
		for(let x in sqlResults){ 
			arrayOfResults.push(x)}

		// this.setState({resultsArr:arrayOfResults})
		
		return this.state.resultsArr.map((x)=>{
			return
			<CrazyBlanket
				cardId={x.card_id}
				name={x.card_name}
				birth={x.card_birth}
				death={x.card_death}
				sname={x.spouse_name}
				sbirth={x.spouse_birth}
				sdeath={x.spouse_death}
				addCard={this.addCard.bind(this)} 
				editCard={this.editCard.bind(this)} 
				deleteCard={this.deleteCard.bind(this)}
				key={x.card_id}
			/>
		})
	}
	

	render() {
		return (
			<div>
				This is Crazy Blanket
				{this.builder()}
			</div>
		)
	}
}

function mapStateToProps ( state ) {return { user_id: state.user_id }};
export default connect ( mapStateToProps )( CrazyBlanket );