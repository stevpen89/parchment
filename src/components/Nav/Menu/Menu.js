import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import States from './Dropdowns/States'
import Countries from './Dropdowns/Countries'
import './Menu.css'

class Menu extends Component {
	render() {
		const {menuOpen} = this.props
		return (
				<div className='menu transparent' style={menuOpen ? {width: `300px`} : {width: `0px`, pointerEvents: `none`}}>
				<div className="menu-container">
					<div className="menu-content">
						<ul>
							<Link to="/">									                <li><i className="fas fa-home">										</i> Home</li></Link>
							<Link to="/products/categories">					    <li><i className="fas fa-shopping-basket">				</i> Products</li></Link>
							<Link to="/products/blanket/family/history">	<li><i className="fas fa-bed">										</i> Family History Blankets</li></Link>
							<Link to="/products/print/family/history">	  <li><i className="fas fa-image">									</i> Family History Prints</li></Link>
							<Link to="/missionaryJournalSelector">	    	<li><i className="fas fa-user-tie">				  			</i> Missonary Journals</li></Link>
																														<li><i className="fas fa-globe-americas indented"></i><States/></li>
																														<li><i className="fas fa-flag indented">					</i><Countries/></li>
							<Link to="/products/journal/everyday">	      <li><i className="fas fa-book-open">							</i> Everyday Journals</li></Link>
							<Link to="/products/blanket/holiday">	        <li><i className="fas fa-snowflake"> 							</i> Personalized Blankets</li></Link>
							<Link to="/products/blanket/baby">	        	<li><i className="fas fa-cubes">									</i> Baby Blankets</li></Link>
							<Link to="/about">						                <li><i className="fas fa-info-circle">						</i> About</li></Link>
							<Link to="/contact">					                <li><i className="fas fa-users">									</i> Contact</li></Link>
						</ul>
					</div>
				</div>
				</div>
		)
	}
}

export default Menu