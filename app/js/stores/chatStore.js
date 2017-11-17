import React from 'react';
import { observable } from 'mobx';
import { splitAt } from '../utils/utils';
import { getSettingsProp } from '../utils/settings';
import { getThemeProp } from '../utils/theme';

import utils from '../utils/utils';

import ChatMessage from '../components/mainPage/sidepanel/tabs/chat/chatMessage';
import ChatMessageEmote from '../components/mainPage/sidepanel/tabs/chat/chatMessageEmote';

class ChatStore {
	@observable messages = [];

	addMessage(msg) {
		const parameters = msg.split(/:\w+!\w+@\w+.tmi.twitch.tv/gi)[0].split(';');

		// Get list of badges
		const badges = parameters.find(p => p.startsWith('@badges=')).split('=')[1].split(',').map(b => b.split('/')[0]);
		
		// Get the nickname color
		let color = parameters.find(p => p.startsWith('color=')).split('=')[1];
		if(color === '')
			color = getThemeProp('accent');

		// Try to get display name as nickname; if display name is not set use username instead
		let nick = parameters.find(p => p.startsWith('display-name=')).split('=')[1];
		if(nick === '')
			nick = msg.split(/:\w+!\w+@/gi)[1].split('.')[0];

		// Check if background is dark
		let dark = false;
		if(this.messages.length > 0)
			dark = !this.messages[this.messages.length - 1].props.dark;

		// Get message id
		const id = parameters.find(p => p.startsWith('id=')).split('=')[1];

		// Create an array with the id and position of every emote
		// Seperate all different emotes
		// If the same emote was used multiple times twitch will only provide one id but several positions
		const emotesTemp = parameters.find(p => p.startsWith('emotes=')).split('=')[1].split('/');
		let emotes = [];
		if(emotesTemp[0].length > 0) {
			emotesTemp.map(e => {
				const parts = e.split(':');

				// Push back ervery emote seperatly
				parts[1].split(',').map(p => {
					const indecies = p.split('-');

					emotes.push({
						id: parts[0],
						firstIndex: parseInt(indecies[0]),
						lastIndex: parseInt(indecies[1])
					});
				});
			});

			// Sort them by their position
			emotes = emotes.sort((a, b) => a.firstIndex - b.firstIndex);
		}

		// Replace text with emote and construct message
		let element = 0;
		let position = 0;
		let message = [<span key="-1">{msg.split(/PRIVMSG\s#\w+\s:/gi)[1]}</span>]; 
		emotes.map((e, key) => {
			let first = splitAt(message[element].props.children, e.firstIndex - position);
			message[element] = <span key={key + '1'}>{first[0]}</span>;	
			message.push(<span key={key + '2'}>{first[1]}</span>);

			let last = splitAt(message[element + 1].props.children, (e.lastIndex - e.firstIndex) + 1);
			message[element + 1] = <ChatMessageEmote key={key + '3'} id={e.id} msg={last[0]} />;
			message.push(<span key={key + '4'}>{last[1]}</span>);

			element += 2;
			position = e.lastIndex + 1;
		});

		// Delete oldest message if the length of the messages reached the max
		if(this.messages.length >= getSettingsProp('maxChatMessages'))
			this.messages.shift();

		// Push back new message
		this.messages.push(<ChatMessage key={id} id={id} badges={badges} color={color} nick={nick} dark={dark}>{message}</ChatMessage>);
	}
}

export default new ChatStore();