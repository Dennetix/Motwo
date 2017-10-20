import React from 'react';
import autobind from 'autobind-decorator';
import { observer } from 'mobx-react';
import chat from '../utils/chat';
import utils from '../utils/utils';
import locale from '../utils/locale';
import settings from '../utils/settings';
import theme from '../utils/theme';

import FormMessage from '../components/form/formMessage'
import FormTextInput from '../components/form/formTextInput';
import FormSubmitInput from '../components/form/formSubmitInput';

import AppStore from '../stores/appStore';

@locale
@settings
@theme
@observer
export default class LoginPage extends React.Component {
	getStyle() {
		return {
			container: {
				width: '100%'
			},
			form: {
				width: '20rem',
				position: 'absolute',
				left: '50%',
				top: '50%',
				transform: 'translateX(-50%)'
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

		if(!pass.startsWith('ouath:'))
			pass = 'oauth:' + pass;

		chat.login(user, pass)
			.then(() => {
				this.props.setSettingsProp({
					login: {
						user: user, 
						pass: new Buffer(pass, 'utf-8').toString('base64')
					}
				}, false);

				AppStore.isLoading = false;
			})
			.catch((err) => {
				this.props.setSettingsProp({login: undefined}, false);

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

					<FormSubmitInput />
				</form>
			</div>
		);
	}
}