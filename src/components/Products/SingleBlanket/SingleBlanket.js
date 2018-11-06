import React, { Component } from 'react';
import './SingleBlanket.css';
import { withRouter } from 'react-router-dom';
import { savedMessage, setSingle, setSingleID } from '../../../ducks/familyTree';
import { setCart } from '../../../ducks/products';
import axios from 'axios';
import SingleCard from './SingleCard';
import {connect} from 'react-redux';

class SingleBlanket extends Component {
	constructor(){
		super()
		this.state={
			a:'',ad1:'',ad2:'',
			a1:'',a1d1:'',a1d2:'',
			a2:'',a2d1:'',a2d2:'',

			a1a:'',a1ad1:'',a1ad2:'',
			a1b:'',a1bd1:'',a1bd2:'',
			a2a:'',a2ad1:'',a2ad2:'',
			a2b:'',a2bd1:'',a2bd2:'',

			a1a1:'',a1a1d1:'',a1a1d2:'',
			a1a2:'',a1a2d1:'',a1a2d2:'',
			a1b1:'',a1b1d1:'',a1b1d2:'',
			a1b2:'',a1b2d1:'',a1b2d2:'',
			a2a1:'',a2a1d1:'',a2a1d2:'',
			a2a2:'',a2a2d1:'',a2a2d2:'',
			a2b1:'',a2b1d1:'',a2b1d2:'',
			a2b2:'',a2b2d1:'',a2b2d2:''
		}
		this.saveChanges = this.saveChanges.bind(this);
		this.savedMessage = this.savedMessage.bind(this);
		this.writeToSession = this.writeToSession.bind(this);
	}

	componentDidMount() {
		const {user_id, setSingle, setSingleID} = this.props
		axios.get(`/cards/single/${user_id}`)
			.then((res) => {
				if (res.data[0].o1) {
					this.setState(res.data[0].o1);
					setSingleID(res.data[0].card_id);
					setSingle(true);
				}
				else { setSingle(false) }
			})
			
	}

	changeHandler(target,val){
		this.setState({[target]:val})
	}

	saveChanges() {
		const { user_id, singleExists, singleID } = this.props
		singleExists ?
			axios.put(`/cards/${singleID}`, {
					card_name    : null,
					card_birth   : null,
					card_death   : null,
					spouse_name  : null,
					spouse_birth : null,
					spouse_death : null,
					o1           : this.state
			}).then(() => {this.savedMessage(); this.writeToSession()})
		:
			axios.post(`/cards/${user_id}`, {
				tree_type    : 'single',
				parent_id    : null,
				o1           : this.state
		}).then(() => {this.savedMessage(); this.writeToSession()})
	}

	savedMessage () {
		this.props.savedMessage()
		setTimeout(() => {this.props.savedMessage()}, 3000);
	}

	writeToSession () {
    axios.get(`/products/${this.props.match.params.sku}`)
      .then((res)=>{
        axios.post('/products/addtocart', {details: res.data, info: this.state})
          .then((res2) => this.props.setCart(res2.data))
		  })
	}

	render() {
		const {saved} = this.props;
		return (
			<div className="content">
				<div className="single-blanket">
					<div className="single-header"><h1>Enter in your family tree</h1></div>
					<div className="single-blanket-content">
						<div className="level4">
							<div className="single inner-level-4">
								<SingleCard n={'a1a1'} valn={this.state.a1a1} d1={'a1a1d1'} vald1={this.state.a1a1d1} d2={'a1a1d2'} vald2={this.state.a1a1d2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							</div>
							<div className="single inner-level-4">
								<SingleCard n={'a1a2'} valn={this.state.a1a2} d1={'a1a2d1'} vald1={this.state.a1a2d1} d2={'a1a2d2'} vald2={this.state.a1a2d2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
							</div>
							<div className="single inner-level-4">
								<SingleCard n={'a1b1'} valn={this.state.a1b1} d1={'a1b1d1'} vald1={this.state.a1b1d1} d2={'a1b1d2'} vald2={this.state.a1b1d2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							</div>
							<div className="single inner-level-4">
								<SingleCard n={'a1b2'} valn={this.state.a1b2} d1={'a1b2d1'} vald1={this.state.a1b2d1} d2={'a1b2d2'} vald2={this.state.a1b2d2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
							</div>
							<div className="single inner-level-4">
								<SingleCard n={'a2a1'} valn={this.state.a2a1} d1={'a2a1d1'} vald1={this.state.a2a1d1} d2={'a2a1d2'} vald2={this.state.a2a1d2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							</div>
							<div className="single inner-level-4">
								<SingleCard n={'a2a2'} valn={this.state.a2a2} d1={'a2a2d1'} vald1={this.state.a2a2d1} d2={'a2a2d2'} vald2={this.state.a2a2d2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
							</div>
							<div className="single inner-level-4">
								<SingleCard n={'a2b1'} valn={this.state.a2b1} d1={'a2b1d1'} vald1={this.state.a2b1d1} d2={'a2b1d2'} vald2={this.state.a2b1d2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							</div>
							<div className="single inner-level-4">
								<SingleCard n={'a2b2'} valn={this.state.a2b2} d1={'a2b2d1'} vald1={this.state.a2b2d1} d2={'a2b2d2'} vald2={this.state.a2b2d2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
							</div>
						</div>

						<div className="connector-wrapper-3">
							<div className="connector3-4"></div>
							<div className="connector3-4"></div>
							<div className="connector3-4"></div>
							<div className="connector3-4"></div>
						</div>

		{/* // sanity spacing */}

						<div className="level3">
							<div className="single inner-level-3">
								<SingleCard n={'a1a'} valn={this.state.a1a} d1={'a1ad1'} vald1={this.state.a1ad1} d2={'a1ad2'} vald2={this.state.a1ad2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							</div>
							<div className="single inner-level-3">
								<SingleCard n={'a1b'} valn={this.state.a1b} d1={'a1bd1'} vald1={this.state.a1bd1} d2={'a1bd2'} vald2={this.state.a1bd2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
							</div>
							<div className="single inner-level-3">
								<SingleCard n={'a2a'} valn={this.state.a2a} d1={'a2ad1'} vald1={this.state.a2ad1} d2={'a2ad2'} vald2={this.state.a2ad2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							</div>
							<div className="single inner-level-3">
								<SingleCard n={'a2b'} valn={this.state.a2b} d1={'a2bd1'} vald1={this.state.a2bd1} d2={'a2bd2'} vald2={this.state.a2bd2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
							</div>
						</div>
						<div className="connector-wrapper-2">
							<div className="connector2-3"></div>
							<div className="connector2-3"></div>
						</div>


		{/* // sanity spacing */}

						<div className="level2">
							<div className="single inner-level-2">
								<SingleCard n={'a1'} valn={this.state.a1} d1={'a1d1'} vald1={this.state.a1d1} d2={'a1d2'} vald2={this.state.a1d2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							</div>
							<div className="single inner-level-2">
								<SingleCard n={'a2'} valn={this.state.a2} d1={'a2d1'} vald1={this.state.a2d1} d2={'a2d2'} vald2={this.state.a2d2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
							</div>
						</div>

						<div className="connector-wrapper-1">
							<div className="connector1-2"></div>
						</div>

		{/* // sanity spacing */}

						<div className="level1">
							<div className="single inner-level-1">
								<SingleCard n={'a'} valn={this.state.a} d1={'ad1'} vald1={this.state.ad1} d2={'ad2'} vald2={this.state.ad2} callback={this.changeHandler.bind(this)}/>
							</div>
						</div>
					</div>

					<div className="save-div"><button onClick={() => this.saveChanges()}>Save Changes</button></div>
					<div className="saved-message-container transparent" style={saved ? {opacity: `1`} : {opacity: `0`}}>
						<div className="saved-message"><a>Changes Saved</a></div>
					</div>
					
				</div>
			</div>
		)
	}
}

function mapStateToProps ( state ) {
	return {
		user_id      : state.auth0.user_id,
		saved        : state.familyTree.saved,
		singleExists : state.familyTree.singleExists,
		singleID     : state.familyTree.singleID,
	}
};
export default withRouter ( connect ( mapStateToProps, { savedMessage, setSingle, setSingleID, setCart } )( SingleBlanket ) );