import React from 'react';
import theme from '../../utils/theme';

@theme
export default class FormButton extends React.Component {
	getStyle() {
		return {
			width: '100%',
			padding: '15px',
			margin: '10px 0 8px 0',
			borderRadius: '3px',

			background: this.props.getThemeProp('formButtonBackground'),
			color: this.props.getThemeProp('formButtonColor'),

			outline: 'none',
			border: 'none',
			cursor: 'pointer'
		};
	}

	render() {
		return (
			<button style={this.getStyle()} onClick={this.props.onClick}>{this.props.children}</button>
		);
	}
}