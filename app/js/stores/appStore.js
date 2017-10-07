import { observable } from 'mobx';

class AppStore {
	@observable errorMessage = '';
	@observable isLoading = true;
	@observable isLoggedIn = false;
	@observable hasJoined = false;
	@observable user = null;
	@observable pass = null;
	@observable channel = null;

	setLogin(user, pass) {
		if(user && pass) {
			this.isLoggedIn = true;
			this.user = user;
			this.pass = pass;
			document.title = 'Motwo - ' + this.user;
		} else {
			this.isLoggedIn = false;
			this.user = null;
			this.pass = null;
			document.title = 'Motwo';
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
}

export default new AppStore();
