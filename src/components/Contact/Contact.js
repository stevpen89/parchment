import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Contact extends Component {
	constructor(){
		super()
		this.state={
			subject: '',
			email: '',
			content: ''
		}
	}

	handleInput(val,target){
		this.setState({[target]:val})
	}

	sendMessage() {
		const { subject, email, content } = this.state
		axios.post ( 'api/mail', {subject, email, content} ).then( () => this.props.history.push('/') )
	}

	render() {
		return (
			<div className="content">
				<input onChange={ (e)=>this.handleInput(e.target.value, 'subject') } placeholder="Subject"/>
				<input onChange={ (e)=>this.handleInput(e.target.value, 'email') }   placeholder="Email"/>
				<input onChange={ (e)=>this.handleInput(e.target.value, 'content') } placeholder="Message" type="textarea"/>
				<button onClick={() => this.sendMessage()}>Send</button>
			</div>
		)
	}
}

export default withRouter ( Contact )