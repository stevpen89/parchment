import React, { Component } from 'react'
import axios from 'axios'
import './Tools.css'
/*eslint no-unused-expressions: ["error", {"allowTernary": true }]*/

export default class Tools extends Component {
	constructor(){
		super()
		this.state={
			orderNumber:null,
			returnedOrder:'',
			familyTree:[],

		}
	}

	// fetchOrder(){
	// 	const {orderNumber, returnedOrder, familyTree} = this.state
	// 	axios.get(`/orders/retrieve/${orderNumber}`).then((res)=>{
	// 		this.setState({returnedOrder:res.data})
	// 	}).then(()=>{
	// 		let details = {}
	// 		returnedOrder ? details = JSON.parse(returnedOrder[0].products) : null;
	// 		returnedOrder ? this.setState({familyTree:details[0].info.familyTree}) : null;
	// 	}).then(()=>{
	// 		returnedOrder ? console.log('family tree:', familyTree) : null;
	// 	})

	// }



	// hitMailgun(){
	// 	const {address,subject,content} = this.state
	// 	console.log('attempting mailgun...')
	// 	axios.post('/api/mail',{address,subject,content}).then((res)=>{console.log(res.data)})
	// }

	handleChange(val,target){
		this.setState({[target]:val})
	}



	render() {
		let {returnedOrder, familyTree} = this.state
		
		// .info.familyTree[0].card_id
		return (
			<div>
				<input onChange={e => this.handleChange(e.target.value,'orderNumber')}/>
				{/* <button onClick={()=>this.fetchOrder()}>Retrieve Order: GO!</button> */}
				<div>
					{familyTree ? 
										<div className="admin-level1-wrapper">{familyTree.map((x,y)=>{
							return 				x.parent_id === 0 ?
 											<div className="admin-level1">
												<div>{x.card_name}</div>
												<div>{x.card_birth}</div>
												<div>{x.card_death}</div>
												<div>{x.spouse_name}</div>
												<div>{x.spouse_birth}</div>
												<div>{x.spouse_death}</div>
												<div className="admin-level2-wrapper">{familyTree.map((a,b)=>{
												return 	a.parent_id === x.card_id ?
													<div className="admin-level2">
														<div>{a.card_name}</div>
														<div>{a.card_birth}</div>
														<div>{a.card_death}</div>
														<div>{a.spouse_name}</div>
														<div>{a.spouse_birth}</div>
														<div>{a.spouse_death}</div>
														<div className="admin-level3-wrapper">{familyTree.map((r,s)=>{
															return r.parent_id === a.card_id ?
															<div className="admin-level3">
																<div>{r.card_name}</div>
																<div>{r.card_birth}</div>
																<div>{r.card_death}</div>
																<div>{r.spouse_name}</div>
																<div>{r.spouse_birth}</div>
																<div>{r.spouse_death}</div>
															</div> : null;
														})}</div>
													</div> : null
												})}</div>
											</div>: null})}
										</div> : null}
				</div>
			</div>
		)
	}
}
