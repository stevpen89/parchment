import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './ProductCategories.css';
import ProdCatTile from './ProdCatTile/ProdCatTile';

const topRowData = [
	{id:1,title:"Family History Blankets",img:"",desc:"test text"},
	{id:2,title:"Family History Prints",img:"",desc:"test text"},
	{id:3,title:"Holiday Blankets",img:"",desc:"test text"}]
const bottomRowData = [
	{id:4,title:"State Missionary Journals",img:"",desc:"test text"},
	{id:5,title:"Country Missionary Journals",img:"",desc:"test text"},
	{id:6,title:"Everyday Journals",img:"",desc:"test text"}]


class ProductCategories extends Component {
	render() {
		return (
			<div className="ProdCat-Wrapper">
				<div className="ProdCat-Header">
					Products
				</div>
				<div className="ProdCat-Grid">
					<div className="ProdCat-Grid-Row">
						{topRowData.map((x)=>{return <ProdCatTile {...x} key={x.id}/>})}
					</div>
					<div className="ProdCat-Grid-Row">
						{bottomRowData.map((x)=>{return <ProdCatTile {...x} key={x.id}/>})}
					</div>
				</div>
			</div>
		)
	}
}
export default ProductCategories