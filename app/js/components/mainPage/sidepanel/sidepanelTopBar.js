import React from 'react';
import radium from 'radium';
import autobind from 'autobind-decorator';
import theme from '../../../utils/theme';
import { observer } from 'mobx-react';

import SidepanelStore from '../../../stores/sidepanelStore';
import { SidepanelTabs } from '../../../stores/sidepanelStore'; 

@theme
@radium
@observer
export default class SidepanelTopBar extends React.Component {
	getStyle() {
		return {
			topBar: {
				width: '100%',
				height: '3.5rem',
				borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
				WebkitAppRegion: 'no-drag'
			},
			tab: {
				width: 'calc(25%)',
				height: '100%', 
				display: 'inline-block',
				transition: 'background 0.1s',
				
				':hover': {
					background: 'rgba(0, 0, 0, 0.1)'
				},
			},
			tabBorder: {
				borderLeft: '1px solid rgba(0, 0, 0, 0.2)'
			},
			tabActive: {
				background: 'rgba(0, 0, 0, 0.25)',

				':hover': {
					background: 'rgba(0, 0, 0, 0.25)'
				}
			},
			icon: {
				width: '100%',
				height: '1.8rem',
				margin: '15px auto 10px auto'
			}
		};
	}

	@autobind
	onClick(e) {
		if(e.target.id === 'chat')
			SidepanelStore.currentTab = SidepanelTabs.CHAT;
		else if(e.target.id === 'userlist')
			SidepanelStore.currentTab = SidepanelTabs.USER_LIST;
		else if(e.target.id === 'modules')
			SidepanelStore.currentTab = SidepanelTabs.MODULES;
		else if(e.target.id === 'settings')
			SidepanelStore.currentTab = SidepanelTabs.SETTINGS;
	}

	render() {
		let style = this.getStyle();

		let chatActiveStyle = SidepanelStore.currentTab === SidepanelTabs.CHAT ? style.tabActive : null;
		let userListActiveStyle = SidepanelStore.currentTab === SidepanelTabs.USER_LIST ? style.tabActive : null;
		let modulesActiveStyle = SidepanelStore.currentTab === SidepanelTabs.MODULES ? style.tabActive : null;
		let settingsActiveStyle = SidepanelStore.currentTab === SidepanelTabs.SETTINGS ? style.tabActive : null;

		return (
			<div style={style.topBar}>
				<div id="chat" key="chat" style={[style.tab, chatActiveStyle]} onClick={this.onClick}>
					<img style={style.icon} src={this.props.getThemeProp('iconSidepanelTopBarChat', true)} />
				</div>

				<div id="userlist" key="userlist" style={[style.tab, style.tabBorder, userListActiveStyle]} onClick={this.onClick}>
					<img style={style.icon} src={this.props.getThemeProp('iconSidepanelTopBarUserList', true)} />
				</div>

				<div id="modules" key="modules" style={[style.tab, style.tabBorder, modulesActiveStyle]} onClick={this.onClick}>
					<img style={style.icon} src={this.props.getThemeProp('iconSidepanelTopBarModules', true)} />
				</div>

				<div id="settings" key="settings" style={[style.tab, style.tabBorder, settingsActiveStyle]} onClick={this.onClick}>
					<img style={style.icon} src={this.props.getThemeProp('iconSidepanelTopBarSettings', true)} />
				</div>
			</div>
		);
	}
}