import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import States from '../Nav/Menu/Dropdowns/States'
import Countries from '../Nav/Menu/Dropdowns/Countries'
import './MissionaryJournalSelector.css'


class MissionaryJournalSelector extends Component {
	render() {
		return (
			<div className="MJS-Wrapper">
				<div className="MJS-Header">
					<h1  className="MJS-Header-Text">Please Select a Country or State from the Lists Below</h1>
				</div>
				<div className="MJS-Body">
					<div className="MJS-Body-Dropdown">
						<Countries/>
					</div>
					<div className="MJS-Body-Dropdown">
						<States/>
					</div>
				</div>
			</div>
		)
	}
}
export default MissionaryJournalSelector