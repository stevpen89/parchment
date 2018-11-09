import React, { Component } from 'react'
import axios from 'axios'

export default class Tools extends Component {
	constructor(){
		super()
		this.state={
			address:'',
			subject:'',
			content:''
		}
	}

	hitMailgun(){
		const {address,subject,content} = this.state
		console.log('attempting mailgun...')
		axios.post('/api/mail',{address,subject,content}).then((res)=>{console.log(res.data)})
	}

	handleChange(val,target){
		this.setState({[target]:val})
	}



	render() {
		return (
			<div>
				This is Where the Mailgun stuff goes
				<input placeholder='to'   		onChange={(e)=>this.handleChange(e.target.value,'address')}/>
				<input placeholder='subject' 	onChange={(e)=>this.handleChange(e.target.value,'subject')}/>
				<input placeholder='content' 	onChange={(e)=>this.handleChange(e.target.value,'content')}/>
				<input placeholder='product' 	onChange={(e)=>this.handleChange(e.target.value,'product')}/>
				<button onClick={()=>this.hitMailgun()}>Fire In The Hole...</button>
			</div>
		)
	}
}
