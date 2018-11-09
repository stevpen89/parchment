import React, { Component } from 'react';
import '../SingleBlanket/SingleBlanket';
import './SinglePrint.css';
import { withRouter } from 'react-router-dom';
import { savedMessage, setSingle, setSingleID, setSinglePrintPrices, setSinglePrintSKUInfo } from '../../../ducks/familyTree';
import { setCart } from '../../../ducks/products';
import axios from 'axios';
import SingleCard from '../SingleBlanket/SingleCard';
import {connect} from 'react-redux';

class SinglePrint extends Component {
	constructor(props){
		super(props)
		this.state={
			a:'',ad1:'',ad2:'',
			a1:'',a1d1:'',a1d2:'',
			a2:'',a2d1:'',a2d2:'',

			a1a:'',a1ad1:'',a1ad2:'',
			a1b:'',a1bd1:'',a1bd2:'',
			a2a:'',a2ad1:'',a2ad2:'',
			a2b:'',a2bd1:'',a2bd2:'',

			a1a1:'',a1a1d1:'',a1a1d2:'',
			a1a2:'',a1a2d1:'',a1a2d2:'',
			a1b1:'',a1b1d1:'',a1b1d2:'',
			a1b2:'',a1b2d1:'',a1b2d2:'',
			a2a1:'',a2a1d1:'',a2a1d2:'',
			a2a2:'',a2a2d1:'',a2a2d2:'',
			a2b1:'',a2b1d1:'',a2b1d2:'',
			a2b2:'',a2b2d1:'',a2b2d2:'',
			size:'Please select a size for your print',
			color: props.match.params.color
		}
		this.saveChanges = this.saveChanges.bind(this);
		this.savedMessage = this.savedMessage.bind(this);
		this.writeToSession = this.writeToSession.bind(this);
	}

	componentDidMount() {
		const {user_id, setSingle, setSingleID} = this.props

    axios.get(`/products/single/${this.props.match.params.sku}`)
      .then((res)=>{
        this.props.setSinglePrintSKUInfo(res.data);
        this.props.setSinglePrintPrices(JSON.parse(res.data.o1));
		  })

		axios.get(`/cards/single/${user_id}`)
			.then((res) => {
				if (res.data.length > 0 && user_id) {
					this.setState(res.data[0].o1);
					setSingleID(res.data[0].card_id);
					setSingle(true);
				}
				else { setSingle(false) }
			})
			
	}

	changeHandler(target,val){
		this.setState({[target]:val})
	}

	sizeParser () {
    const { normal8x10, normal12x18, normal16x20, normal18x24, normal24x36, sale8x10, sale12x18, sale16x20, sale18x24, sale24x36 } = this.props.singlePrintPrices;
    switch(this.state.size) {
      case "8x10"  : return [normal8x10, sale8x10];
      case "12x18" : return [normal12x18, sale12x18];
      case "16x20" : return [normal16x20, sale16x20];
      case "18x24" : return [normal18x24, sale18x24];
      case "24x36" : return [normal24x36, sale24x36];
      default: return [];
    }
  }

	saveChanges() {
		const { user_id, singleExists, singleID } = this.props
		if (user_id) {
			singleExists ?
				axios.put(`/cards/${singleID}`, {
						card_name    : null,
						card_birth   : null,
						card_death   : null,
						spouse_name  : null,
						spouse_birth : null,
						spouse_death : null,
						o1           : this.state
				}).then(() => {this.savedMessage(); this.writeToSession()})
			:
				axios.post(`/cards/${user_id}`, {
					tree_type    : 'single',
					parent_id    : null,
					o1           : this.state
			}).then(() => {this.savedMessage(); this.writeToSession()})
		}
		else {this.writeToSession()}
	}

	savedMessage () {
		this.props.savedMessage()
		setTimeout(() => {this.props.savedMessage()}, 3000);
	}

	writeToSession () {
		let tempData = []
    tempData = Object.assign({}, this.props.singlePrintSKUInfo);
    tempData.product_price = this.sizeParser()[0];
		tempData.product_sale = this.sizeParser()[1];

		axios.post('/products/addtocart', {details: tempData, info: this.state})
		.then((res2) => {
			this.props.setCart(res2.data);
			this.props.history.go(-2);
		})
	}

	selectSize(val){
		this.setState({size:val})
	}

	render() {
		const {saved} = this.props;
		const {size} = this.state;
		const { normal8x10, normal12x18, normal16x20, normal18x24, normal24x36, sale8x10, sale12x18, sale16x20, sale18x24, sale24x36 } = this.props.singlePrintPrices;
		return (
			<div className="content">
				<div className="single-blanket">
					<div className="single-header"><h1>Enter in your family tree</h1></div>
					<div className="single-blanket-content">
						<div className="level4">
							<div className="single inner-level-4">
								<SingleCard n={'a1a1'} valn={this.state.a1a1} d1={'a1a1d1'} vald1={this.state.a1a1d1} d2={'a1a1d2'} vald2={this.state.a1a1d2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							</div>
							<div className="single inner-level-4">
								<SingleCard n={'a1a2'} valn={this.state.a1a2} d1={'a1a2d1'} vald1={this.state.a1a2d1} d2={'a1a2d2'} vald2={this.state.a1a2d2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
							</div>
							<div className="single inner-level-4">
								<SingleCard n={'a1b1'} valn={this.state.a1b1} d1={'a1b1d1'} vald1={this.state.a1b1d1} d2={'a1b1d2'} vald2={this.state.a1b1d2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							</div>
							<div className="single inner-level-4">
								<SingleCard n={'a1b2'} valn={this.state.a1b2} d1={'a1b2d1'} vald1={this.state.a1b2d1} d2={'a1b2d2'} vald2={this.state.a1b2d2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
							</div>
							<div className="single inner-level-4">
								<SingleCard n={'a2a1'} valn={this.state.a2a1} d1={'a2a1d1'} vald1={this.state.a2a1d1} d2={'a2a1d2'} vald2={this.state.a2a1d2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							</div>
							<div className="single inner-level-4">
								<SingleCard n={'a2a2'} valn={this.state.a2a2} d1={'a2a2d1'} vald1={this.state.a2a2d1} d2={'a2a2d2'} vald2={this.state.a2a2d2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
							</div>
							<div className="single inner-level-4">
								<SingleCard n={'a2b1'} valn={this.state.a2b1} d1={'a2b1d1'} vald1={this.state.a2b1d1} d2={'a2b1d2'} vald2={this.state.a2b1d2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							</div>
							<div className="single inner-level-4">
								<SingleCard n={'a2b2'} valn={this.state.a2b2} d1={'a2b2d1'} vald1={this.state.a2b2d1} d2={'a2b2d2'} vald2={this.state.a2b2d2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
							</div>
						</div>

						<div className="connector-wrapper-3">
							<div className="connector3-4"></div>
							<div className="connector3-4"></div>
							<div className="connector3-4"></div>
							<div className="connector3-4"></div>
						</div>

		{/* // sanity spacing */}

						<div className="level3">
							<div className="single inner-level-3">
								<SingleCard n={'a1a'} valn={this.state.a1a} d1={'a1ad1'} vald1={this.state.a1ad1} d2={'a1ad2'} vald2={this.state.a1ad2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							</div>
							<div className="single inner-level-3">
								<SingleCard n={'a1b'} valn={this.state.a1b} d1={'a1bd1'} vald1={this.state.a1bd1} d2={'a1bd2'} vald2={this.state.a1bd2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
							</div>
							<div className="single inner-level-3">
								<SingleCard n={'a2a'} valn={this.state.a2a} d1={'a2ad1'} vald1={this.state.a2ad1} d2={'a2ad2'} vald2={this.state.a2ad2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							</div>
							<div className="single inner-level-3">
								<SingleCard n={'a2b'} valn={this.state.a2b} d1={'a2bd1'} vald1={this.state.a2bd1} d2={'a2bd2'} vald2={this.state.a2bd2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
							</div>
						</div>
						<div className="connector-wrapper-2">
							<div className="connector2-3"></div>
							<div className="connector2-3"></div>
						</div>


		{/* // sanity spacing */}

						<div className="level2">
							<div className="single inner-level-2">
								<SingleCard n={'a1'} valn={this.state.a1} d1={'a1d1'} vald1={this.state.a1d1} d2={'a1d2'} vald2={this.state.a1d2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
							</div>
							<div className="single inner-level-2">
								<SingleCard n={'a2'} valn={this.state.a2} d1={'a2d1'} vald1={this.state.a2d1} d2={'a2d2'} vald2={this.state.a2d2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
							</div>
						</div>

						<div className="connector-wrapper-1">
							<div className="connector1-2"></div>
						</div>

		{/* // sanity spacing */}

						<div className="level1">
							<div className="single inner-level-1">
								<SingleCard n={'a'} valn={this.state.a} d1={'ad1'} vald1={this.state.ad1} d2={'ad2'} vald2={this.state.ad2} callback={this.changeHandler.bind(this)}/>
							</div>
						</div>
					</div>

          <div className="size-selector-wrapper">
						<h1>{this.state.size}</h1>
						<div className="size-selector">
							<div onClick={()=>this.selectSize( '8x10')} className={size === '8x10' ? 'size-selected print-size size-8x10' : 'print-size size-8x10'}>
								<a className={sale8x10 ? 'strikeout' : ''}>8 X 10 </a>
								<a>${normal8x10}</a>{sale8x10 ? <a>${sale8x10}</a> : null}
							</div>
							<div onClick={()=>this.selectSize('12x18')} className={size === '12x18' ? 'size-selected print-size size-12x18' : 'print-size size-12x18'}>
								<a className={sale12x18 ? 'strikeout' : ''}>12 X 18</a>
								<a>${normal12x18}</a>{sale12x18 ? <a>${sale12x18}</a> : null}
							</div>
							<div onClick={()=>this.selectSize('16x20')} className={size === '16x20' ? 'size-selected print-size size-16x20' : 'print-size size-16x20'}>
								<a className={sale16x20 ? 'strikeout' : ''}>16 X 20</a>
								<a>${normal16x20}</a>{sale16x20 ? <a>${sale16x20}</a> : null}
							</div>
							<div onClick={()=>this.selectSize('18x24')} className={size === '18x24' ? 'size-selected print-size size-18x24' : 'print-size size-18x24'}>
								<a className={sale18x24 ? 'strikeout' : ''}>18 X 24</a>
								<a>${normal18x24}</a>{sale18x24 ? <a>${sale18x24}</a> : null}
							</div>
							<div onClick={()=>this.selectSize('24x36')} className={size === '24x36' ? 'size-selected print-size size-24x36' : 'print-size size-24x36'}>
								<a className={sale24x36 ? 'strikeout' : ''}>24 X 36</a>
								<a>${normal24x36}</a>{sale24x36 ? <a>${sale24x36}</a> : null}
							</div>
						</div>
						<div className="save-div"><button onClick={() => this.saveChanges()} disabled={this.state.size !== 'Please select a size for your print' && this.props.match.params.sku > 0 ? false : true}>Add To Cart</button></div>
					</div>

					<div className="saved-message-container transparent" style={saved ? {opacity: `1`} : {opacity: `0`}}>
						<div className="saved-message"><a>Changes Saved</a></div>
					</div>
					
				</div>
			</div>
		)
	}
}

function mapStateToProps ( state ) {
	return {
		user_id            : state.auth0.user_id,
		saved              : state.familyTree.saved,
		singleExists       : state.familyTree.singleExists,
		singleID           : state.familyTree.singleID,
		singlePrintPrices  : state.familyTree.singlePrintPrices,
    singlePrintSKUInfo : state.familyTree.singlePrintSKUInfo
	}
};
export default withRouter ( connect ( mapStateToProps, { savedMessage, setSingle, setSingleID, setSinglePrintPrices, setSinglePrintSKUInfo, setCart } )( SinglePrint ) );