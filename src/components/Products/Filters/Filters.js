import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setProducts } from '../../../ducks/products';
import './Filters.css'
import axios from 'axios';

class Filters extends Component {
	constructor(){
		super()
		this.state={
			tagInput   : '',
			tags       : [],
			tagWarning : false												
		}
		this.handleInput = this.handleInput.bind(this);
		this.getProducts = this.getProducts.bind(this);
		this.routeChange = this.routeChange.bind(this);
		this.addTag      = this.addTag.bind(this);
		this.deleteTag   = this.deleteTag.bind(this);
		this.clearTags   = this.clearTags.bind(this);
		this.keyPress    = this.keyPress.bind(this);		
	}

	componentDidMount () {
		if (this.props.match.params.type === undefined) {
			axios.get(`/products`).then((res)=>{
				this.props.setProducts(res.data)
			})
		}
		else {this.updateTags();}
	}

  componentWillMount() {
	  this.routeChange();
	}
	
  componentWillUnmount() {
      this.unlisten();
  }

  getProducts (tags) {
    let tempTags = tags.slice(0);
		let percentified = tempTags.map(x => `%${x}%`);
		let fillTags = () => {
			if (percentified.length < 10) {
				percentified.push('%%');
				fillTags();
			}
		}
    fillTags();
    axios.put('/products/search', {tags: percentified}).then(res => {this.props.setProducts(res.data)})
	}

  routeChange () {
    let historyArr = []
    this.unlisten = this.props.history.listen((location, action) => {
			historyArr = location.pathname.split('/')
			if (historyArr[historyArr.length - 1] !== 'products') {
				historyArr.splice(0, 2);
        this.setState({tags: historyArr})
        this.getProducts(historyArr)
			}
			else {
        this.setState({tags: []})
        this.getProducts([])
			}
    });
  }

	updateTags () {
		let historyArr = this.props.location.pathname.split('/')
			if (historyArr[historyArr.length - 1] !== 'products') {
				historyArr.splice(0, 2);
        this.setState({tags: historyArr})
        this.getProducts(historyArr)
			}
			else {
        this.setState({tags: []})
        this.getProducts([])
			}
	}

	keyPress(e) {
		if (e.keyCode === 13) {this.addTag()}
	}	

	handleInput (val) {
		this.setState({tagInput: val});
	}

	addTag () {
		let tempTags = this.state.tags.slice(0)
		let inputArr = this.state.tagInput.toLowerCase().split(/[ ,]+/)
		if (inputArr.length + this.state.tags.length <= 10 && this.state.tagInput !== '') {
			inputArr.map(x=>tempTags.push(x))
      this.setState({tags:tempTags, tagInput: '', tagWarning: false});
      this.getProducts(tempTags)
		}
		else if (this.state.tagInput === '') {return null}
		else {
			this.setState({tagWarning: true});
    }
	}

	deleteTag (index) {
		let tempTags=this.state.tags.slice(0)
		tempTags.splice(index, 1)
    this.setState({tags:tempTags})
    this.getProducts(tempTags)
	}

	clearTags () {
    this.setState({tags: [], tagInput: '', tagWarning: false})
    this.getProducts([])
	}

	render() {
		const { tags, tagInput, tagWarning } = this.state;
		const { handleInput, addTag, deleteTag, clearTags } = this;

		return (
			<div>
				{/* <div className="products-banner"></div> */}

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

				<div className="filter-area">
					<div className="search-area">
						<input className="tag-input" onChange={(e) => handleInput(e.target.value)} value={tagInput} onKeyDown={this.keyPress} placeholder="Search with tags"/>
						<button onClick={() => addTag()} className="add-tags-button"><i className="fas fa-tags"></i> Add Tag</button>
						<button onClick={() => clearTags()} className="clear-tags-button"><i className="fas fa-backspace"></i></button>
					</div>
					<div className="tag-wrapper">
						{tags.map((x,y)=>
							<div className="tag" key={y}><a>{x}</a><button onClick={() => deleteTag(y)} id="addButton">x</button></div>
						)}
						{tagWarning ? <a>No more than 10 tags can be searched at one time, please refine your search.</a> : null}
					</div>
				</div>

			</div>
		)
	}
}

export default withRouter ( connect ( null, { setProducts } )(Filters) );