import React, { Component } from 'react'
import './Journal.css'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class Journal extends Component {
	constructor () {
		super()
		this.state = {
			i: 0,
			inputs: [{x: 0, y: 0, w: 25, h: 25}, {x: 0, y: 0, w: 25, h: 25}, {x: 0, y: 0, w: 25, h: 25}],
			x: 0,
			y: 0,
			w: 25,
			h: 15
		}
	}

	handleInput (val,target) {this.setState({[target]:val})}
	
	addInput () {
		let newInputs = [...this.state.inputs];
		newInputs.push({x: 0, y: 0, w: 25, h: 25});
		this.setState({inputs: newInputs});
	}

	removeInput () {
		let newInputs = [...this.state.inputs];
		// newInputs.splice();
	}

	render() {
		console.log(this.state)
		const {x, y, w, h, inputs} = this.state
		return (
			<div className="content">
				<div className="journal-editor-wrapper">
					<div className="journal-input" style={{top: `${y}%`, left: `${x}%`, width: `${w}%`, height: `${h}%`}}></div>
				</div>

				<div className="journal-controls">

					<button onClick={() => this.addInput()}>Add Input</button>
					<button>Remove Input</button><br />

					<div className="journal-selector">
					{inputs.map((x, i) => {
						return (
							<button onClick={() => this.setState({i})} className={this.state.i === i ? `journal-button journal-button-selected` : `journal-button`}>{i + 1}</button>
						)
					})}
					</div><br /><br /><br />

					<a>x axis: <input onChange={(e)=>this.handleInput(e.target.value,'x')} placeholder="x" value={x}></input>%</a>
					<Slider min={0} max={95} value={x} className="journal-slider" onChange={(e)=>this.handleInput(e,'x')}/>

					<a>y axis: <input onChange={(e)=>this.handleInput(e.target.value,'y')} placeholder="y" value={y}></input>%</a>
					<Slider min={0} max={95} value={y} className="journal-slider" onChange={(e)=>this.handleInput(e,'y')}/>

					<a>width: <input onChange={(e)=>this.handleInput(e.target.value,'w')} placeholder="w" value={w}></input>%</a>
					<Slider min={5} max={100 - x} value={w} className="journal-slider" onChange={(e)=>this.handleInput(e,'w')}/>

					<a>height: <input onChange={(e)=>this.handleInput(e.target.value,'h')} placeholder="h" value={h}></input>%</a>
					<Slider min={5} max={100 - y} value={h} className="journal-slider" onChange={(e)=>this.handleInput(e,'h')}/>
				</div>
			</div>
		)
	}
}

export default Journal