import React from 'react';

export default class ChatMessage extends React.Component {
	getStyle() {
		return {
			message: {
				padding: '6px 5px',
				background: this.props.dark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0)',
				lineHeight: '130%'
			},
			nick: {
				color: this.props.color
			}
		};
	}

	render() {
		const style = this.getStyle();

		return (
			<div style={style.message}>
				<b style={style.nick}>{this.props.nick}</b>:<br/>
				{this.props.children}
			</div>
		);
	}
}	