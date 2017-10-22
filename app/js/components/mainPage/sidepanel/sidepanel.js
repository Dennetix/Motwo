import React from 'react';
import radium from 'radium';
import autobind from 'autobind-decorator';
import settings from '../../../utils/settings';
import theme from '../../../utils/theme';
import { observer } from 'mobx-react';

import SidepanelTopBar from './sidepanelTopBar';

import ChatSidepanelTab from './tabs/chatSidepanelTab';
import UserListSidepanelTab from './tabs/userListSidepanelTab';
import ModulesSidepanelTab from './tabs/modulesSidepanelTab';
import SettingsSidepanelTab from './tabs/settingsSidepanelTab';

import SidepanelStore from '../../../stores/sidepanelStore';
import { SidepanelTabs } from '../../../stores/sidepanelStore';

@settings
@theme
@radium
@observer
export default class Sidepanel extends React.Component {
	constructor(props) {
		super(props);

		document.addEventListener('mouseup', this.onMouseUp);
		document.addEventListener('mousemove', this.onMouseMove);
	}

	getStyle() {
		return {
			sidepanel: {
				width: this.props.getSettingsProp('sidepanelWidth'),
				height: '100vh',
				maxWidth: '50%',
				float: 'left',

				background: this.props.getThemeProp('sidepanelBackground'),

				overflowY: 'hidden'
			},
			dragbar: {
				width: '6px',
				height: '100vh',
				position: 'fixed',
				top: 0,
				left: 'calc(' + this.props.getSettingsProp('sidepanelWidth') + ' - 3px)',

				':hover': {
					cursor: 'ew-resize'
				}
			}
		};
	}

	@autobind
	onMouseDown() {
		this.mouseDown = true;
	}

	@autobind
	onMouseUp() {
		if(this.mouseDown) {
			this.props.setSettingsProp({sidepanelWidth: document.getElementById('sidepanel').style.width}, false);
			document.getElementById('dragbar').style.left = 'calc(' + this.props.getSettingsProp('sidepanelWidth') + ' - 3px)';
		}

		this.mouseDown = false;
	}

	@autobind
	onMouseMove(e) {
		if(this.mouseDown && (e.pageX > 250 && e.pageX < (window.innerWidth / 2))) {
			document.getElementById('sidepanel').style.width = e.pageX + 'px';
		}
	}

	render() {
		let style = this.getStyle();

		let chatStyle = { display: SidepanelStore.currentTab === SidepanelTabs.CHAT ? 'block' : 'none' };
		let userListStyle = { display: SidepanelStore.currentTab === SidepanelTabs.USER_LIST ? 'block' : 'none' };
		let modulesStyle = { display: SidepanelStore.currentTab === SidepanelTabs.MODULES ? 'block' : 'none' };
		let settingsStyle = { display: SidepanelStore.currentTab === SidepanelTabs.SETTINGS ? 'block' : 'none' };

		console.log(userListStyle);

		return (
			<div style={style.sidepanel} id="sidepanel">
				<SidepanelTopBar/>
				<div style={style.dragbar} id="dragbar" onMouseDown={this.onMouseDown}></div>

				<div style={chatStyle}><ChatSidepanelTab /></div>
				<div style={userListStyle}><UserListSidepanelTab /></div>
				<div style={modulesStyle}><ModulesSidepanelTab /></div>
				<div style={settingsStyle}><SettingsSidepanelTab /></div>
			</div>
		);
	}
}