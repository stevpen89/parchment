import React from 'react';

function CrazyCardCSS(props) {

	const styles = {
		height         : 130,
		width          : 500,
		padding        : 10,
		lineWidth      : 20,
		lineBackground : '#CACCCE',
	}

	const { totalChildren, lastChildCount, card_id } = props
	const { height, width, padding, lineWidth, lineBackground } = styles;
	const heightFormula = (totalChildren * height) - (lastChildCount * height) + (height/2);
	
	return (
		<style>

			{`
				.card-spacer-1 {display: none;}
				.crazy-card-content input {width: 100%;}
				.crazy-card-${card_id} {margin-left: ${lineWidth * 2}px;}

				.crazy-card-wrapper-${card_id} {
					height         : ${height}px;
					display        : flex;
					align-items    : flex-end;
					flex-direction : row;
				}

				.crazy-card-content {
					width            : ${width}px;
					height           : ${height - (padding * 2)}px;
					border-radius    : 3px;
					padding          : 10px;
					background-color : #A9BA9D;
				}

				.card-spacer-${card_id} {
					height          : 100%;
					display         : flex;
					flex-direction  : column;
					justify-content : center;
				}

				.card-line-${card_id} {
					height     : 2px;
					width      : ${lineWidth}px;
					background : ${lineBackground};
				}

				.crazy-card-underline-${card_id} {
					width         : 2px;
					height        :  ${heightFormula}px;
					margin-bottom : -${heightFormula}px;
					position      : relative;
					left          : ${lineWidth * 2}px;
					background    : ${lineBackground};
				}
				
				${totalChildren <= 0 ? `
					
					.crazy-card-underline-${card_id} {
						height        : 0px;
						margin-bottom : 0px;
					}

					` : null}
			`}
			
		</style>
	)
}

export default CrazyCardCSS;