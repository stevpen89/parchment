import React, { Component } from 'react'
import Carousel from './Carousel/Carousel'
import './Home.css'

class Home extends Component {
	constructor(){
		super()
		this.state={}
	}
	render() {
		return (
			<div>
				<Carousel/>
				<div className="heros">
					<div className="hero-1"></div>
					<div className="hero-2"></div>
					<div className="hero-3"></div>
				</div>
		  </div>
		)
	}
}

export default Home
