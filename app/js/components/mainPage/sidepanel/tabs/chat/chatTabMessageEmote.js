import React from 'react';

export default class ChatTabMessageEmote extends React.Component {
	getStyle() {
		return {
			width: '2em',
			verticalAlign: 'middle'
		};
	}

	render() {
		return (
			<img style={this.getStyle()} src={'https://static-cdn.jtvnw.net/emoticons/v1/' + this.props.id + '/2.0'}/>
		);
	}
}