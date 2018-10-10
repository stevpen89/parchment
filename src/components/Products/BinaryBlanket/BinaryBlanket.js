import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import './BinaryBlanket.css'
import PairCard from './PairCard'

class BinaryBlanket extends Component {
	constructor(){
		super()
		this.state={
		a:'',ad1:'',ad2:'',
		b:'',bd1:'',bd2:'',

		a1:'',a1d1:'',a1d2:'',
		a2:'',a2d1:'',a2d2:'',
		b1:'',b1d1:'',b1d2:'',
		b2:'',b2d1:'',b2d2:'',

		a1a:'',a1ad1:'',a1ad2:'',
		a1b:'',a1bd1:'',a1bd2:'',
		a2a:'',a2ad1:'',a2ad2:'',
		a2b:'',a2bd1:'',a2bd2:'',
		b1a:'',b1ad1:'',b1ad2:'',
		b1b:'',b1bd1:'',b1bd2:'',
		b2a:'',b2ad1:'',b2ad2:'',
		b2b:'',b2bd1:'',b2bd2:'',

		a1a1:'',a1a1d1:'',a1a1d2:'',
		a1a2:'',a1a2d1:'',a1a2d2:'',
		a1b1:'',a1b1d1:'',a1b1d2:'',
		a1b2:'',a1b2d1:'',a1b2d2:'',
		a2a1:'',a2a1d1:'',a2a1d2:'',
		a2a2:'',a2a2d1:'',a2a2d2:'',
		a2b1:'',a2b1d1:'',a2b1d2:'',
		a2b2:'',a2b2d1:'',a2b2d2:'',
		b1a1:'',b1a1d1:'',b1a1d2:'',
		b1a2:'',b1a2d1:'',b1a2d2:'',
		b1b1:'',b1b1d1:'',b1b1d2:'',
		b1b2:'',b1b2d1:'',b1b2d2:'',
		b2a1:'',b2a1d1:'',b2a1d2:'',
		b2a2:'',b2a2d1:'',b2a2d2:'',
		b2b1:'',b2b1d1:'',b2b1d2:'',
		b2b2:'',b2b2d1:'',b2b2d2:''
		}
		this.saveChanges = this.saveChanges.bind(this);
		this.savedMessage = this.savedMessage.bind(this);
	}


	componentDidMount() {
		const {user_id} = this.props
		axios.get(`/cards/binary/${user_id}`)
			.then((res) => this.setState(res.data.o1))
	}

	changeHandler(target,val){
		this.setState({[target]:val})
	}

	saveChanges() {
		// const {user_id} = this.props
		axios.put(`/cards/14`, {
				card_name    : null,
				card_birth   : null,
				card_death   : null,
				spouse_name  : null,
				spouse_birth : null,
				spouse_death : null,
				o1           : this.state
		})
		this.savedMessage();
	}

	savedMessage () {
		let saved = true;
		setTimeout(() => {this.setState({saved: false})}, 5000);
		return (
			<frosted-glass overlay-color="rgba(255,255,255,.25)" blur-amount=".75rem" class={saved ? `saved-message-container saved-message-visible` : `saved-message-container`}>
				<div className="saved-message"><a>Family Tree Saved</a></div>
			</frosted-glass>
		)
	}

	render() {
		const {saved} = this.state;
		console.log(this.state)
		return (
			<div className="binary-blanket-wrapper">
				<div className="binary-header"><h1>Enter in your family tree</h1></div>
				<div className="binary-blanket">
					<div className="level4">
						<div className="binary-pair inner-level-4">
							<PairCard n={'a1a1'} d1={'a1a1d1'} d2={'a1a1d2'} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							<PairCard n={'a1a2'} d1={'a1a2d1'} d2={'a1a2d2'} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
						</div>
						<div className="binary-pair inner-level-4">
							<PairCard n={'a1b1'} d1={'a1b1d1'} d2={'a1b1d2'} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							<PairCard n={'a1b2'} d1={'a1b2d1'} d2={'a1b2d2'} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
						</div>
						<div className="binary-pair inner-level-4">
							<PairCard n={'a2a1'} d1={'a2a1d1'} d2={'a2a1d2'} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							<PairCard n={'a2a2'} d1={'a2a2d1'} d2={'a2a2d2'} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
						</div>
						<div className="binary-pair inner-level-4">
							<PairCard n={'a2b1'} d1={'a2b1d1'} d2={'a2b1d2'} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							<PairCard n={'a2b2'} d1={'a2b2d1'} d2={'a2b2d2'} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
						</div>
						<div className="binary-pair inner-level-4">
							<PairCard n={'b1a1'} d1={'b1a1d1'} d2={'b1a1d2'} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							<PairCard n={'b1a2'} d1={'b1a2d1'} d2={'b1a2d2'} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
						</div>
						<div className="binary-pair inner-level-4">
							<PairCard n={'b1b1'} d1={'b1b1d1'} d2={'b1b1d2'} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							<PairCard n={'b1b2'} d1={'b1b2d1'} d2={'b1b2d2'} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
						</div>
						<div className="binary-pair inner-level-4">
							<PairCard n={'b2a1'} d1={'b2a1d1'} d2={'b2a1d2'} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							<PairCard n={'b2a2'} d1={'b2a2d1'} d2={'b2a2d2'} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
						</div>
						<div className="binary-pair inner-level-4">
							<PairCard n={'b2b1'} d1={'b2b1d1'} d2={'b2b1d2'} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							<PairCard n={'b2b2'} d1={'b2b2d1'} d2={'b2b2d2'} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
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
						<div className="binary-pair inner-level-3">
							<PairCard n={'a1a'} d1={'a1ad1'} d2={'a1ad2'} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							<PairCard n={'a1b'} d1={'a1bd1'} d2={'a1bd2'} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
						</div>
						<div className="binary-pair inner-level-3">
							<PairCard n={'a2a'} d1={'a2ad1'} d2={'a2ad2'} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							<PairCard n={'a2b'} d1={'a2bd1'} d2={'a2bd2'} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
						</div>
						<div className="binary-pair inner-level-3">
							<PairCard n={'b1a'} d1={'b1ad1'} d2={'b1ad2'} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							<PairCard n={'b1b'} d1={'b1bd1'} d2={'b1bd2'} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
						</div>
						<div className="binary-pair inner-level-3">
							<PairCard n={'b2a'} d1={'b2ad1'} d2={'b2ad2'} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							<PairCard n={'b2b'} d1={'b2bd1'} d2={'b2bd2'} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
						</div>
					</div>
					<div className="connector-wrapper-2">
						<div className="connector2-3"></div>
						<div className="connector2-3"></div>
					</div>


	{/* // sanity spacing */}

					<div className="level2">
						<div className="binary-pair inner-level-2">
							<PairCard n={'a1'} d1={'a1d1'} d2={'a1d2'} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							<PairCard n={'a2'} d1={'a2d1'} d2={'a2d2'} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
						</div>
						<div className="binary-pair inner-level-2">
							<PairCard n={'b1'} d1={'b1d1'} d2={'b1d2'} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							<PairCard n={'b2'} d1={'b2d1'} d2={'b2d2'} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
						</div>
					</div>

					<div className="connector-wrapper-1">
						<div className="connector1-2"></div>
					</div>

	{/* // sanity spacing */}

					<div className="level1">
						<div className="binary-pair inner-level-1">
							<PairCard n={'a'} d1={'ad1'} d2={'ad2'} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							<PairCard n={'b'} d1={'bd1'} d2={'bd2'} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
						</div>
					</div>
				</div>
				<div className="save-div"><button onClick={() => this.saveChanges()}>Save Changes</button></div>
				{/* {this.savedMessage()} */}
			</div>
		)
	}
}

function mapStateToProps ( state ) {return { user_id: state.user_id }};
export default connect ( mapStateToProps )( BinaryBlanket );