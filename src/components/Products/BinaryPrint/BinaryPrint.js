import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { savedMessage, setBinary, setBinaryID } from '../../../ducks/familyTree';
import { setCart } from '../../../ducks/products';
import axios from 'axios';
import '../BinaryBlanket/BinaryBlanket.css';
import PairCard from '../BinaryBlanket/PairCard';

class BinaryPrint extends Component {
	constructor(){
		super()
		this.state={
		a:'',ad1:'',ad2:'',
		b:'',bd1:'',bd2:'',

		a1:'',a1d1:'',a1d2:'',
		a2:'',a2d1:'',a2d2:'',
		b1:'',b1d1:'',b1d2:'',
		b2:'',b2d1:'',b2d2:'',

		a1a:'',a1ad1:'',a1ad2:'',
		a1b:'',a1bd1:'',a1bd2:'',
		a2a:'',a2ad1:'',a2ad2:'',
		a2b:'',a2bd1:'',a2bd2:'',
		b1a:'',b1ad1:'',b1ad2:'',
		b1b:'',b1bd1:'',b1bd2:'',
		b2a:'',b2ad1:'',b2ad2:'',
		b2b:'',b2bd1:'',b2bd2:'',

		a1a1:'',a1a1d1:'',a1a1d2:'',
		a1a2:'',a1a2d1:'',a1a2d2:'',
		a1b1:'',a1b1d1:'',a1b1d2:'',
		a1b2:'',a1b2d1:'',a1b2d2:'',
		a2a1:'',a2a1d1:'',a2a1d2:'',
		a2a2:'',a2a2d1:'',a2a2d2:'',
		a2b1:'',a2b1d1:'',a2b1d2:'',
		a2b2:'',a2b2d1:'',a2b2d2:'',
		b1a1:'',b1a1d1:'',b1a1d2:'',
		b1a2:'',b1a2d1:'',b1a2d2:'',
		b1b1:'',b1b1d1:'',b1b1d2:'',
		b1b2:'',b1b2d1:'',b1b2d2:'',
		b2a1:'',b2a1d1:'',b2a1d2:'',
		b2a2:'',b2a2d1:'',b2a2d2:'',
		b2b1:'',b2b1d1:'',b2b1d2:'',
    b2b2:'',b2b2d1:'',b2b2d2:'',
    size:'none selected'
		}
		this.saveChanges = this.saveChanges.bind(this);
		this.savedMessage = this.savedMessage.bind(this);
	}


	componentDidMount() {
		const {user_id, setBinary, setBinaryID} = this.props
		axios.get(`/cards/binary/${user_id}`)
			.then((res) => {
				if (res.data.length > 0 && user_id) {
					this.setState(res.data[0].o1);
					setBinaryID(res.data[0].card_id);
					setBinary(true)
				}
				else { setBinary(false) }
			})
	}

	changeHandler(target,val){
		this.setState({[target]:val})
	}

	saveChanges() {
    const { user_id, binaryExists, binaryID } = this.props
    if (user_id) {
      binaryExists ?
        axios.put(`/cards/${binaryID}`, {
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
          tree_type    : 'binary',
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
    axios.get(`/products/single/${this.props.match.params.sku}`)
      .then((res)=>{
        axios.post('/products/addtocart', {details: res.data, info: this.state})
          .then((res2) => {
            this.props.setCart(res2.data);
            this.props.history.go(-2);
          })
		  })
  }
  
  
	selectSize(val){
		this.setState({size:val})
	}

	render() {
		const { saved } = this.props;
		return (
			<div className="content">
        <div className="binary-blanket">
          <div className="binary-header"><h1>Enter in your family tree</h1></div>
          <div className="binary-blanket-content">
            <div className="level4">
              <div className="binary-pair inner-level-4">
                <PairCard n={'a1a1'} valn={this.state.a1a1} d1={'a1a1d1'} vald1={this.state.a1a1d1} d2={'a1a1d2'} vald2={this.state.a1a1d2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
                <PairCard n={'a1a2'} valn={this.state.a1a2} d1={'a1a2d1'} vald1={this.state.a1a2d1} d2={'a1a2d2'} vald2={this.state.a1a2d2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
              </div>
              <div className="binary-pair inner-level-4">
                <PairCard n={'a1b1'} valn={this.state.a1b1} d1={'a1b1d1'} vald1={this.state.a1b1d1} d2={'a1b1d2'} vald2={this.state.a1b1d2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
                <PairCard n={'a1b2'} valn={this.state.a1b2} d1={'a1b2d1'} vald1={this.state.a1b2d1} d2={'a1b2d2'} vald2={this.state.a1b2d2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
              </div>
              <div className="binary-pair inner-level-4">
                <PairCard n={'a2a1'} valn={this.state.a2a1} d1={'a2a1d1'} vald1={this.state.a2a1d1} d2={'a2a1d2'} vald2={this.state.a2a1d2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
                <PairCard n={'a2a2'} valn={this.state.a2a2} d1={'a2a2d1'} vald1={this.state.a2a2d1} d2={'a2a2d2'} vald2={this.state.a2a2d2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
              </div>
              <div className="binary-pair inner-level-4">
                <PairCard n={'a2b1'} valn={this.state.a2b1} d1={'a2b1d1'} vald1={this.state.a2b1d1} d2={'a2b1d2'} vald2={this.state.a2b1d2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
                <PairCard n={'a2b2'} valn={this.state.a2b2} d1={'a2b2d1'} vald1={this.state.a2b2d1} d2={'a2b2d2'} vald2={this.state.a2b2d2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
              </div>
              <div className="binary-pair inner-level-4">
                <PairCard n={'b1a1'} valn={this.state.b1a1} d1={'b1a1d1'} vald1={this.state.b1a1d1} d2={'b1a1d2'} vald2={this.state.b1a1d2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
                <PairCard n={'b1a2'} valn={this.state.b1a2} d1={'b1a2d1'} vald1={this.state.b1a2d1} d2={'b1a2d2'} vald2={this.state.b1a2d2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
              </div>
              <div className="binary-pair inner-level-4">
                <PairCard n={'b1b1'} valn={this.state.b1b1} d1={'b1b1d1'} vald1={this.state.b1b1d1} d2={'b1b1d2'} vald2={this.state.b1b1d2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
                <PairCard n={'b1b2'} valn={this.state.b1b2} d1={'b1b2d1'} vald1={this.state.b1b2d1} d2={'b1b2d2'} vald2={this.state.b1b2d2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
              </div>
              <div className="binary-pair inner-level-4">
                <PairCard n={'b2a1'} valn={this.state.b2a1} d1={'b2a1d1'} vald1={this.state.b2a1d1} d2={'b2a1d2'} vald2={this.state.b2a1d2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
                <PairCard n={'b2a2'} valn={this.state.b2a2} d1={'b2a2d1'} vald1={this.state.b2a2d1} d2={'b2a2d2'} vald2={this.state.b2a2d2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
              </div>
              <div className="binary-pair inner-level-4">
                <PairCard n={'b2b1'} valn={this.state.b2b1} d1={'b2b1d1'} vald1={this.state.b2b1d1} d2={'b2b1d2'} vald2={this.state.b2b1d2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
                <PairCard n={'b2b2'} valn={this.state.b2b2} d1={'b2b2d1'} vald1={this.state.b2b2d1} d2={'b2b2d2'} vald2={this.state.b2b2d2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
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
              <div className="binary-pair inner-level-3">
                <PairCard n={'a1a'} valn={this.state.a1a} d1={'a1ad1'} vald1={this.state.a1ad1} d2={'a1ad2'} vald2={this.state.a1ad2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
                <PairCard n={'a1b'} valn={this.state.a1b} d1={'a1bd1'} vald1={this.state.a1bd1} d2={'a1bd2'} vald2={this.state.a1bd2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
              </div>
              <div className="binary-pair inner-level-3">
                <PairCard n={'a2a'} valn={this.state.a2a} d1={'a2ad1'} vald1={this.state.a2ad1} d2={'a2ad2'} vald2={this.state.a2ad2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
                <PairCard n={'a2b'} valn={this.state.a2b} d1={'a2bd1'} vald1={this.state.a2bd1} d2={'a2bd2'} vald2={this.state.a2bd2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
              </div>
              <div className="binary-pair inner-level-3">
                <PairCard n={'b1a'} valn={this.state.b1a} d1={'b1ad1'} vald1={this.state.b1ad1} d2={'b1ad2'} vald2={this.state.b1ad2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
                <PairCard n={'b1b'} valn={this.state.b1b} d1={'b1bd1'} vald1={this.state.b1bd1} d2={'b1bd2'} vald2={this.state.b1bd2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
              </div>
              <div className="binary-pair inner-level-3">
                <PairCard n={'b2a'} valn={this.state.b2a} d1={'b2ad1'} vald1={this.state.b2ad1} d2={'b2ad2'} vald2={this.state.b2ad2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
                <PairCard n={'b2b'} valn={this.state.b2b} d1={'b2bd1'} vald1={this.state.b2bd1} d2={'b2bd2'} vald2={this.state.b2bd2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
              </div>
            </div>
            <div className="connector-wrapper-2">
              <div className="connector2-3"></div>
              <div className="connector2-3"></div>
            </div>


    {/* // sanity spacing */}

            <div className="level2">
              <div className="binary-pair inner-level-2">
                <PairCard n={'a1'} valn={this.state.a1} d1={'a1d1'} vald1={this.state.a1d1} d2={'a1d2'} vald2={this.state.a1d2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
                <PairCard n={'a2'} valn={this.state.a2} d1={'a2d1'} vald1={this.state.a2d1} d2={'a2d2'} vald2={this.state.a2d2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
              </div>
              <div className="binary-pair inner-level-2">
                <PairCard n={'b1'} valn={this.state.b1} d1={'b1d1'} vald1={this.state.b1d1} d2={'b1d2'} vald2={this.state.b1d2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
                <PairCard n={'b2'} valn={this.state.b2} d1={'b2d1'} vald1={this.state.b2d1} d2={'b2d2'} vald2={this.state.b2d2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
              </div>
            </div>

            <div className="connector-wrapper-1">
              <div className="connector1-2"></div>
            </div>

    {/* // sanity spacing */}

            <div className="level1">
              <div className="binary-pair inner-level-1">
                <PairCard n={'a'} valn={this.state.a} d1={'ad1'} vald1={this.state.ad1} d2={'ad2'} vald2={this.state.ad2} callback={this.changeHandler.bind(this)} parent={'Father'}/>
                <PairCard n={'b'} valn={this.state.b} d1={'bd1'} vald1={this.state.bd1} d2={'bd2'} vald2={this.state.bd2} callback={this.changeHandler.bind(this)} parent={'Mother'}/>
              </div>
            </div>
          </div>

          <div>
						<a>Please Select a Size for Your Print</a>
						<div onClick={()=>this.selectSize( '8 X 10')}> size:  8 X 10, Normal Price: 51.99  , Sale Price: 39.99  <i class="fas fa-tree"></i></div>
						<div onClick={()=>this.selectSize('12 X 18')}> size: 12 X 18, Normal Price: 64.99  , Sale Price: 49.99  <i class="fas fa-tree"></i></div>
						<div onClick={()=>this.selectSize('16 X 20')}> size: 16 X 20, Normal Price: 77.99  , Sale Price: 59.99  <i class="fas fa-tree"></i></div>
						<div onClick={()=>this.selectSize('18 X 24')}> size: 18 X 24, Normal Price: 90.99  , Sale Price: 69.99  <i class="fas fa-tree"></i></div>
						<div onClick={()=>this.selectSize('24 X 36')}> size: 24 X 36, Normal Price: 103.99 , Sale Price: 79.99  <i class="fas fa-tree"></i></div>
						{this.state.size}
					</div>

					  {this.state.size !== 'none selected' && this.props.match.params.sku > 0 ? <div className="save-div"><button onClick={() => this.saveChanges()}>Add To Cart</button></div> : null}
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
		user_id      : state.auth0.user_id,
		saved        : state.familyTree.saved,
		binaryExists : state.familyTree.binaryExists,
		binaryID     : state.familyTree.binaryID,
	}
};
export default withRouter ( connect ( mapStateToProps, { savedMessage, setBinary, setBinaryID, setCart } )( BinaryPrint ) );