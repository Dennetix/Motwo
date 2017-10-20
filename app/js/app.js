import React from 'react';
import ReactDom from 'react-dom';
import validator from 'validator';
import { observer } from 'mobx-react';
import chat from './utils/chat';
import utils from './utils/utils';
import settings from './utils/settings';
import theme from './utils/theme';

import WindowControls from './components/window/windowControls';
import MainPage from './pages/mainPage';
import JoinPage from './pages/joinPage';
import LoginPage from './pages/loginPage';
import LoadingPage from './pages/loadingPage';

import AppStore from './stores/appStore';

@settings
@theme
@observer
class App extends React.Component {
	constructor(props) {
		super(props);

		this.tryLogin();
	}

	getStyle() {
		return {
			height: '100vh',
			color: this.props.getThemeProp('text'),
			background: this.props.getThemeProp('background')
		};
	}

	tryLogin() {
		let user = this.props.getSettingsProp('login.user');
		let pass = this.props.getSettingsProp('login.pass');
		if((utils.isStringAndNotEmpty(user) && utils.isStringAndNotEmpty(pass)) && validator.isBase64(pass)) {
			user = user.toLowerCase();
			pass = new Buffer(pass, 'base64').toString('utf-8'); // Convert base64 to utf-8

			if(!pass.startsWith('oauth:'))
				pass = 'oauth:' + pass;

			chat.login(user, pass)
				.then(() => {this.tryJoin()})
				.catch(err => {
					this.props.setSettingsProp({login: {user: undefined, pass: undefined}}, false);
					AppStore.isLoading = false;
				})
		} else {
			this.props.setSettingsProp({login: {user: undefined, pass: undefined}}, false);
			AppStore.isLoading = false;
		}
	}
 
	tryJoin() {	
		let channel = this.props.getSettingsProp('login.channel');
		if(utils.isStringAndNotEmpty(channel)) {			
			chat.join(channel)
				.then(() => {
					AppStore.isLoading = false;
				})
				.catch(err => {
					this.props.setSettingsProp({login: {channel: undefined}}, false);
					AppStore.isLoading = false;
				});
		} else {		
			this.props.setSettingsProp({login: {channel: undefined}}, false);
			AppStore.isLoading = false;
		}
	}

	render() {
		let style = this.getStyle();
		
		let page = <LoginPage />;
		if(AppStore.isLoading) {
			page = <LoadingPage />;
		} else {
			if(AppStore.isLoggedIn && AppStore.hasJoined)
				page = <MainPage />;
			else if(AppStore.isLoggedIn) 
				page = <JoinPage />;
		}

		return (
			<div style={style}>
				<WindowControls />

				{page}
			</div>
		);
	}
}

ReactDom.render(<App />, document.getElementById('app'));