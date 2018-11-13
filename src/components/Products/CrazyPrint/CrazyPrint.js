import React, { Component } from 'react';
import '../SinglePrint/SinglePrint.css'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setCart } from '../../../ducks/products';
import axios from 'axios';
import CrazyCard from '../CrazyBlanket/CrazyCard';
import '../CrazyBlanket/CrazyBlanket.css';

class CrazyPrint extends Component {
	constructor (props) {
		super(props);
		this.state = {
			familyTree : [],
			refresh    : true,
			SKUInfo    : [],
			prices     : {},
			size       : 'Please select a size for your print',
			color      : props.match.params.color
		}
		this.addChild   = this.addChild.bind(this);
		this.editCard   = this.editCard.bind(this);
		this.deleteCard = this.deleteCard.bind(this);
	}

	componentDidMount() {
		axios.get(`/products/single/${this.props.match.params.sku}`)
      .then((res)=>{
        this.setState({SKUInfo: res.data});
        this.setState({prices: JSON.parse(res.data.o1)});
			})
			
		this.userExists();
	}

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

	sizeParser () {
    const { normal8x10, normal12x18, normal16x20, normal18x24, normal24x36, sale8x10, sale12x18, sale16x20, sale18x24, sale24x36 } = this.state.prices;
    switch(this.state.size) {
      case "8x10"  : return [normal8x10, sale8x10];
      case "12x18" : return [normal12x18, sale12x18];
      case "16x20" : return [normal16x20, sale16x20];
      case "18x24" : return [normal18x24, sale18x24];
      case "24x36" : return [normal24x36, sale24x36];
      default: return [];
    }
  }

	//refreshes the tree for any changes
	refresh () { setTimeout(() => {this.setState({refresh: false})}, 0); setTimeout(() => {this.setState({refresh: true})}, 0) }

	//adds the final item to the cart
	writeToSession () {
		let tempData = []
    tempData = Object.assign({}, this.state.SKUInfo);
    tempData.product_price = this.sizeParser()[0];
    tempData.product_sale = this.sizeParser()[1];

		axios.post('/products/addtocart', {details: tempData, info: {familyTree: this.state.familyTree, size: this.state.size, color:this.state.color}})
			.then((res2) => {
        this.props.setCart(res2.data);
        this.props.history.go(-2);
			})
	}
	
	selectSize(val){
		this.setState({size:val})
	}

	render() {
		const { refresh, size } = this.state;
		const { user_id } = this.props;
		const { normal8x10, normal12x18, normal16x20, normal18x24, normal24x36, sale8x10, sale12x18, sale16x20, sale18x24, sale24x36 } = this.state.prices;

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
          </div>
					<div className="size-selector-wrapper">
							<h1>{this.state.size}</h1>
							<div className="size-selector">
								<div onClick={()=>this.selectSize( '8x10')} className={size === '8x10' ? 'size-selected print-size sizer' : 'print-size sizer'}>
									<a id="dimensions">8 X 10 </a>
									<a className={sale8x10 ? 'strikeout' : ''}>${normal8x10}</a>{sale8x10 ? <a>${sale8x10}</a> : null}
								</div>
								<div onClick={()=>this.selectSize('12x18')} className={size === '12x18' ? 'size-selected print-size sizer' : 'print-size sizer'}>
									<a id="dimensions">12 X 18</a>
									<a className={sale12x18 ? 'strikeout' : ''}>${normal12x18}</a>{sale12x18 ? <a>${sale12x18}</a> : null}
								</div>
								<div onClick={()=>this.selectSize('16x20')} className={size === '16x20' ? 'size-selected print-size sizer' : 'print-size sizer'}>
									<a id="dimensions">16 X 20</a>
									<a className={sale16x20 ? 'strikeout' : ''}>${normal16x20}</a>{sale16x20 ? <a>${sale16x20}</a> : null}
								</div>
								<div onClick={()=>this.selectSize('18x24')} className={size === '18x24' ? 'size-selected print-size sizer' : 'print-size sizer'}>
									<a id="dimensions">18 X 24</a>
									<a className={sale18x24 ? 'strikeout' : ''}>${normal18x24}</a>{sale18x24 ? <a>${sale18x24}</a> : null}
								</div>
								<div onClick={()=>this.selectSize('24x36')} className={size === '24x36' ? 'size-selected print-size sizer' : 'print-size sizer'}>
									<a id="dimensions">24 X 36</a>
									<a className={sale24x36 ? 'strikeout' : ''}>${normal24x36}</a>{sale24x36 ? <a>${sale24x36}</a> : null}
								</div>
							</div>
							<div className="save-div"><button onClick={() => this.writeToSession()} disabled={this.state.size !== 'Please select a size for your print' && this.props.match.params.sku > 0 ? false : true}>Add To Cart</button></div>
						</div>
        </div>
			)
		}
		else { return (<div></div>) }
	}
}

function mapStateToProps ( state ) {return { user_id: state.auth0.user_id }};
export default withRouter ( connect ( mapStateToProps, { setCart } )( CrazyPrint ) );