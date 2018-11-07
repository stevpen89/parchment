import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUser, deleteUser } from '../../ducks/auth0'
import axios from 'axios'
import Menu from './Menu/Menu'
import UserMenu from './UserMenu/UserMenu'
import logo from './logo.svg'
import './Nav.css'

class Nav extends Component {
	constructor(){
		super()
		this.state={
			menuOpen: false,
			userMenuOpen: false,
			scrolled: true,
			refresh: true
		}
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.openMenu = this.openMenu.bind(this);
		this.openMenu = this.openMenu.bind(this);
		this.openUserMenu = this.openUserMenu.bind(this);
		this.refreshMenu = this.refreshMenu.bind(this);
	}

	componentDidMount() {
		//writes the user object to redux
		axios.get('/api/user-data').then(response => this.props.setUser(response.data));

		//detects if user is at the top of the page or not
		this.scrollPage();
	}

	//watches for changing url, if seen, refresh the menu
	// componentWillMount() { this.unlisten = this.props.history.listen((location, action) => {this.refreshMenu()}) }

	//unmounts the url listener
	// componentWillUnmount() { this.unlisten() }

  //authZero
  login() {
		const { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;
		console.log(window.location.origin)
    const url = `${window.location.origin}/auth/callback`;
    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`
	}

	//clears redux and deletes the session
	logout() { axios.get('/api/logout').then(this.props.deleteUser()); this.openUserMenu(); }
	
	//opens and closes the menus
	openMenu () { this.setState({menuOpen: !this.state.menuOpen}) }
	openUserMenu () { this.setState({userMenuOpen: !this.state.userMenuOpen}) }

	//refreshes the menu to avoid the frosted glass bug
	refreshMenu () { setTimeout(() => {this.setState({refresh: false})}, 0); setTimeout(() => {this.setState({refresh: true})}, 0) }

	//changes the nav's style if page is scrolled
	scrollPage () {
		document.addEventListener('scroll', () => {
			const scrolled = window.scrollY < 100;
			if(scrolled !== this.state.scrolled) {this.setState({ scrolled })}
		});
	}

	render() {
		const { openMenu, openUserMenu, login, logout } = this
		const { menuOpen, userMenuOpen, scrolled, refresh } = this.state
		const { user_id, auth_picture, userCart } = this.props
		if (refresh) {
		return (
			<div>
				<div class="nav-container transparent">
				{/* <frosted-glass overlay-color="rgba(255,255,255,.5)" blur-amount={scrolled ? `.75rem` : `.75rem`} class="nav-container"> */}
					<div className="nav">
						<div className="nav-left" onClick={() => openMenu()}><i className="fas fa-bars menu-button menu-icon"></i></div>
						<div><Link to="/"><img src={logo} alt="parchment" height="90px" className="menu-button"/></Link></div>
						<div className="nav-right">
							<Link to="/cart"><i className="fas fa-shopping-bag menu-button menu-icon"></i></Link>
							{userCart.length !== 0 ? <div className="shopping-bubble"><a>{userCart.length}</a></div> : null}
							{
								user_id ?
								<div className="user-profile">
									{/* <a className="menu-button" onClick={() => logout()}>Logout</a> */}
									<img src={auth_picture} alt="user profile" onClick={() => openUserMenu()} />
								</div>
								:
								<a className="menu-button" onClick={() => login()}>Login</a>
							}
						</div>
					</div>
				</div>
				<Menu menuOpen={menuOpen}/>
				<UserMenu userMenuOpen={userMenuOpen} logout={logout}/>
			</div>
		)}
		else { return (<div></div>) }
	}
}

function mapStateToProps  ( state ) { return { user_id: state.auth0.user_id, auth_picture: state.auth0.auth_picture, userCart: state.products.userCart } };
export default withRouter ( connect ( mapStateToProps, { setUser, deleteUser } )(Nav) );