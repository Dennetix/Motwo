import React from 'react';
import autobind from 'autobind-decorator';
import locale from '../utils/locale';
import settings from '../utils/settings';
import theme from '../utils/theme';

import FormLabel from '../components/form/formLabel';
import FormSelectInput from '../components/form/formSelectInput';
import FormSelectOption from '../components/form/formSelectOption';
import FormButton from '../components/form/formButton';

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
	onLocaleChange(e) {
		this.props.setLocale(e.target.options[e.target.selectedIndex].value);
	}

	@autobind
	onThemeChange(e) {
		this.props.setTheme(e.target.options[e.target.selectedIndex].value);
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
					<FormSelectInput value={this.props.getSettingsProp('appearance.locale')} onChange={this.onLocaleChange}>
						<FormSelectOption value="en">English</FormSelectOption>
						<FormSelectOption value="de">Deutsch</FormSelectOption>
					</FormSelectInput>

					<FormLabel>{this.props.getLocalizedTranslation('theme')}</FormLabel>
					<FormSelectInput value={this.props.getSettingsProp('appearance.theme')} onChange={this.onThemeChange}>
						{Object.keys(this.props.getAllThemes()).map((theme, key) => {
							return <FormSelectOption key={key} value={theme}>{theme}</FormSelectOption>
						})}
					</FormSelectInput>

					<FormButton onClick={this.onSubmit}>{this.props.getLocalizedTranslation('continueButton')}</FormButton>
				</div>
			</div>
		);
	}
}