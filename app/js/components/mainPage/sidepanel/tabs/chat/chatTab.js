import React from 'react';
import autobind from 'autobind-decorator';
import { observer } from 'mobx-react';
import chat from '../../../../../utils/chat';

import ChatStore from '../../../../../stores/chatStore';

@observer
export default class ChatTab extends React.Component {
	getStyle() {
		return {
			container: {
				width: '100%',
				height: '100%'
			}
		};
	}

	render() {
		let style = this.getStyle();

		return (
			<div style={style.container}>
				{ ChatStore.messages } 
			</div>
		)
	}
};
