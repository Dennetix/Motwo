import React from 'react';
import autobind from 'autobind-decorator';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import config from '../config';
import utils from '../utils/utils';

let settings = { // Initialize with default settings
	firstStart: true,

	appearance: {
		locale: 'en',
		theme: 'Default Dark',
		sidepanelWidth: 350
	},
	
	chat: {
		maxChatMessages: 100
	}
};

if(fs.existsSync(path.join(config.userDataPath, 'settings.json'))) {
	let file = fs.readFileSync(path.join(config.userDataPath, 'settings.json'), 'utf-8');
	settings = file ? utils.mergeObjects(settings, JSON.parse(file)) : settings; // Merge user settings with default settings
}

export const getSettingsProp = (prop) => {
	prop = prop.replace(/\[(\w+)\]/g, '.$1');  // Convert indices to properties
	let props = prop.split('.');
	let res = settings;
	for (var i = 0, n = props.length; i < n; ++i) {
		if(!utils.isDefined(res))
			return;

		if (props[i] in res) 
			res = res[props[i]];
		else
			return;
	}
	return res;
};

export const setSettingsProp = (prop, triggerUpdate = true) => {
	settings = utils.mergeObjects(settings, prop);
	mkdirp.sync(config.userDataPath); // Create settings path if it doesn't exist
	fs.writeFileSync(path.join(config.userDataPath, 'settings.json'), JSON.stringify(settings), { flag: 'w' });  // Write new settings to file. W-Flag creates the file if doesn't exist

	if(triggerUpdate) {
		// Create and dispatch custom event to trigger a rerender in the settings decorator
		let event = document.createEvent('Event');
		event.initEvent('settingsChanged', true, true);
		document.dispatchEvent(event);
	}
};

// This decorator will rerender the component after the settings have changed
export default WrappedComponent => {
	// Wrap the decorated component in another react component which will rerender after the settings have changed
	// This way the decorated component will also rerender
	return class extends React.Component {
		constructor(props) {
			super(props);

			this.state = {trigger: 0};
			
			// Trigger a rerender of this component and change the props for the WrappedComponent to ensure that it also rerenders
			document.addEventListener('settingsChanged', this.onSettingsChanged, false);
		}

		@autobind
		onSettingsChanged() {
			this.setState({trigger: this.state.trigger + 1});
		}

		componentWillUnmount() {
			document.removeEventListener('settingsChanged', this.onSettingsChanged, false);
		}

		render() {
			let props = {...this.props};
			props.settingsTrigger = this.state.trigger;
			props.getSettingsProp = getSettingsProp;
			props.setSettingsProp = setSettingsProp;
			return <WrappedComponent {...props} />;
		}
	};
};