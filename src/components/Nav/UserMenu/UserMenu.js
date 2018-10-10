import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './UserMenu.css'

class UserMenu extends Component {	
	render() {
		const {userMenuOpen, logout} = this.props
		return (
				<frosted-glass overlay-color="rgba(255,255,255,.25)" blur-amount=".75rem" class='user-menu' style={userMenuOpen ? {height: `112px`} : {height: `0`}}>
				<div className="user-menu-container">
					<div className="user-menu-content">
						<ul>
							<Link to="/account"><li>Account</li></Link>
							<li onClick={() => logout()}>Logout</li>
						</ul>
					</div>
				</div>
				</frosted-glass>
		)
	}
}

export default UserMenu