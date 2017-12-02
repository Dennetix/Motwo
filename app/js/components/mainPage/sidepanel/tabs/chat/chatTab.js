import React from 'react';
import autobind from 'autobind-decorator';
import { observer } from 'mobx-react';
import chat from '../../../../../utils/chat';
import { remote } from 'electron';

import ChatStore from '../../../../../stores/chatStore';

@observer
export default class ChatTab extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			autoScroll: true
		};

		setInterval(() => {
			if(this.state.autoScroll) {
				let chat = document.getElementById('chat');
				if(!chat) return;
				chat.scrollTop = chat.scrollTop + 0.3 * ((chat.scrollHeight - chat.clientHeight) - chat.scrollTop);
			}
		}, 40);
	}

	getStyle() {
		return {
			container: {
				width: '100%',
				height: '100%',
				overflowX: 'hidden',
				overflowY: 'auto'
			}
		};
	}

	@autobind
	onWheel(e) {
		if(this.state.autoScroll && e.deltaY < 0)
			this.setState({autoScroll: false});
	}

	@autobind
	onScroll(e) {
		if(!this.state.autoScroll && (Math.floor(e.target.scrollHeight - e.target.scrollTop) <= e.target.clientHeight + 10))
			this.setState({autoScroll: true});
	}

	render() {
		let style = this.getStyle();

		return (
			<div id="chat" onWheel={this.onWheel} onScroll={this.onScroll} style={style.container}>
				{ ChatStore.messages } 
			</div>
		)
	}
};
