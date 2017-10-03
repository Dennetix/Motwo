const os = require('os');
const path = require('path');

module.exports = {
	debug: true,

	userDataPath: path.join(os.homedir(), '.motwo'),

	windowConfig: {
		width: 1280,
		height: 720,
		minWidth: 768,
		minHeight: 500,
		frame: false,
		show: false
	},

	irc: {
		host: 'irc.chat.twitch.tv',
		port: 6667, 
		joinReqTimeout: 1500
	}
};
