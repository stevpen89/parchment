import React, { Component } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard/ProductCard'

export default class ProductMap extends Component {
	constructor(){
		super()
		this.state={
			matchArr:[
				{	product_sku    :  1,
					product_name   :  'Aligator Baby Blanket',
					product_tags   :  ['blanket','baby','animals','geometric'],
					product_image  :  'bigimage.jpg',
					product_thumbs :  'littleimage.jpg',
					product_desc   :  'ultra fuzzy soft lorem ipsum blanket waifu...',
					product_price  : '$75.00'
				},
				{	product_sku    :  2,
					product_name   :  'Parents and Kids Family History Blanket',
					product_tags   :  ['blanket','history','family','geometric','geneaology'],
					product_image  :  'bigimage.jpg',
					product_thumbs :  'littleimage.jpg',
					product_desc   :  'ultra fuzzy soft lorem ipsum blanket waifu...',
					product_price  : '$75.00'
				},
				{	product_sku    :  3,
					product_name   :  'Personalized Missionary Journal',
					product_tags   :  ['journal','missionary','state','alabama'],
					product_image  :  'bigimage.jpg',
					product_thumbs :  'littleimage.jpg',
					product_desc   :  'ultra fuzzy soft lorem ipsum blanket waifu...',
					product_price  : '$75.00'
				},
				{	product_sku    :  4,
					product_name   :  'Bear Baby Blanket',
					product_tags   :  ['blanket','baby','animals','geometric'],
					product_image  :  'bigimage.jpg',
					product_thumbs :  'littleimage.jpg',
					product_desc   :  'ultra fuzzy soft lorem ipsum blanket waifu...',
					product_price  : '$75.00'
				},
				{	product_sku    :  5,
					product_name   :  'EveryDay Journal Mountains',
					product_tags   :  ['journal','everyday','nature','scenic'],
					product_image  :  'bigimage.jpg',
					product_thumbs :  'littleimage.jpg',
					product_desc   :  'ultra fuzzy soft lorem ipsum blanket waifu...',
					product_price  : '$75.00'
				}
				// we might want up to 4 image fields per product, just as an aside for later...
				// each product will need a price on it as well, added in for dummy data.
				// each product probably needs a template ID as well to make it easier on the switch.
			]
		}
	}



	render() {
		return (
			<div>
				{this.state.matchArr.map((x)=>{
		return <ProductCard {...x}/>
})}
			</div>
		)
	}
}
