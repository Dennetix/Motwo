import React from 'react';
import theme from '../../utils/theme';

@theme
export default class FormMessage extends React.Component {	
	getStyle() {
		return {
			width: '100%',
			margin: '10px 0 8px 0',
			lineHeight: '115%',
			transform: 'translateX(1px)',

			color: this.props.error ? this.props.getThemeProp('formErrorMessageColor') : this.props.getThemeProp('formMessageColor')
		};
	}

	render() {
		return (
			<p style={this.getStyle()}>{this.props.children}</p>
		);
	}
}