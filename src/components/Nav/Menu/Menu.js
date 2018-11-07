import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './Menu.css'

class Menu extends Component {
	render() {
		const {menuOpen} = this.props
		return (
				<div className='menu transparent' style={menuOpen ? {width: `300px`} : {width: `0px`, pointerEvents: `none`}}>
				<div className="menu-container">
					<div className="menu-content">
						<ul>
							<Link to="/">									<li><i className="fas fa-home">							</i> Home				</li></Link>
							<Link to="/products">					<li><i className="fas fa-shopping-basket">	</i> Products		</li></Link>
							<Link to="/products/journal">	<li><i className="fas fa-book-open">				</i> Journals		</li></Link>
							<Link to="/products/blanket">	<li><i className="fas fa-bed">							</i> Blankets		</li></Link>
							{/* <Link to="/about">						<li><i className="fas fa-info-circle">			</i> About			</li></Link> */}
							<Link to="/contact">					<li><i className="fas fa-users">						</i> Contact		</li></Link>
						</ul>
					</div>
				</div>
				</div>
		)
	}
}

export default Menu