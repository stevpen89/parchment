import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './Menu.css'

class Menu extends Component {
	render() {
		const {menuOpen} = this.props
		return (
				<frosted-glass overlay-color="rgba(255,255,255,.5)" blur-amount=".75rem" class='menu' style={menuOpen ? {width: `300px`} : {width: `0px`}}>
				<div className="menu-container">
					<div className="menu-content">
						<ul>
							<Link to="/"><li><i class="fas fa-home"></i> Home</li></Link>
							<Link to="/products"><li><i class="fas fa-shopping-basket"></i> Products</li></Link>
							<Link to="/products"><li><i class="fas fa-book-open"></i> Journals</li></Link>
							<Link to="/products"><li><i class="fas fa-bed"></i> Blankets</li></Link>
							<Link to="/about"><li><i class="fas fa-info-circle"></i> About</li></Link>
							<Link to="/contact"><li><i class="fas fa-users"></i> Contact</li></Link>
						</ul>
					</div>
				</div>
				</frosted-glass>
		)
	}
}

export default Menu