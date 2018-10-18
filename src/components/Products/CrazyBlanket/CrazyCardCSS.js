import React from 'react';

function CrazyCardCSS(props) {
	const { currentDepth, maxDepth, totalChildren, lastChildCount, firstOrLast, card_id } = props
	let spacing = 112;
	return (
		<style>
			{`
				.card-line-${card_id} {
					height: 2px;
					background: rgba(0,0,0,.25);
					width: ${currentDepth * 50}px;
				}

				.card-spacer-${card_id} {
					display: flex;
					flex-direction: column;
					justify-content: center;
					width: 20px;
				}

				.crazy-card-wrapper-${card_id} {
					display: flex;
					flex-direction: row;
				}

				.crazy-card-${card_id} {
					margin-left: 30px;
					padding: 20px 0;
					position: relative;
				}
				
				.crazy-card-${card_id}:after {
					content:""; 
					background: rgba(0,0,0,.25);
					position: absolute; 
					bottom: 0;
					top: 0;
					left: 0; 
					height: 100%;
					width: 2px;
				}

				${
					(firstOrLast => {
						switch (firstOrLast) {
							case 'first'  : return `
								.crazy-card-${card_id}:after {
									top: ${spacing}px;
									height: calc(100% - ${spacing}px);
								}
							`;
							
							case 'last'   : return `
								.crazy-card-${card_id}:after {
									bottom: ${spacing}px;
									height: calc(100% - ${spacing}px);
								}
							`;
							
							case 'middle' : return `
								.crazy-card-${card_id}:after {
										
								}
							`;
							
							case 'single' : return `
								.crazy-card-${card_id}:after {
									top: ${spacing}px;
									bottom: ${spacing}px;
									height: calc(100% - ${spacing * 2}px - ${maxDepth * 14}px);
								}
							`;

							default: return null;
						}
					})(firstOrLast)
				}
			`}
		</style>
	)
}

export default CrazyCardCSS;