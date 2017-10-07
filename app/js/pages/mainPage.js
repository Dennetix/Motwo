import React from 'react';
import radium from 'radium';
import { getSettingsProp } from '../utils/settings';
import { getAllThemes, setTheme } from '../utils/theme';

import Sidepanel from '../components/mainPage/sidepanel/sidepanel';

@radium
export default class MainPage extends React.Component {
	constructor(props) {
		super(props);

		this.styles = {
			mainPage: {
				height: '100vh'
			}
		};
	}

	render() {
		return (
			<div style={this.styles.mainPage}>
				<Sidepanel />
			</div>
		);
	}
}