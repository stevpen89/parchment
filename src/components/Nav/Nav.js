import React, { Component } from 'react'
import Menu from '../Menu/Menu'
import './Nav.css'

class Nav extends Component {
	constructor(){
		super()
		this.state={
			menuOpen: false,
			scrolled: true
		}
		this.openMenu = this.openMenu.bind(this);
	}

	componentDidMount() {this.scrollPage()}

	//opens and closes the menu
	openMenu () {this.setState({menuOpen: !this.state.menuOpen})}

	//changes the nav's style if page is scrolled
	scrollPage () {
		document.addEventListener('scroll', () => {
			const scrolled = window.scrollY < 100;
			if(scrolled !== this.state.scrolled) {this.setState({ scrolled })}
		});
	}

	render() {
		const {openMenu} = this
		const {menuOpen, scrolled} = this.state
		return (
			<div>
				<frosted-glass overlay-color="rgba(255,255,255,.5)" blur-amount={scrolled ? `1.6rem` : `1.6rem`} class="nav-container">
					<div className="nav">
						<div onClick={() => openMenu()}><i className="fas fa-bars menu-button"></i></div>
						<div><h1>PARCHMENT</h1></div>
						<div>
							<a className="menu-button">Login</a>
							<i className="fas fa-shopping-cart menu-button"></i>
						</div>
					</div>
				</frosted-glass>
				<Menu menuOpen={menuOpen}/>
			</div>
		)
	}
}

export default Nav