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
			[ {name:"bob",id:1,parent:0},{name:"sourkraut",id:2,parent:1},{name:"conehead",id:3,parent:1},
				{name:"joe",id:4,parent:2},{name:"wumbus",id:5,parent:2},{name:"agent j",id:6,parent:3},
				{name:"mike",id:7,parent:3},{name:"crumch",id:8,parent:3},{name:"leatherneck",id:9,parent:7},
				{name:"tuna",id:10,parent:7},{name:"singapore",id:11,parent:7},{name:"gobbler",id:12,parent:7} ]
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
				{/* This is Crazy Blanket
				{this.state.familyTree ? 
				this.state.familyTree.map((x)=><CrazyCard 
				{...x} 
				key={x.card_id}/>):null} */}
				<TrialCard id={1} parent={this.state.familyTree[0].parent} tree={this.state.familyTree} name={this.state.familyTree[0].name}/>
			</div>
		)
	}
}

function mapStateToProps ( state ) {return { user_id: state.auth0.user_id }};
export default connect ( mapStateToProps )( CrazyBlanket );