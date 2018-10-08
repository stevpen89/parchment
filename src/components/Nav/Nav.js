import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Menu from '../Menu/Menu'
import logo from './logo.svg'
import './Nav.css'

class Nav extends Component {
	constructor(){
		super()
		this.state={
			menuOpen: false,
			scrolled: true,
			refresh: true
		}
		this.openMenu = this.openMenu.bind(this);
		this.refreshMenu = this.refreshMenu.bind(this);
	}

	componentDidMount() {this.scrollPage()}
	//watches for changing url, if seen, refresh the menu
	componentWillMount() {this.unlisten = this.props.history.listen((location, action) => {this.refreshMenu()})}
	//unmounts the url listener
  componentWillUnmount() {this.unlisten()}
	
	//opens and closes the menu
	openMenu () {this.setState({menuOpen: !this.state.menuOpen});}
	//refreshes the menu to avoid the frosted glass bug
	refreshMenu () {setTimeout(() => {this.setState({refresh: false})}, 0); setTimeout(() => {this.setState({refresh: true})}, 0)}
	//changes the nav's style if page is scrolled
	scrollPage () {
		document.addEventListener('scroll', () => {
			const scrolled = window.scrollY < 100;
			if(scrolled !== this.state.scrolled) {this.setState({ scrolled })}
		});
	}

	render() {
		const {openMenu} = this
		const {menuOpen, scrolled, refresh} = this.state
		if (refresh) {
		return (
			<div>
				<frosted-glass overlay-color="rgba(255,255,255,.5)" blur-amount={scrolled ? `1.6rem` : `1.6rem`} class="nav-container">
					<div className="nav">
						<div className="nav-left" onClick={() => openMenu()}><i className="fas fa-bars menu-button menu-icon"></i></div>
						<div><Link to="/"><img src={logo} alt="parchment" height="90px" className="menu-button"/></Link></div>
						<div className="nav-right">
							<a className="menu-button">Login</a>
							<i className="fas fa-shopping-bag menu-button menu-icon"></i>
						</div>
					</div>
				</frosted-glass>
				<Menu menuOpen={menuOpen}/>
			</div>
		)}
		else {return (<div></div>)}
	}
}

export default withRouter(Nav)