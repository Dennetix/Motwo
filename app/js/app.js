import React from 'react';
import ReactDom from 'react-dom';
import { observer } from 'mobx-react';
import { remote } from 'electron';

import WindowControls from './components/window/windowControls';

import MainPage from './pages/mainPage';

@observer
class App extends React.Component {
	render() {
		return (
			<div>
				<WindowControls />

				<MainPage />
			</div>
		);
	}
}

ReactDom.render(<App />, document.getElementById('app'));