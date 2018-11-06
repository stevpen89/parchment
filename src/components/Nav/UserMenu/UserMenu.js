import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './UserMenu.css'

class UserMenu extends Component {	
	render() {
		const {user_name, userMenuOpen, logout, admin} = this.props
		return (
			<div className='user-menu transparent' style={userMenuOpen ? {height: `112px`} : {height: `0`}}>
				<div className="user-menu-container">
					<div className="user-menu-content">
						<ul>
							<Link to={admin === 'admin' ? "/admin" : "/account"}><li>{user_name}</li></Link>
							<li onClick={() => logout()}>Logout</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps  ( state ) { return { user_name: state.auth0.user_name , admin:state.auth0.user_admin} };
export default connect ( mapStateToProps )(UserMenu);