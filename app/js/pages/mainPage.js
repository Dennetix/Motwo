import React from 'react';

import Sidepanel from '../components/mainPage/sidepanel/sidepanel';

export default class MainPage extends React.Component {
	getStyle() {
		return {
			mainPage: {
				height: '100vh'
			}
		};
	}

	render() {
		let style = this.getStyle();

		return (
			<div style={style.mainPage}>
				<Sidepanel />
			</div>
		);
	}
}