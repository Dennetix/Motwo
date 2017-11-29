import React from 'react';
import radium from 'radium';
import theme from '../../utils/theme';

@theme
@radium
export default class FormButton extends React.Component {
	getStyle() {
		return {
			width: '100%',
			padding: '15px',
			margin: '10px 0 8px 0',
			borderRadius: '3px',

			background: this.props.getThemeProp('formButtonBackground'),
			transition: 'background 0.1s',			
			color: this.props.getThemeProp('formButtonColor'),

			outline: 'none',
			border: 'none',
			cursor: 'pointer',

			':hover': {
				background: this.props.getThemeProp('formButtonHoverBackground')
			}
		};
	}

	render() {
		return (
			<button style={this.getStyle()} onClick={this.props.onClick}>{this.props.children}</button>
		);
	}
}