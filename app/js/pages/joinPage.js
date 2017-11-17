import React from 'react';
import autobind from 'autobind-decorator';
import { observer } from 'mobx-react';
import chat from '../utils/chat';
import utils from '../utils/utils';
import locale from '../utils/locale';
import settings from '../utils/settings'

import FormMessage from '../components/form/formMessage'
import FormTextInput from '../components/form/formTextInput';
import FormSubmitButton from '../components/form/formSubmitButton';

import AppStore from '../stores/appStore';

@locale
@settings
@observer
export default class JoinPage extends React.Component {
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
				transform: 'translateX(-50%)'
			}
		};
	}

	@autobind
	onSubmit(e) {
		e.preventDefault();

		AppStore.errorMessage = '';
		
		let channel = e.target[0].value;

		if(!utils.isStringAndNotEmpty(channel)) {
			AppStore.errorMessage = this.props.getLocalizedTranslation('formNotFilled');
			return false;
		}

		AppStore.isLoading = true;

		chat.join(channel)
			.then(() => {
				this.props.setSettingsProp({login: {channel}}, false);

				AppStore.isLoading = false;				
			})
			.catch(err => {
				this.props.setSettingsProp({login: {channel: undefined}}, false);
				
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
							<FormMessage>{this.props.getLocalizedTranslation('joinNotice')}</FormMessage>
					}
					<FormTextInput placeholder={this.props.getLocalizedTranslation('channel')} />

					<FormSubmitButton value={this.props.getLocalizedTranslation('joinButton')} />
				</form>
			</div>
		);
	}
}