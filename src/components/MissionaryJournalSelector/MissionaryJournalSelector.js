import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import States from '../Nav/Menu/Dropdowns/States'
import Countries from '../Nav/Menu/Dropdowns/Countries'

class MissionaryJournalSelector extends Component {
	render() {
		return (
			<div className="MJS-Wrapper">
				<div className="MJS-Header">
					<h1  className="MJS-Header-Text"></h1>
				</div>
				<div className="MJS-Body">
					<div className="MJS-Body-Left">
						<Countries/>
					</div>
					<div className="MJS-Body-Right">
						<States/>
					</div>
				</div>
			</div>
		)
	}
}
export default MissionaryJournalSelector