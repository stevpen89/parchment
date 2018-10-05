import React, { Component } from 'react'
import Nav from '../../components/Nav/Nav'
import Carousel from '../Carousel/Carousel'
import './Home.css'

class Home extends Component {
	constructor(){
		super()
		this.state={}
	}
	render() {
		return (
			<div style={{marginTop: 0}}>
				<Nav/>
				<Carousel/>
				<div className="banners">
					<div className="banner-1"></div>
					<div className="banner-2"></div>
					<div className="banner-3"></div>
					<div className="banner-4"></div>
				</div>
		  </div>
		)
	}
}

export default Home
