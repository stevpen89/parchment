import React, { Component } from 'react'
import './JournalEditor.css'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import axios from 'axios';

class JournalEditor extends Component {
	constructor () {
		super()
		this.state = {
			i: 0,
			inputs: [{x: 0, y: 0, w: 25, h: 25, input: ''}]
		}
	}

	componentDidMount () {
		axios.get(`/products/${this.props.match.params.sku}`).then((res)=>{
			this.setState({inputs: JSON.parse(res.data[0].o1)})
		})
	}

	handleInput (val,target) {
		const {inputs, i} = this.state
		let newInputs = [...inputs]
		
		newInputs[i][target] = val
		this.setState({inputs: newInputs})
	}
	
	addInput () {
		let inputs = [...this.state.inputs];
		inputs.push({x: 0, y: 0, w: 25, h: 25, input: ''});
		this.setState({inputs, i: inputs.length-1});
	}

	removeInput () {
		let inputs = [...this.state.inputs];
		inputs.splice(this.state.i, 1);
		this.setState({inputs, i: inputs.length-1});
	}

	saveInputs () {
		axios.put(`/products/journal/${this.props.match.params.sku}`, {o1: JSON.stringify(this.state.inputs)}).then(res => console.log(res.data))
	}

	render() {
		const {i, inputs} = this.state
		return (
			<div className="content">
				<div className="journal-editor-wrapper">
					{inputs.map((x, i) => {
						return (
							<div className={this.state.i === i ? `journal-input journal-input-selected` : `journal-input`} onClick={() => this.setState({i})} style={{top: `${x.y}%`, left: `${x.x}%`, width: `${x.w}%`, height: `${x.h}%`}}>
								<a>{i + 1}</a>
							</div>
						)
					})}
				</div>

				<div className="journal-controls">
					

					<div className="journal-navigation">
						<div className="journal-add-buttons">
							<button onClick={() => this.addInput()}><i class="fas fa-plus"></i> Add Input</button>
							<button onClick={() => this.removeInput()} disabled={inputs.length === 1}><i class="fas fa-times"></i> Remove Input</button><br />
						</div>

						<div className="journal-selector">
						{inputs.map((x, i) => {
							return (
								<button onClick={() => this.setState({i})} className={this.state.i === i ? `journal-button journal-button-selected` : `journal-button`}>{i + 1}</button>
							)
						})}
						</div><br /><br /><br />< br/>
					</div>

					<a>x axis: <input onChange={(e)=>this.handleInput(e.target.value,'x')} value={inputs[i].x}></input>%</a>
					<Slider min={0} max={95} value={inputs[i].x} className="journal-slider" onChange={(e)=>this.handleInput(e,'x')}/>

					<a>y axis: <input onChange={(e)=>this.handleInput(e.target.value,'y')} value={inputs[i].y}></input>%</a>
					<Slider min={0} max={95} value={inputs[i].y} className="journal-slider" onChange={(e)=>this.handleInput(e,'y')}/>

					<a>width: <input onChange={(e)=>this.handleInput(e.target.value,'w')} value={inputs[i].w}></input>%</a>
					<Slider min={5} max={100 - inputs[i].x} value={inputs[i].w} className="journal-slider" onChange={(e)=>this.handleInput(e,'w')}/>

					<a>height: <input onChange={(e)=>this.handleInput(e.target.value,'h')} value={inputs[i].h}></input>%</a>
					<Slider min={5} max={100 - inputs[i].y} value={inputs[i].h} className="journal-slider" onChange={(e)=>this.handleInput(e,'h')}/>
				</div>

				<a>Preset Name:</a><input></input>
				<button>Save Preset</button><br /><br />
				<button onClick={() => this.saveInputs()}>Save Changes</button>
			</div>
		)
	}
}

export default JournalEditor