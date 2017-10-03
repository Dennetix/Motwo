import React from 'react';
import radium from 'radium';

import Sidepanel from '../components/mainPage/sidepanel/sidepanel';

@radium
export default class MainPage extends React.Component {
	constructor(props) {
		super(props);

		this.styles = {
			
		};
	}

	render() {
		return (
			<div>
				<Sidepanel />
			</div>
		);
	}
}