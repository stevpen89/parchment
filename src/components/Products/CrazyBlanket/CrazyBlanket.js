import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import CrazyCard from './CrazyCard'

class CrazyBlanket extends Component {
	constructor () {
		super();
		this.state = {
			count      : 1,
			familyTree : [],
			duplicates : []
		}
		this.addChild       = this.addChild.bind(this)
		this.editCard       = this.editCard.bind(this)
		this.deleteCard     = this.deleteCard.bind(this)
		this.findDuplicates = this.findDuplicates.bind(this)
	}

	componentDidMount() {this.userExists()}

	userExists () {
		const {user_id} = this.props;
		axios
			.get(`/cards/crazy/${user_id}`)
			.then(res => {
				if (res.data[0]) {
					this.findDuplicates(res.data);
					this.setState({familyTree: res.data})
				}
				else {
					axios
						.post(`/cards/${user_id}`, {user_id, tree_type :'crazy', parent_id : 0})
						.then(() => this.updateFamilyTree())
				}
			});
	}

	updateFamilyTree () {
		const {user_id} = this.props;
		axios
			.get(`/cards/crazy/${user_id}`)
			.then(res => {
				this.findDuplicates(res.data);
				this.setState({familyTree: res.data});
			})
	}

	addChild (card_id) {
		const {user_id}    = this.props;
		const {familyTree} = this.state;
		let newTree = [...familyTree];

		axios
			.post(`/cards/${user_id}`, {
				user_id   : user_id,
				tree_type :'crazy',
				parent_id : card_id
			})
			.then((res) => {
				newTree.push(res.data);
				this.setState({familyTree: newTree});
				this.findDuplicates(newTree);
			})
	}

	editCard (spouse_added, state) {
		const {
			card_id,
			card_name,
			card_birth,
			card_death,
			spouse_name,
			spouse_birth,
			spouse_death
		} = state

		axios.put(`/cards/${card_id}`,
		{
			card_name,
			card_birth,
			card_death,
			spouse_added,
			spouse_name,
			spouse_birth,
			spouse_death
		})
	}
	
	deleteCard (card_id) {
		//deletes the card based off of the card's id
		axios
			.delete(`/cards/${card_id}`)
			.then(() => this.updateFamilyTree());
	}

	findDuplicates (familyTree) {
		//write parent ids to an index
		let familyTreeIndexes = [];
		for (let i in familyTree) {familyTreeIndexes.push(familyTree[i].parent_id)}

		//check for parent id duplicates
		Array.prototype.getDuplicates = function () {
			var duplicates = {};
			for (var i = 0; i < this.length; i++) {
				if (duplicates.hasOwnProperty(this[i])) {duplicates[this[i]].push(i)}
				else if (this.lastIndexOf(this[i]) !== i) {duplicates[this[i]] = [i]}
			}
			return duplicates;
		};

		let duplicates = familyTreeIndexes.getDuplicates();
		this.setState({duplicates});
	}

	render() {
		return (
			<div>
				{this.state.familyTree ? this.state.familyTree.map((x, i)=>{
					return x.parent_id === 0 ? 
					<CrazyCard      {...x}
						key         = {x.card_id}
						cardIndex   = {i}
						depth       = {1}
						tree        = {this.state.familyTree}
						addChild    = {this.addChild}
						editCard    = {this.editCard}
						deleteCard  = {this.deleteCard}
						duplicates  = {this.state.duplicates}
					/> : null
				}) : null }
			</div>
		)
	}
}

function mapStateToProps ( state ) {return { user_id: state.auth0.user_id }};
export default connect ( mapStateToProps )( CrazyBlanket );