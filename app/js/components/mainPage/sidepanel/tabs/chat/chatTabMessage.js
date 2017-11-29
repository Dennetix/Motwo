import React from 'react';
import theme from '../../../../../utils/theme';

@theme
export default class ChatTabMessage extends React.Component {
	getStyle() {
		return {
			message: {
				padding: '6px 5px',
				background: this.props.dark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0)',
				lineHeight: '130%'
			},
			badge: {
				width: '1.5em',
				verticalAlign: 'middle',
				marginRight: '5px'
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
				{
					this.props.badges.map((b, key) => {
						switch(b) {
							case "admin":
								return <img key={key} style={style.badge} src={this.props.getThemeProp('badgeAdmin', true)} />;
							case "broadcaster":
								return <img key={key} style={style.badge} src={this.props.getThemeProp('badgeBroadcaster', true)} />;
							case "global_mod":
								return <img key={key} style={style.badge} src={this.props.getThemeProp('badgeGlobalMod', true)} />
							case "moderator":
								return <img key={key} style={style.badge} src={this.props.getThemeProp('badgeModerator', true)} />;
							case "premium":
								return <img key={key} style={style.badge} src={this.props.getThemeProp('badgePrime', true)} />;
							case "staff":
								return <img key={key} style={style.badge} src={this.props.getThemeProp('badgeStaff', true)} />;
							case "subscriber":
								return <img key={key} style={style.badge} src={this.props.getThemeProp('badgeSubscriber', true)} />;
							case "turbo":
								return <img key={key} style={style.badge} src={this.props.getThemeProp('badgeTurbo', true)} />;
							case "partner":
								return <img key={key} style={style.badge} src={this.props.getThemeProp('badgeVerified', true)} />;
						}						
					})
				}

				<b style={style.nick}>{this.props.nick}</b>:<br/>
				{this.props.children}
			</div>
		);
	}
}	