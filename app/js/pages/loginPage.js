import React from 'react';
import autobind from 'autobind-decorator';
import { observer } from 'mobx-react';
import chat from '../utils/chat';
import utils from '../utils/utils';
import locale from '../utils/locale';
import settings from '../utils/settings';

import FormMessage from '../components/ui/formMessage'
import FormTextInput from '../components/ui/formTextInput';
import FormSubmitButton from '../components/ui/formSubmitButton';
import ExternalLink from '../components/ui/externalLink';

import AppStore from '../stores/appStore';

@locale
@settings
@observer
export default class LoginPage extends React.Component {
	getStyle() {
		return {
			container: {
				width: '100%'
			},
			form: {
				width: '22rem',
				position: 'absolute',
				left: '50%',
				top: '50%',
				transform: 'translate(-50%, -15%)'
			}
		};
	}
	
	@autobind
	onSubmit(e) {
		e.preventDefault();

		AppStore.errorMessage = '';

		let user = e.target[0].value.toLowerCase();
		let pass = e.target[1].value;

		if(!utils.isStringAndNotEmpty(user) || !utils.isStringAndNotEmpty(pass)) {
			AppStore.errorMessage = this.props.getLocalizedTranslation('formNotFilled');
			return false;
		}

		AppStore.isLoading = true;

		if(!pass.startsWith('oauth:'))
			pass = 'oauth:' + pass;

		chat.login(user, pass)
			.then(() => {
				this.props.setSettingsProp({login: {user, pass: new Buffer(pass, 'utf-8').toString('base64')}}, false);

				AppStore.isLoading = false;
			})
			.catch(err => {
				this.props.setSettingsProp({login: {user: undefined, pass: undefined}}, false);

				AppStore.errorMessage = err;
				AppStore.isLoading = false;
			})
	} 

	render() {
		let style = this.getStyle();
		
		return (
			<div style={style.container}>
				<form style={style.form} onSubmit={this.onSubmit}>
					{
						AppStore.errorMessage ? 
							<FormMessage error>{AppStore.errorMessage}</FormMessage> :
							<FormMessage>{this.props.getLocalizedTranslation('loginNotice')}</FormMessage>
					}
					<FormTextInput placeholder={this.props.getLocalizedTranslation('username')} />
					<FormTextInput placeholder={this.props.getLocalizedTranslation('password')} type="password" />
					<FormMessage>{this.props.getLocalizedTranslation('getOauth', 0)} <ExternalLink href="http://twitchapps.com/tmi">{this.props.getLocalizedTranslation('getOauth', 1)}</ExternalLink></FormMessage>

					<FormSubmitButton value={this.props.getLocalizedTranslation('loginButton')} />
				</form>
			</div>
		);
	}
}