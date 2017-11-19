import React from 'react';
import radium from 'radium';
import autobind from 'autobind-decorator';
import theme from '../../../../../utils/theme';

@theme
@radium
export default class SettingsSidepanelTab extends React.Component {
	getStyle() {
		return {
			container: {
				width: '100%',
				height: '100%'
			}
		};
	}

	render() {
		let style = this.getStyle();
		
		return (
			<div style={style.container}>
				<h1>Settings</h1>
			</div>
		);
	}
};
