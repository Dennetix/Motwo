import React from 'react';
import radium from 'radium';
import autobind from 'autobind-decorator';
import { observer } from 'mobx-react';
import config from '../../../config';
import theme from '../../../utils/theme';
import { setSettingsProp } from '../../../utils/settings';

import SidepanelTopBar from './sidepanelTopBar';

import ChatSidepanelTab from './tabs/chat/chatTab';
import UserListSidepanelTab from './tabs/userList/userListTab';
import ModulesSidepanelTab from './tabs/modules/modulesTab';
import SettingsSidepanelTab from './tabs/settings/settingsTab';

import SidepanelStore from '../../../stores/sidepanelStore';
import { SidepanelTabs } from '../../../stores/sidepanelStore';

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
				width: SidepanelStore.sidepanelWidth + 'px',
				height: '100vh',
				maxWidth: '50%',
				position: 'relative',
				
				background: this.props.getThemeProp('sidepanelBackground')
			},
			dragbar: {
				width: '6px',
				height: '95%',
				position: 'absolute',
				top: 0,
				right: 0,

				':hover': {
					cursor: 'ew-resize'
				}
			},
			tabs: {
				height: 'calc(100% - 3.5rem - 1px)',
				overflowX: 'hidden',
				overflowY: 'auto'
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
			setSettingsProp({
				sidepanelWidth: parseInt(document.getElementById('sidepanel').style.width.split('px')[0])
			}, false);
		}

		this.mouseDown = false;
	}

	@autobind
	onMouseMove(e) {
		if(this.mouseDown && (e.pageX > config.sidepanel.minSidepanelWidth && e.pageX < (window.innerWidth / 2))) {
			document.getElementById('sidepanel').style.width = e.pageX + 'px';
			SidepanelStore.sidepanelWidth = e.pageX;
		}
	}

	render() {
		let style = this.getStyle();

		let chatStyle = { display: SidepanelStore.currentTab === SidepanelTabs.CHAT ? 'block' : 'none' };
		let userListStyle = { display: SidepanelStore.currentTab === SidepanelTabs.USER_LIST ? 'block' : 'none' };
		let modulesStyle = { display: SidepanelStore.currentTab === SidepanelTabs.MODULES ? 'block' : 'none' };
		let settingsStyle = { display: SidepanelStore.currentTab === SidepanelTabs.SETTINGS ? 'block' : 'none' };

		return (
			<div style={style.sidepanel} id="sidepanel">
				<SidepanelTopBar/>
				<div style={style.dragbar} id="dragbar" onMouseDown={this.onMouseDown}></div>

				<div style={style.tabs}>
					<div style={chatStyle}><ChatSidepanelTab /></div>
					<div style={userListStyle}><UserListSidepanelTab /></div>
					<div style={modulesStyle}><ModulesSidepanelTab /></div>
					<div style={settingsStyle}><SettingsSidepanelTab /></div>
				</div>
			</div>
		);
	}
}