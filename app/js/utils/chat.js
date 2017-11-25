import net from 'net';
import config from '../config';
import { getLocalizedTranslation } from './locale';

import AppStore from '../stores/appStore';
import ChatStore from '../stores/chatStore';

export let socket = new net.Socket();

socket.on('data', data => {
	const msg = data.toString();

	console.log(msg);

	msg.split('\r\n').map(m => {
		if(m.startsWith('PING'))
			socket.write('PONG\r\n');
		else if(m.includes('PRIVMSG'))
			ChatStore.addMessage(m);
	});
});

socket.on('error', err => {
	console.error('Socket error: \n' + err);
});

export const login = (user, pass) => {
	return new Promise((resolve, reject) => {
			// Destroy the socket if it is connected and reconnect
			if(!socket.destroyed)
				socket.destroy();
			socket.connect(config.irc.port, config.irc.host);

			socket.write('PASS ' + pass + '\r\n');
			socket.write('NICK ' + user + '\r\n');

			let callback = data => {
				const msg = data.toString();
				msg.split('\r\n').map(m => {
					if(m.match(/:tmi\.twitch\.tv\s376\s\w+\s:>/i)) {		// Check if authentication succeeded 
						socket.write('CAP REQ :twitch.tv/tags\r\n');		// Reqest tag features for additional message information
						socket.write('CAP REQ :twitch.tv/commands\r\n');	// Reqest command features for several twitch commands
						socket.removeListener('data', callback);			// Remove this listener
		
						let oauthUser = m.split(' ')[2];
						if(user === oauthUser) {							// Check if the username corresponds to the username of the oauth token
							AppStore.setLogin(user, pass);
							resolve();
						} else {
							AppStore.setLogin(null);
							reject(getLocalizedTranslation('authFailed'));
						}
					} else if(m.includes(':tmi.twitch.tv NOTICE * :Login authentication failed') || m.includes(':tmi.twitch.tv NOTICE * :Invalid NICK')) {	// Check if authentication failed
						socket.removeListener('data', callback);			// Remove this listener
						AppStore.setLogin(null);
						reject(getLocalizedTranslation('authFailed'));
					}
				});
			};

			socket.on('data', callback);
	});
};

export const join = channel => {	
	return new Promise((resolve, reject) => {
		if(!AppStore.isLoggedIn) {
			console.error('Internal error: Tried to join a channel but not logged in');
			reject(getLocalizedTranslation('internalError'));
		}

		if(AppStore.hasJoined)
			socket.write('PART #' + AppStore.channel + '\r\n');	// Leave channel if already joined

		socket.write('JOIN #' + channel + '\r\n');

		let timeout;

		let callback = data => {
			let msg = data.toString();
			msg.split('\r\n').map(m => {
				if(m.includes(':' + AppStore.user + '!' + AppStore.user + '@' + AppStore.user + '.tmi.twitch.tv JOIN #' + channel)) {  // Check if the JOIN request succeeded
					AppStore.setChannel(channel);
				} else if (m.includes(':tmi.twitch.tv USERSTATE #' + channel) && AppStore.hasJoined) {
					clearTimeout(timeout);						// Delete the timeout
					socket.removeListener('data', callback);	// Remove this listener
					AppStore.setUserInfo(m);
					resolve();
				}
			});
		};

		timeout = setTimeout(() => { 						// The IRC server doesn't respond to invalid JOIN requests so there has to be a timeout
			socket.removeListener('data', callback);		// Remove the listener
			AppStore.setChannel(null);
			reject(getLocalizedTranslation('invalidChannel'));
		}, config.irc.joinReqTimeout);

		socket.on('data', callback);
	}); 
};

export default { socket, login, join };