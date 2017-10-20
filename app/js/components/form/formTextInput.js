import React from 'react';
import theme from '../../utils/theme';

@theme
export default class FormTextInput extends React.Component {	
	getStyle() {
		return {
			width: '100%',
			padding: '15px 15px',
			margin: '8px 0',
			boxSizing: 'border-box',
			borderRadius: '3px',
			
			background: this.props.getThemeProp('formTextInputBackground'),
			color: this.props.getThemeProp('formTextInputColor'),

			outline: 'none',
			border: 'none'
		};
	}

	render() {
		return (
			<input type={this.props.type ? this.props.type : 'text'} placeholder={this.props.placeholder} style={this.getStyle()} />
		);
	}
}