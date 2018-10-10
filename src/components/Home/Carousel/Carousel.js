import React, { Component } from 'react'
import './Carousel.css'

class Carousel extends Component {
	constructor(){
		super()
		this.state={}
	}
	render() {
		return (
			<div className="carousel">
				<h1>Parchment</h1>
				<a>Lorem ipsum dolor sit amet, consectetur elit.</a><br />
				<button>Check it out</button>
			</div>
		)
	}
}

export default Carousel
