import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './ProductCategories.css';
import ProdCatTile from './ProdCatTile/ProdCatTile';

const topRowData = [
	{id:1,title:"Family History Blankets",img:"https://www.sunnyskyz.com/uploads/2018/12/65zli-cat-meme-1a.jpg",desc:"test text",routingString:"/products/blanket/family/history"},
	{id:2,title:"Family History Prints",img:"https://www.sunnyskyz.com/uploads/2018/12/65zli-cat-meme-1a.jpg",desc:"test text",routingString:"/products/print/family/history"},
	{id:3,title:"Holiday Blankets",img:"https://www.sunnyskyz.com/uploads/2018/12/65zli-cat-meme-1a.jpg",desc:"test text",routingString:"/products/blanket/holiday"},
	{id:4,title:"Missionary Journals",img:"https://www.sunnyskyz.com/uploads/2018/12/65zli-cat-meme-1a.jpg",desc:"test text",routingString:"/missionaryJournalSelector"},
	{id:5,title:"Everyday Journals",img:"https://www.sunnyskyz.com/uploads/2018/12/65zli-cat-meme-1a.jpg",desc:"test text",routingString:"/products/journal/everyday"}]


class ProductCategories extends Component {
	render() {
		return (
			<div className="ProdCat-Wrapper">
				<div className="ProdCat-Header">
					Products
				</div>
				<div className="ProdCat-Grid">
						{topRowData.map((x)=>{return <ProdCatTile {...x} key={x.id}/>})}
				</div>
			</div>
		)
	}
}
export default ProductCategories