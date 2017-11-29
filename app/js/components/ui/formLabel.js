import React from 'react';
import theme from '../../utils/theme';

@theme
export default class FormLabel extends React.Component {	
	getStyle() {
		return {
			width: '100%',
			margin: '10px 0 2px 0',
			lineHeight: '115%',
			transform: 'translateX(1px)',
			display: 'block',

			color: this.props.getThemeProp('formLabelColor')
		};
	}

	render() {
		return (
			<label style={this.getStyle()}>{this.props.children}</label>
		);
	}
}