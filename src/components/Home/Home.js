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
					<Link to="/products/blanket/family/history" className="product-link">
						<div id="home-tile">
							<div className="hero-1 home-banner"></div>
							<div id="hero-text">Personalized Family History Blankets</div>
						</div>
					</Link>
					<Link to="/products/journal/missionary" className="product-link">
						<div id="home-tile">
							<div className="hero-3 home-banner"></div>
							<div id="hero-text">Laser Engraved Missionary Journals</div>
						</div>
					</Link>
					<Link to="/products/print/family/history" className="product-link">
						<div id="home-tile">
							<div className="hero-4 home-banner"></div>
							<div id="hero-text">Personalized Family History Prints</div>
						</div>
					</Link>
					<Link to="/products/journal/everyday" className="product-link">
						<div id="home-tile">
							<div className="hero-5 home-banner"></div>
							<div id="hero-text">Laser Engraved Everyday Journals</div>
						</div>
					</Link>
					<Link to="/products/blanket/holiday" className="product-link">
						<div id="home-tile">
							<div className="hero-2 home-banner"></div>
							<div id="hero-text">Personalized Blankets</div>
						</div>
					</Link>
				</div>
		  </div>
		)
	}
}

export default Home
