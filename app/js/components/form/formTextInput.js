import React from 'react';
import radium from 'radium';
import theme from '../../utils/theme';

@theme
@radium
export default class FormTextInput extends React.Component {	
	getStyle() {
		return {
			width: '100%',
			padding: '15px',
			margin: '10px 0 8px 0',
			boxSizing: 'border-box',
			borderRadius: '3px',
			
			background: this.props.getThemeProp('formTextInputBackground'),
			color: this.props.getThemeProp('formTextInputColor'),

			outline: 'none',
			border: 'none',

			border: '0.5px solid ' + this.props.getThemeProp('formTextInputBackground'),
			
			':focus': {
				border: '0.5px solid ' + this.props.getThemeProp('formActive')
			}
		};
	}

	render() {
		return (
			<input type={this.props.type ? this.props.type : 'text'} placeholder={this.props.placeholder} style={this.getStyle()} />
		);
	}
}