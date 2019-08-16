import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ProdCatTile.css'
import {Link} from 'react-router-dom'

export default class ProdCatTile extends Component {
	constructor(){
		super()
		
	}

	render() {
		const {title,img,desc,routingString} = this.props
		return (
			<Link to={`${routingString}`}>
				<div className="ProdCatTile-Wrapper">
					<div className="ProdCatTile-Header">
						<div className="ProdCatTile-Title">
							{title}
						</div>
					</div>
					<div className="ProdCatTile-Upper">
						<img className="ProdCatTile-Image" src={`${img}`}/>
					</div>
					<div className="ProdCatTile-Lower">
						<div className="ProdCatTile-Description">
							{desc}
						</div>
					</div>
				</div>
			</Link>
		)
	}
}
