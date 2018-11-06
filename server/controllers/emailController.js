module.exports={
	html: ( firstName, lastName, email, address, city, state, zip, phone, time, sum, shipping, total, info, ticketID, toSupport ) => {
		let parsedInfo = JSON.parse(info);
		return (`
			<html>
				<head>
					<style>
						@import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700|Varela+Round');
	
						body {
							padding: 0;
							margin: 0;
						}
	
						.wrapper {
							font-family: 'Varela Round', sans-serif;
							text-align: center;
							background: lightgray;
							border-radius: 5px;
							padding: 30px
						}
	
						.logo {
							width: 400px;
							height: auto;
						}
	
						.info {
							margin: 10px;
						}
	
						.product {
							background: #a0a0a0;
							margin: 15px;
							border-radius: 3px;
							height: 150px;
							overflow: hidden;
						}
	
						.product a {
							color: #FFFFFF;
						}
	
						.subtext {opacity: .5;}
	
						.product h1 {
							padding: 0;
							margin: 0;
							display: inline;
							color: #FFFFFF;
							font-size: 24px;
							text-transform: uppercase;
						}
	
						.product h2 {
							padding: 0;
							margin: 0;
							display: inline;
							color: white;
						}
	
						h1, h2, h3, h4 {
							color: black;
						}
	
						h5 {
							padding: 0;
							margin: 0;
							font-size: 12px;
							display: inline;
							color: gray;
						}
	
						.product-info {
							text-align: left;
						}
	
						.image {
							float: left;
							height: 150px;
							width: auto;
							padding-right: 25px;
						}
					</style>
				</head>
	
				<div class="wrapper">
					<img src="https://s3-us-west-1.amazonaws.com/parchmentgoods/logo/logo.png" alt="parchment" class="logo"><br />
					<h2>Thank you, ${firstName} ${lastName} for your purchase!</h2>
					<h3>Products are being sent to:</h3>
					<div class="info">
						<a>Address: ${address}</a><br />
						<a>City: ${city}</a><br />
						<a>State: ${state}</a><br />
						<a>Zip: ${zip}</a><br />
						<a>Phone: ${phone}</a><br /><br />
					</div>
					${parsedInfo.map((x, i) => {
							return (`<div class="product">
								<img src="${x.image}" alt="Product image ${i + 1}" class="image"></img><br />
								<div class="product-info">
									<h1>${x.name} </h1>
									${toSupport ? `<h1 class="subtext">#${x.sku}</h1>` : ``}<br />
									<h2>$${x.price}${x.shipping > 0 ? `<h2 class="subtext"> + $${x.shipping} in shipping</h2>` : ``}</h2><br />
									${toSupport ? `<a class="subtext">${JSON.stringify(x.info)}</a>` : ``}
								</div>
							</div>`)}).join('')}
							<a>Subtotal: $${sum.toFixed(2)}</a><br />
							<a>Shipping: $${shipping.toFixed(2)}</a><br />
							<h3>Total: $${total.toFixed(2)}</h3>
							<h5>Purchased on ${time} | ©ParchmentGoods | Ticket ID: ${ticketID}</h5>
				</div>
			</html>
		`)
	}
}