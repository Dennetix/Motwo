import React from 'react';
import radium from 'radium';
import theme from '../../utils/theme';

@theme
@radium
export default class FormSelectOption extends React.Component {	
	getStyle() {
		return {
			 width: '100%',
			padding: '15px'
		};
	}

	render() {
		return (
			<option style={this.getStyle()} value={this.props.value}>
				{this.props.children}
			</option>
		);
	}
}