import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setCart } from '../../../ducks/products';
import axios from 'axios';
import CrazyCard from '../CrazyBlanket/CrazyCard';
import '../CrazyBlanket/CrazyBlanket.css';

class CrazyPrint extends Component {
	constructor () {
		super();
		this.state      = {familyTree : [], refresh: true, size:'none selected'}
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
        axios.post('/products/addtocart', {details: res.data, info: {familyTree:this.state.familyTree,size:this.state.size}})
          .then((res2) => this.props.setCart(res2.data))
		  })
	}
	
	selectSize(val){
		this.setState({size:val})
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
						<div>
							<a>Please Select a Size for Your Print</a>
							<div onClick={()=>this.selectSize( '8 X 10')}> size:  8 X 10, Normal Price: 51.99  , Sale Price: 39.99  <i className="fas fa-tree"></i></div>
							<div onClick={()=>this.selectSize('12 X 18')}> size: 12 X 18, Normal Price: 64.99  , Sale Price: 49.99  <i className="fas fa-tree"></i></div>
							<div onClick={()=>this.selectSize('16 X 20')}> size: 16 X 20, Normal Price: 77.99  , Sale Price: 59.99  <i className="fas fa-tree"></i></div>
							<div onClick={()=>this.selectSize('18 X 24')}> size: 18 X 24, Normal Price: 90.99  , Sale Price: 69.99  <i className="fas fa-tree"></i></div>
							<div onClick={()=>this.selectSize('24 X 36')}> size: 24 X 36, Normal Price: 103.99 , Sale Price: 79.99  <i className="fas fa-tree"></i></div>
							{this.state.size}
						</div>
						{this.state.size !== 'none selected' && this.props.match.params.sku > 0? <button onClick={() => this.writeToSession()}>Purchase</button> : null}
          </div>
        </div>
			)
		}
		else { return (<div></div>) }
	}
}

function mapStateToProps ( state ) {return { user_id: state.auth0.user_id }};
export default withRouter ( connect ( mapStateToProps, { setCart } )( CrazyPrint ) );