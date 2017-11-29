import React from 'react';
import radium from 'radium';
import theme from '../../utils/theme';

@theme
@radium
export default class FormDropdownOption extends React.Component {	
	getStyle() {
		return {
			width: '100%',
			padding: '15px',
			marginBottom: '-1px',

			background: this.props.getThemeProp('formDropdownOptionBackground'),

			':hover': {
				filter: 'brightness(0.9)'
			}
		}
	}

	render() {
		return (
			<div style={this.getStyle()}>
				{this.props.children}
			</div>
		);
	}
}