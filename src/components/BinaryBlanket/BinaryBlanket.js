import React, { Component } from 'react'
import './BinaryBlanket.css'

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
			b2b2:'',b2b2d1:'',b2b2d2:'',

		}
	}

	changeHandler(target,val){
		this.setState({[target]:val})
		console.log(val)
	}

	render() {
		
		return (
			<div className="binary-blanket">
				<div className="level4">
					<div className="binary-pair inner-level-4">
						<div className="person">
							<div className="name">
								<h3>Father</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('a1a1',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('a1a1d1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('a1a1d2',e.target.value)}/>
							</div>
						</div>
						<div className="person">
							<div className="name">
								<h3>Mother</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('a1a2',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('a1a2d1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('a1a2d2',e.target.value)}/>
							</div>
						</div>
					</div>
					<div className="binary-pair inner-level-4">
						<div className="person">
							<div className="name">
								<h3>Father</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('a1b1',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('a1b1d1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('a1b1d2',e.target.value)}/>
							</div>
						</div>
						<div className="person">
							<div className="name">
								<h3>Mother</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('a1b2',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('a1b2d1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('a1b2d2',e.target.value)}/>
							</div>
						</div>
					</div>
					<div className="binary-pair inner-level-4">
						<div className="person">
							<div className="name">
								<h3>Father</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('a2a1',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('a2a1d1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('a2a1d2',e.target.value)}/>
							</div>
						</div>
						<div className="person">
							<div className="name">
								<h3>Mother</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('a2a2',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('a2a2d1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('a2a2d2',e.target.value)}/>
							</div>
						</div>
					</div>
					<div className="binary-pair inner-level-4">
						<div className="person">
							<div className="name">
								<h3>Father</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('a2b1',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('a2b1d1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('a2b1d2',e.target.value)}/>
							</div>
						</div>
						<div className="person">
							<div className="name">
								<h3>Mother</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('a2b2',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('a2b2d1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('a2b2d2',e.target.value)}/>
							</div>
						</div>
					</div>
					<div className="binary-pair inner-level-4">
						<div className="person">
							<div className="name">
								<h3>Father</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('b1a1',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('b1a1d1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('b1a1d2',e.target.value)}/>
							</div>
						</div>
						<div className="person">
							<div className="name">
								<h3>Mother</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('b1a2',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('b1a2d1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('b1a2d2',e.target.value)}/>
							</div>
						</div>
					</div>
					<div className="binary-pair inner-level-4">
						<div className="person">
							<div className="name">
								<h3>Father</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('b1b1',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('b1b1d1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('b1b1d2',e.target.value)}/>
							</div>
						</div>
						<div className="person">
							<div className="name">
								<h3>Mother</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('b1b2',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('b1b2d1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('b1b2d2',e.target.value)}/>
							</div>
						</div>
					</div>
					<div className="binary-pair inner-level-4">
						<div className="person">
							<div className="name">
								<h3>Father</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('b2a1',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('b2a1d1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('b2a1d2',e.target.value)}/>
							</div>
						</div>
						<div className="person">
							<div className="name">
								<h3>Mother</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('b2a2',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('b2a2d1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('b2a2d2',e.target.value)}/>
							</div>
						</div>
					</div>
					<div className="binary-pair inner-level-4">
						<div className="person">
							<div className="name">
								<h3>Father</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('b2b1',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('b2b1d1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('b2b1d2',e.target.value)}/>
							</div>
						</div>
						<div className="person">
							<div className="name">
								<h3>Mother</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('b2b2',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('b2b2d1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('b2b2d2',e.target.value)}/>
							</div>
						</div>
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
						<div className="person">
							<div className="name">
								<h3>Father</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('a1a',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('a1ad1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('a1ad2',e.target.value)}/>
							</div>
						</div>
						<div className="person">
							<div className="name">
								<h3>Mother</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('a1b',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('a1bd1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('a1bd2',e.target.value)}/>
							</div>
						</div>
					</div>
					<div className="binary-pair inner-level-3">
						<div className="person">
							<div className="name">
								<h3>Father</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('a2a',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('a2ad1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('a2ad2',e.target.value)}/>
							</div>
						</div>
						<div className="person">
							<div className="name">
								<h3>Mother</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('a2b',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('a2bd1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('a2bd2',e.target.value)}/>
							</div>
						</div>
					</div>
					<div className="binary-pair inner-level-3">
						<div className="person">
							<div className="name">
								<h3>Father</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('b1a',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('b1ad1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('b1ad2',e.target.value)}/>
							</div>
						</div>
						<div className="person">
							<div className="name">
								<h3>Mother</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('b1b',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('b1bd1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('b1bd2',e.target.value)}/>
							</div>
						</div>
					</div>
					<div className="binary-pair inner-level-3">
						<div className="person">
							<div className="name">
								<h3>Father</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('b2a',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('b2ad1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('b2ad2',e.target.value)}/>
							</div>
						</div>
						<div className="person">
							<div className="name">
								<h3>Mother</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('b2b',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('b2bd1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('b2bd2',e.target.value)}/>
							</div>
						</div>
					</div>
				</div>
				<div className="connector-wrapper-2">
					<div className="connector2-3"></div>
					<div className="connector2-3"></div>
				</div>


{/* // sanity spacing */}

				<div className="level2">
					<div className="binary-pair inner-level-2">
						<div className="person">
							<div className="name">
								<h3>Father</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('a1',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('a1d1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('a1d2',e.target.value)}/>
							</div>
						</div>
						<div className="person">
							<div className="name">
								<h3>Mother</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('a2',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('a2d1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('a2d2',e.target.value)}/>
							</div>
						</div>
					</div>
					<div className="binary-pair inner-level-2">
						<div className="person">
							<div className="name">
								<h3>Father</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('b1',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('b1d1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('b1d2',e.target.value)}/>
							</div>
						</div>
						<div className="person">
							<div className="name">
								<h3>Mother</h3>
								<input placeholder='name' onChange={(e)=>this.changeHandler('b2',e.target.value)}/>
							</div>
							<div className="dates">
								<input placeholder='birth date' onChange={(e)=>this.changeHandler('b2d1',e.target.value)}/>
								<input placeholder='death date' onChange={(e)=>this.changeHandler('b2d2',e.target.value)}/>
							</div>
						</div>
					</div>
				</div>

				<div className="connector-wrapper-1">
					<div className="connector1-2"></div>
				</div>

{/* // sanity spacing */}

				<div className="level1">
					<div className="binary-pair inner-level-1">
					<div className="person">
						<div className="name">
							<h3>Father</h3>
							<input placeholder='name' onChange={(e)=>this.changeHandler('a',e.target.value)}/>
						</div>
						<div className="dates">
							<input placeholder='birth date' onChange={(e)=>this.changeHandler('ad1',e.target.value)}/>
							<input placeholder='death date' onChange={(e)=>this.changeHandler('ad2',e.target.value)}/>
						</div>
					</div>
					<div className="person">
						<div className="name">
						<h3>Mother</h3>
							<input placeholder='name' onChange={(e)=>this.changeHandler('b',e.target.value)}/>
						</div>
						<div className="dates">
							<input placeholder='birth date' onChange={(e)=>this.changeHandler('bd1',e.target.value)}/>
							<input placeholder='death date' onChange={(e)=>this.changeHandler('bd2',e.target.value)}/>
						</div>
					</div>
					</div>
				</div>
			</div>
		)
	}
}

export default BinaryBlanket
