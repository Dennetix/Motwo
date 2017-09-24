import React from 'react';
import { setSettingsProp, getSettingsProp } from './settings';
import utils from '../utils/utils';

const locales = {
	de: require('../../assets/locales/de.json'),
	en: require('../../assets/locales/en.json')
};

export const getAllLocales = () => {
	return locales;
}

export const getLocalizedTranslation = (name, index) => {
	let locale = locales[getSettingsProp('locale')];
	if(!locale) {
		console.warn('Wrong locale setting in settings.json. Using "en"');
		console.log('hell');
		setSettingsProp({locale: 'en'}, false);
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
	if(locales[locale]) {
		setSettingsProp({locale: locale}, false);
	} else {
		console.error('Internal Error: Tried to set a non existing locale. Using "en"');
		setSettingsProp({locale: 'en'}, false);
	}

	if(triggerUpdate) {
		let event = document.createEvent('Event');
		event.initEvent('localeChanged', true, true);
		document.dispatchEvent(event);
	}
};

export default WrappedComponent => {
	return class extends React.Component {
		constructor(props) {
			super(props);

			document.addEventListener('localeChanged', () => {this.forceUpdate()}, false);
		}

		render() {
			let props = {...this.props};
			props.getLocalizedTranslation = getLocalizedTranslation;
			props.setLocale = setLocale;
			return <WrappedComponent {...props} />;
		}
	};
};