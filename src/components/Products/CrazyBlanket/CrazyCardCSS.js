import React from 'react';

function CrazyCardCSS(props) {

	const styles = {
		height         : 200,
		width          : 520,
		marginTop      : 40,
		lineWidth      : 40,
		lineBackground : '#CACCCE',
	}

	const { depth, totalChildren, lastChildCount, card_id, parent_id } = props
	const { height, width, marginTop, lineWidth, lineBackground } = styles;
	const heightFormula = (totalChildren * height) - (lastChildCount * height) + (height / 2) + (marginTop / 2);
	
	return (
		<style>

			{`
				.crazy-card {margin-left: ${lineWidth * 2}px;}

				.crazy-card-wrapper {
					height         : ${height}px;
					display        : flex;
					align-items    : flex-end;
					flex-direction : row;
				}

				.crazy-card-content-${card_id} {
					width            : ${width}px;
					height           : ${height - marginTop}px;
					display          : flex;
					justify-content  : center;
					align-items      : center;
					flex-direction   : column;
					border-radius    : 3px;
					background-color : rgb(${169}, ${186}, ${(depth * 7) + 157});
				}

				.card-spacer-${card_id} {
					height          : 100%;
					display         : flex;
					flex-direction  : column;
					justify-content : center;
				}

				.card-line {
					height     : 2px;
					width      : ${lineWidth}px;
					position   : relative;
					top        : ${marginTop / 2}px;
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

				${parent_id === 0 ? `
					.card-spacer-${card_id} {display: none;}
					.crazy-card-${card_id} {margin-left: -${lineWidth}px;}
				` : null}
				
				${totalChildren < 0 ? `
					
					.crazy-card-underline-${card_id} {
						height        : 0px;
						margin-bottom : 0px;
					}

					` : null}

					@media only screen and (max-width: 800px) {
						.crazy-card {margin-left: ${lineWidth * 2}px;}
						.card-line {width: ${lineWidth / 2}px;}
					}
			`}
		</style>
	)
}

export default CrazyCardCSS;