import React from 'react';

function CrazyCardCSS(props) {
	const { currentDepth, maxDepth, totalChildren, lastChildCount, firstOrLast, card_id } = props
	let height         = 130;
	let width          = 500;
	let padding        = 10;
	let lineWidth      = 20;
	let lineBackground = '#CACCCE'
	let heightFormula  = (totalChildren * height) - (lastChildCount * height) + (height/2);
	return (
		<style>
			{`
				.crazy-card-${card_id} {
					margin-left: ${lineWidth*2}px;
				}

				.crazy-card-wrapper-${card_id} {
					display: flex;
					flex-direction: row;
					align-items: flex-end;
					height: ${height}px;
				}

				.crazy-card-content {
					background-color:#A9BA9D;
					border-radius: 3px;
					padding: 10px;
					height: ${height - (padding * 2)}px;
					width: ${width}px;
				}

				.card-spacer-${card_id} {
					display: flex;
					flex-direction: column;
					justify-content: center;
					height: 100%;
				}

				.card-spacer-1 {display: none}

				.card-line-${card_id} {
					height: 2px;
					background: ${lineBackground};
					width: ${lineWidth}px;
				}

				.crazy-card-underline-${card_id} {
					width: 2px;
					height: ${heightFormula}px;
					margin-bottom: -${heightFormula}px;
					background: ${lineBackground};
					position: relative;
					left: ${lineWidth * 2}px;
				}
				
				.crazy-card-content input {
					width: 100%;
				}

				${totalChildren <= 0 ?
					`.crazy-card-underline-${card_id} {
							height: 0px;
							margin-bottom: 0px;
					}` : null}

				${
					(firstOrLast => {
						switch (firstOrLast) {
							case 'first'  : return `

							`;
							
							case 'last'   : return `

								}
							`;
							
							case 'middle' : return `

							`;
							
							case 'single' : return `

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