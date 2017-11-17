import React from 'react';
import radium from 'radium';
import theme from '../../utils/theme';

@theme
@radium
export default class FormSelectInput extends React.Component {	
	getStyle() {
		return {
			select: {
				width: '100%',
				padding: '15px',
				margin: '10px 0',
				boxSizing: 'border-box',
				borderRadius: '3px',

				background: this.props.getThemeProp('formTextInputBackground'),
				color: this.props.getThemeProp('formTextInputColor'),

				outline: 'none',
				border: '0.5px solid ' + this.props.getThemeProp('formTextInputBackground'),

				':focus': {
					border: '0.5px solid ' + this.props.getThemeProp('formActive')
				}
			}
		};
	}

	render() {
		const style = this.getStyle();

		return (
			<select style={style.select} value={this.props.value} onChange={this.props.onChange}>
				{this.props.children}
			</select>
		);
	}
}