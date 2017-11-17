const os = require('os');
const path = require('path');

module.exports = {
	debug: true,

	userDataPath: path.join(os.homedir(), '.motwo'),

	windowConfig: {
		width: 1280,
		height: 720,
		minWidth: 960,
		minHeight: 570,
		frame: false,
		show: false,
		transparent: false
	},

	irc: {
		host: 'irc.chat.twitch.tv',
		port: 6667, 
		joinReqTimeout: 1500
	},

	sidepanel: {
		minSidepanelWidth: 300
	}
};
