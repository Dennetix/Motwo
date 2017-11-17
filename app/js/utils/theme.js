import React from 'react';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import config from '../config';
import { setSettingsProp, getSettingsProp } from './settings';
import utils from '../utils/utils';

const defaultThemes = {
	'Default Light': require('../../assets/themes/Default Light/theme.json'), 
	'Default Dark': require('../../assets/themes/Default Dark/theme.json')
};

let customThemes;

const loadCustomThemes = () => {
	customThemes = {};

	const themePath = path.join(config.userDataPath, 'themes/');
	
	mkdirp.sync(themePath); // Create the theme path if it is not there already

	fs.readdirSync(themePath)
		.filter(file => fs.lstatSync(path.join(themePath, file)).isDirectory() && fs.existsSync(path.join(themePath, file, 'theme.json'))) // Get all directories with a theme.json file in them
		.forEach(theme => {
			let file = fs.readFileSync(path.join(themePath, theme, 'theme.json'), 'utf-8');
			if(file) {
				if(!customThemes[theme]) {
					customThemes[theme] = JSON.parse(file);
				} else {
					console.warn('Two themes with same name: Only loading first one');
					return;
				}
			
				let defaultTheme = defaultThemes[customThemes[theme].defaultTheme];
				if(!defaultTheme) {
					console.warn('Default theme in theme "' + theme + '" not set. Using "Default Light"');
					customThemes[theme].defaultTheme = 'Default Light';
				}
			}
		});
};

export const getAllThemes = () => {
	// Load all custom themes if they aren't alreay loaded
	if(!customThemes)
		loadCustomThemes();

	return {...defaultThemes, ...customThemes};
}

const getDefaultThemeColor = (theme, themeName, name, isFile) => {
	if(isFile && (theme.files && theme.files[name]))  
		return path.join('./assets/themes/', themeName, theme.files[name]);
	else if(!isFile && (theme.values && theme.values[name]))
		return theme.values[name];

	console.error('Internal Error: "' + name + '" not found in theme "' + themeName + '"');
	return '';
};

export const getThemeProp = (name, isFile = false) => {
	// Load all custom themes if they aren't alreay loaded
	if(!customThemes)
		loadCustomThemes();

	let themeName = getSettingsProp('theme');

	let theme = customThemes[themeName];
	if(theme) {
		// The Theme is a custom theme. 
		// Check if the value or file is set. If not try the same with the default theme
		if(isFile && (theme.files && theme.files[name])) {
			return path.existsSync(path.join(config.userDataPath, 'themes/', themeName, theme.files[name])) 
					 ? path.join(config.userDataPath, 'themes/', themeName, theme.files[name])
					 : getDefaultThemeColor(theme, themeName, name, isFile);
		} else if(!isFile && (theme.values && theme.values[name])) {
			return theme.values[name];
		}

		return getDefaultThemeColor(defaultThemes[theme.defaultTheme], theme.defaultTheme, name, isFile);
	} else {
		// Check if the theme is default theme. If not change the theme settings to Default Light
		if(!(theme = defaultThemes[themeName])) {
			console.warn('Wrong theme setting in settings.json. Using "Default Light"');
			setSettingsProp({theme: 'Default Light'}, false);
			theme = defaultThemes['Default Light'];
		}

		return getDefaultThemeColor(theme, themeName, name, isFile);
	}
};

export const setTheme = (themeName, triggerUpdate = true) => {
	// Load all custom themes if they aren't alreay loaded
	if(!customThemes)
		loadCustomThemes();
	
	// Check if the theme exists. If not use Default Light
	if(defaultThemes[themeName] || customThemes[themeName]) {
		setSettingsProp({theme: themeName}, false);
	} else {
		console.error('Internal Error: Tried to set a non existing theme. Using "Default Light"');
		setSettingsProp({theme: 'Default Light'}, false);
	}

	if(triggerUpdate) {
		// Create and dispatch custom event to trigger a rerender in the theme decorator
		let event = document.createEvent('Event');
		event.initEvent('themeChanged', true, true);
		document.dispatchEvent(event);
	}
};

// This decorator will rerender the component after the theme has changed
export default WrappedComponent => {
	// Wrap the decorated component in another react component which will rerender after the theme has changed
	// This way the decorated component will also rerender
	return class extends React.Component {
		constructor(props) {
			super(props);

			this.state = {trigger: 0};

			// Trigger a rerender of this component and change the props for the WrappedComponent to ensure that it also rerenders
			document.addEventListener('themeChanged', () => {this.setState({trigger: this.state.trigger + 1})}, false);
		}

		render() {
			let props = {...this.props};
			props.themeTrigger = this.state.trigger;
			props.getAllThemes = getAllThemes;
			props.getThemeProp = getThemeProp;
			props.setTheme = setTheme;
			return <WrappedComponent {...props} />;
		}
	};
};