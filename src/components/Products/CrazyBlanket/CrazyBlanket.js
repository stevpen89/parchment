import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setCart } from '../../../ducks/products';
import axios from 'axios';
import CrazyCard from './CrazyCard';
import './CrazyBlanket.css';

class CrazyBlanket extends Component {
	constructor () {
		super();
		this.state      = {familyTree : [], refresh: true}
		this.addChild   = this.addChild.bind(this)
		this.editCard   = this.editCard.bind(this)
		this.deleteCard = this.deleteCard.bind(this)
	}

	componentDidMount() {this.userExists()}

	//checks if the user exists
	userExists () {
		const {user_id} = this.props;
		axios
			.get(`/cards/crazy/${user_id}`)
			.then(res => {
				if (res.data[0]) {
					this.setState({familyTree: res.data})
				}
				else {
					axios
						.post(`/cards/${user_id}`, {user_id, tree_type :'crazy', parent_id : 0})
						.then(() => this.updateFamilyTree())
				}
			});
	}

	//refreshes the entire tree
	updateFamilyTree () {
		const {user_id} = this.props;
		axios
			.get(`/cards/crazy/${user_id}`)
			.then(res => {
				this.refresh();
				this.setState({familyTree: res.data});
			})
	}

	//creates a new child relative to the current card
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
				this.updateFamilyTree();
				newTree.push(res.data);
				this.setState({familyTree: newTree});
			})
	}

	//edits a card
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
	
	//deletes the card based off of the card's id
	deleteCard (card_id) {
		axios
			.delete(`/cards/${card_id}`)
			.then(() => this.updateFamilyTree());
	}

	//refreshes the tree for any changes
	refresh () { setTimeout(() => {this.setState({refresh: false})}, 0); setTimeout(() => {this.setState({refresh: true})}, 0) }

	//adds the final item to the cart
	writeToSession () {
    axios.get(`/products/single/${this.props.match.params.sku}`)
      .then((res)=>{
        axios.post('/products/addtocart', {details: res.data, info: this.state.familyTree})
          .then((res2) => this.props.setCart(res2.data))
		  })
	}

	render() {
		const { refresh } = this.state;
		const { user_id } = this.props;

		if ( refresh ) {
			return (
        <div className="content">
					{user_id ? null : 
						<div className="login-alert-wrapper">
							<div className="login-alert">
								<a>Please Login to use this feature</a>
								<button onClick={() => document.getElementById("login").click()}>Login or make account</button>
							</div>
						</div>
						}
          <div className="crazy-blanket">
            {this.state.familyTree ? this.state.familyTree.map((x, i)=>{
              return x.parent_id === 0 ? 
              <CrazyCard     {...x}
                key        = {x.card_id}
                depth      = {1}
                tree       = {this.state.familyTree}
                addChild   = {this.addChild}
                editCard   = {this.editCard}
                deleteCard = {this.deleteCard}
              /> : null
						}) : null }
						
						<button onClick={() => this.writeToSession()}>Purchase</button>
						{`Selected Color: ${this.props.match.params.color}`}
          </div>
        </div>
			)
		}
		else { return (<div></div>) }
	}
}

function mapStateToProps ( state ) {return { user_id: state.auth0.user_id }};
export default withRouter ( connect ( mapStateToProps, { setCart } )( CrazyBlanket ) );