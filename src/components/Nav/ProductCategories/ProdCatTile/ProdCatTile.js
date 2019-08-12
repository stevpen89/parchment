import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ProdCatTile.css'

export default class ProdCatTile extends Component {
	constructor(){
		super()
		
	}

	render() {
		const {title,img,desc} = this.props
		return (
			<div className="ProdCatTile-Wrapper">
				<div className="ProdCatTile-Header">
					<div className="ProdCatTile-Title">
						{title}
					</div>
				</div>
				<div className="ProdCatTile-Upper">
					<div className="ProdCatTile-Image">
						{img}
					</div>
				</div>
				<div className="ProdCatTile-Lower">
					<div className="ProdCatTile-Description">
						{desc}
					</div>
				</div>
			</div>
		)
	}
}
