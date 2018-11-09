import React, { Component } from 'react'
import { Link } from 'react-router-dom';
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
					<Link to="/products/blanket/family/history"><div className="hero-1">Personalized Family History Blankets</div></Link>
					<Link to="/products/print/family/history"><div className="hero-4">Personalized Family History Prints</div></Link>
					<Link to="/products/journal"><div className="hero-3">Personalized Laser Engraved Journals</div></Link>
					<Link to="/products/blanket/holiday"><div className="hero-2">Personalized Holiday Blankets</div></Link>
				</div>
		  </div>
		)
	}
}

export default Home
