import { observable } from 'mobx';

class AppStore {
	@observable errorMessage = '';
	@observable isLoading = true;
	
	@observable isLoggedIn = false;
	@observable user = null;
	@observable pass = null;
	
	@observable hasJoined = false;
	@observable channel = null;

	@observable isBroadcaster = false;
	@observable isMod = false;
	@observable displayName = null;

	setLogin(user, pass) {
		if(user && pass) {
			this.isLoggedIn = true;
			this.user = user;
			this.pass = pass;
		} else {
			this.isLoggedIn = false;
			this.user = null;
			this.pass = null;
			this.setChannel(null);
		}
	}

	setChannel(channel) {
		if(channel) {
			this.hasJoined = true;
			this.channel = channel;
		} else {
			this.hasJoined = false;
			this.channel = null;
		}
	}

	setUserInfo(msg) {
		let parameters = msg.split(/:tmi.twitch.tv/gi)[0].split(';');

		parameters.find(p => p.startsWith('@badges')).split('=')[1].split(',').map(b => {
			if(b.startsWith('broadcaster'))
				this.isBroadcaster = true;
			else if(b.startsWith('moderator'))
				this.isMod = true;
		});

		this.displayName = parameters.find(p => p.startsWith('display-name')).split('=')[1];

		document.title = 'Motwo - ' + this.displayName;
	}
}

export default new AppStore();
