import React, { Component } from 'react'
import Carousel from '../Carousel/Carousel'

class Home extends Component {
	constructor(){
		super()
		this.state={}
	}
	render() {
		return (
			<div>
				This is Home
				<Carousel/>
				<div>Insert Banner Image1 Here</div>
				<div>Insert Banner Image2 Here</div>
				<div>Insert Banner Image3 Here</div>
				<div>Insert Banner Image4 Here</div>
			</div>
		)
	}
}

export default Home
