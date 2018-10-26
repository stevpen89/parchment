import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './UserMenu.css'

class UserMenu extends Component {	
	render() {
		const {user_name, userMenuOpen, logout} = this.props
		return (
				<frosted-glass overlay-color="rgba(255,255,255,.25)" blur-amount=".75rem" class='user-menu' style={userMenuOpen ? {height: `112px`} : {height: `0`}}>
				<div className="user-menu-container">
					<div className="user-menu-content">
						<ul>
							<Link to="/account"><li>{user_name}</li></Link>
							<li onClick={() => logout()}>Logout</li>
						</ul>
					</div>
				</div>
				</frosted-glass>
		)
	}
}

function mapStateToProps  ( state ) { return { user_name: state.auth0.user_name } };
export default connect ( mapStateToProps )(UserMenu);