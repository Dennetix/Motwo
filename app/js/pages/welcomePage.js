import React from 'react';
import autobind from 'autobind-decorator';
import locale from '../utils/locale';
import settings from '../utils/settings';
import theme from '../utils/theme';

import FormLabel from '../components/ui/formLabel';
import FormDropdownInput from '../components/ui/formDropdownInput';
import FormDropdownOption from '../components/ui/formDropdownOption';
import FormButton from '../components/ui/formButton';

@locale
@settings
@theme
export default class WelcomePage extends React.Component {
	getStyle() {
		return {
			container: {
				width: '100%',
				height: '100vh'
			},
			welcomeMessage: {
				width: '100%',
				position: 'absolute',
				top: '50%',
				transform: 'translateY(-200%)',
				textAlign: 'center',
				lineHeight: '325%'
			},
			settings: {
				width: '22rem',
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -15%)'
			}
		};
	}

	@autobind
	onLocaleChange(option) {
		this.props.setLocale(option.props.value);
	}

	@autobind
	onThemeChange(option) {
		this.props.setTheme(option.props.value);
	}

	@autobind
	onSubmit() {
		this.props.setSettingsProp({firstStart: false});
	}

	render() {
		let style = this.getStyle();

		return (
			<div style={style.container}>
				<div style={style.welcomeMessage}>
					<h1>{this.props.getLocalizedTranslation('welcomeMessage', 0)}</h1>
					<h4>{this.props.getLocalizedTranslation('welcomeMessage', 1)}</h4>
				</div>
				<div style={style.settings}>
					<FormLabel>{this.props.getLocalizedTranslation('language')}</FormLabel>
					<FormDropdownInput value={this.props.getSettingsProp('appearance.locale')} onChange={this.onLocaleChange}>
						<FormDropdownOption value="en">English</FormDropdownOption>
						<FormDropdownOption value="de">Deutsch</FormDropdownOption>
					</FormDropdownInput>

					<FormLabel>{this.props.getLocalizedTranslation('theme')}</FormLabel>
					<FormDropdownInput value={this.props.getSettingsProp('appearance.theme')} onChange={this.onThemeChange}>
						{Object.keys(this.props.getAllThemes()).map((theme, key) => {
							return <FormDropdownOption key={key} value={theme}>{theme}</FormDropdownOption>
						})}
					</FormDropdownInput>

					<FormButton onClick={this.onSubmit}>{this.props.getLocalizedTranslation('continueButton')}</FormButton>
				</div>
			</div>
		);
	}
}