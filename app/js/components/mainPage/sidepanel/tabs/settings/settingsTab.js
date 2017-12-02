import React from 'react';

export default class SettingsTab extends React.Component {
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
