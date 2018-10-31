import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './Filters.css'

class Filters extends Component {
	constructor(){
		super()
		this.state={
			refresh: true,
			tagInput: '',
			tags: [],
			tagWarning: false												
		}
		this.handleInput = this.handleInput.bind(this);
		this.addTag = this.addTag.bind(this);
		this.deleteTag = this.deleteTag.bind(this);
		this.clearTags = this.clearTags.bind(this);
		this.keyPress = this.keyPress.bind(this);		
	}

	componentDidMount () {
		this.updateTags();
	}

  componentWillMount() {
		let historyArr = []
		let tempTags = []
    this.unlisten = this.props.history.listen((location, action) => {
			historyArr = location.pathname.split('/')
			tempTags = [];
			if (historyArr[historyArr.length - 1] !== 'products') {
				tempTags.push(historyArr[historyArr.length - 1])
				this.setState({tags: tempTags})
			}
			else {this.setState({tags: []})}
    });
	}
	
  componentWillUnmount() {
      this.unlisten();
  }

	updateTags () {
		let tempTags = []
		if (this.props.match.params.type) {
			tempTags.push(this.props.match.params.type)
			this.setState({tags: tempTags})
		}
	}

	getTags () {
		let arr = ['hi', '', '', '', '', '']
		let newArr = arr.map(x => `%${x}%`)
		let arrCheck = () => {
			if (newArr.length < 10) {
				newArr.push('%%')
				arrCheck();
			}
		}
		arrCheck();
		console.log(newArr, newArr.length)
	}

	keyPress(e) {
		e.keyCode === 13 ? this.addTag() : null
	}	

	handleInput (val) {
		this.setState({tagInput: val});
	}

	addTag () {
		let tempTags = this.state.tags.slice(0)
		let inputArr = this.state.tagInput.toLowerCase().split(/[ ,]+/)
		console.log(inputArr.length + this.state.tags.length)
		if (inputArr.length + this.state.tags.length <= 10) {
			inputArr.map(x=>tempTags.push(x))
			this.setState({tags:tempTags, tagInput: '', tagWarning: false})
		}
		else {
			this.setState({tagWarning: true})
		}
	}

	deleteTag (index) {
		let tempTags=this.state.tags.slice(0)
		tempTags.splice(index, 1)
		this.setState({tags:tempTags})								
	}

	clearTags () {
		this.setState({tags: []})
	}

	render() {
		const { tags, tagInput, tagWarning } = this.state
		const { handleInput, addTag, deleteTag, clearTags } = this
		return (
			<div>
				<div className="products-banner"></div>

				{/* <div className="side-bar">
					<input className="product-search" placeholder="Search"/><br />
					<input type="checkbox" value="missionary" /><a>Missionary</a><br />
					<input type="checkbox" value="missionary" /><a>Everyday</a><br />
					<select className="product-select">
						<option>America</option>
						<option>Brazil</option>
						<option>Japan</option>
					</select>
					<select className="product-select">
						<option>Utah</option>
						<option>Texas</option>
						<option>Alabama</option>
					</select><br />
				</div> */}

				<div>
					<input className="tag-input" onChange={(e) => handleInput(e.target.value)} value={tagInput} onKeyDown={this.keyPress}/>
					<button onClick={() => addTag()}>Add Tag</button>
					<button onClick={() => clearTags()}>Clear Tags</button>
					{tagWarning ? <a>Please do less than 10 tags</a> : null}																				
				</div>				
				<div className="tag-wrapper">
					{tags.map((x,y)=>
						<div className="tag"><a>{x}</a><button onClick={() => deleteTag(y)} id="addButton">x</button></div>
					)}
				</div>

			</div>
		)
	}
}

export default withRouter(Filters)