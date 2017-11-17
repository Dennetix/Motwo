import React from 'react';
import radium from 'radium';
import theme from '../../utils/theme';

@theme
@radium
export default class FormSubmitButton extends React.Component {
	getStyle() {
		return {
			width: '100%',
			padding: '15px',
			margin: '10px 0 8px 0',
			borderRadius: '3px',

			background: this.props.getThemeProp('formSubmitBackground'),
			color: this.props.getThemeProp('formSubmitColor'),

			outline: 'none',
			border: 'none',
			cursor: 'pointer'
		};
	}

	render() {
		return (
			<input type="submit" style={this.getStyle()} value={this.props.value} />
		);
	}
}