import React, { Component } from 'react'
// import './SingleBlanket.css'
import axios from 'axios'
import SingleCard from './SingleCard'
import {connect} from 'react-redux'

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
	}

	componentDidMount() {
		const {user_id} = this.props
		axios.get(`cards/single/${user_id}`).then((res)=>{this.setState({...res.data});
		console.log(this.state)	
	})
	}

	changeHandler(target,val){
		this.setState({[target]:val})
		console.log(this.state)
	}

	render() {
		
		return (
			<div>
				<div className="binary-blanket">
					<div className="level4">
						<div className="binary-pair inner-level-4">
							<SingleCard n={'a1a1'} d1={'a1a1d1'} d2={'a1a1d2'} callback={this.changeHandler.bind(this)} parent={'Father'}/>
						</div>
						<div className="binary-pair inner-level-4">
							<SingleCard n={'a1a2'} d1={'a1a2d1'} d2={'a1a2d2'} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
						</div>
						<div className="binary-pair inner-level-4">
							<SingleCard n={'a1b1'} d1={'a1b1d1'} d2={'a1b1d2'} callback={this.changeHandler.bind(this)} parent={'Father'}/>
						</div>
						<div className="binary-pair inner-level-4">
							<SingleCard n={'a1b2'} d1={'a1b2d1'} d2={'a1b2d2'} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
						</div>
						<div className="binary-pair inner-level-4">
							<SingleCard n={'a2a1'} d1={'a2a1d1'} d2={'a2a1d2'} callback={this.changeHandler.bind(this)} parent={'Father'}/>
						</div>
						<div className="binary-pair inner-level-4">
							<SingleCard n={'a2a2'} d1={'a2a2d1'} d2={'a2a2d2'} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
						</div>
						<div className="binary-pair inner-level-4">
							<SingleCard n={'a2b1'} d1={'a2b1d1'} d2={'a2b1d2'} callback={this.changeHandler.bind(this)} parent={'Father'}/>
						</div>
						<div className="binary-pair inner-level-4">
							<SingleCard n={'a2b2'} d1={'a2b2d1'} d2={'a2b2d2'} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
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
							<SingleCard n={'a1a'} d1={'a1ad1'} d2={'a1ad2'} callback={this.changeHandler.bind(this)} parent={'Father'}/>
						</div>
						<div className="binary-pair inner-level-3">
							<SingleCard n={'a1b'} d1={'a1bd1'} d2={'a1bd2'} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
						</div>
						<div className="binary-pair inner-level-3">
							<SingleCard n={'a2a'} d1={'a2ad1'} d2={'a2ad2'} callback={this.changeHandler.bind(this)} parent={'Father'}/>
						</div>
						<div className="binary-pair inner-level-3">
							<SingleCard n={'a2b'} d1={'a2bd1'} d2={'a2bd2'} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
						</div>
					</div>
					<div className="connector-wrapper-2">
						<div className="connector2-3"></div>
						<div className="connector2-3"></div>
					</div>


	{/* // sanity spacing */}

					<div className="level2">
						<div className="binary-pair inner-level-2">
							<SingleCard n={'a1'} d1={'a1d1'} d2={'a1d2'} callback={this.changeHandler.bind(this)} parent={'Father'}/>
						</div>
						<div className="binary-pair inner-level-2">
							<SingleCard n={'a2'} d1={'a2d1'} d2={'a2d2'} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
						</div>
					</div>

					<div className="connector-wrapper-1">
						<div className="connector1-2"></div>
					</div>

	{/* // sanity spacing */}

					<div className="level1">
						<div className="binary-pair inner-level-1">
							<SingleCard n={'a'} d1={'ad1'} d2={'ad2'} callback={this.changeHandler.bind(this)} parent={'Father'}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps ( state ) {return { user_id: state.user_id }};
export default connect ( mapStateToProps )( SingleBlanket );
