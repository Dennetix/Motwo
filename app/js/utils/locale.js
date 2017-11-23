import React from 'react';
import autobind from 'autobind-decorator';
import { setSettingsProp, getSettingsProp } from './settings';

const locales = {
	de: require('../../assets/locales/de.json'),
	en: require('../../assets/locales/en.json')
};

export const getAllLocales = () => {
	return locales;
}

export const getLocalizedTranslation = (name, index) => {
	let locale = locales[getSettingsProp('appearance.locale')];
	if(!locale) {
		console.warn('Wrong locale setting in settings.json. Using "en"');
		console.log('hell');
		setSettingsProp({appearance: {locale: 'en'}}, false);
		console.log('hdsa');
		locale = locales.en;
	}

	let translation = locale[name];
	if(!Array.isArray(translation) || translation.length < 1) {
		console.error('Internal error: Phrase "' + name + '" not found');
	 	return locale.noTranslation[0];
	}

	if(index) {
		if(translation.length - 1 >= index)
			return translation[index];
		else
			return translation[translation.length - 1];
	} else {
		return translation[0];
	}
};

export const setLocale = (locale, triggerUpdate = true) => {
	// Check if the locale exists. If not use english
	if(locales[locale]) {
		setSettingsProp({appearance: {locale}}, false);
	} else {
		console.error('Internal Error: Tried to set a non existing locale. Using "en"');
		setSettingsProp({appearance: {locale: 'en'}}, false);
	}

	if(triggerUpdate) {
		// Create and dispatch custom event to trigger a rerender in the locale decorator
		let event = document.createEvent('Event');
		event.initEvent('localeChanged', true, true);
		document.dispatchEvent(event);
	}
};

// This decorator will rerender the component after the locale settings have changed
export default WrappedComponent => {
	// Wrap the decorated component in another react component which will rerender after the locale settings have changed
	// This way the decorated component will also rerender
	return class extends React.Component {
		constructor(props) {
			super(props);

			this.state = {trigger: 0};
			
			// Trigger a rerender of this component and change the props for the WrappedComponent to ensure that it also rerenders
			document.addEventListener('localeChanged', this.onLocaleChanged, false);
		}

		@autobind
		onLocaleChanged() {
			this.setState({trigger: this.state.trigger + 1});
		}

		componentWillUnmount() {
			document.removeEventListener('localeChanged', this.onLocaleChanged, false);
		}

		render() {
			let props = {...this.props};
			props.localeTrigger = this.state.trigger;			
			props.getLocalizedTranslation = getLocalizedTranslation;
			props.setLocale = setLocale;
			return <WrappedComponent {...props} />;
		}
	};
};