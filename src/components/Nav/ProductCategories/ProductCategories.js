import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './ProductCategories.css';
import ProdCatTile from './ProdCatTile/ProdCatTile';

const topRowData = [
	{	id:1,
		title:"Family History Blankets",
		img:"https://s3-us-west-1.amazonaws.com/parchmentgoods/home-page/carousel/Front_Photo_3.jpg",
		desc:"Minky Blankets Printed With Your Family Tree",
		routingString:"/products/blanket/family/history"},
	{	id:2,
		title:"Family History Prints",
		img:"https://s3-us-west-1.amazonaws.com/parchmentgoods/home-page/print_banner.jpg",
		desc:"Photo Quality Prints Of Your Family Tree",
		routingString:"/products/print/family/history"},
	{	id:3,
		title:"Personalized Blankets",
		img:"https://s3-us-west-1.amazonaws.com/parchmentgoods/home-page/holiday_blanket_banner.jpg",
		desc:"Minky Blankets Printed With A Variety Of Patterns - Customizable",
		routingString:"/products/blanket/holiday"},
	{	id:4,
		title:"Missionary Journals",
		img:"https://s3-us-west-1.amazonaws.com/parchmentgoods/home-page/carousel/Flat_Missionary_Journals.jpg",
		desc:"Customizable, Laser-Engraved Journals For Missionaries",
		routingString:"/missionaryJournalSelector"},
	{	id:5,
		title:"Everyday Journals",
		img:"https://s3-us-west-1.amazonaws.com/parchmentgoods/home-page/carousel/Standing-Everyday_Journals.jpg",
		desc:"Customizable, Laser-Engraved Journals For Everyday Use",
		routingString:"/products/journal/everyday"}]


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