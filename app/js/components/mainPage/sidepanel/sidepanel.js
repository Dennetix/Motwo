import React from 'react';
import radium from 'radium';
import autobind from 'autobind-decorator';
import { observer } from 'mobx-react';
import config from '../../../config';
import theme from '../../../utils/theme';
import { setSettingsProp } from '../../../utils/settings';

import SidepanelTopBar from './sidepanelTopBar';

import ChatTab from './tabs/chat/chatTab';
import UserListTab from './tabs/userList/userListTab';
import ModulesTab from './tabs/modules/modulesTab';
import SettingsTab from './tabs/settings/settingsTab';

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
				appearance: {sidepanelWidth: parseInt(document.getElementById('sidepanel').style.width.split('px')[0])}
			}, false);
		}

		this.mouseDown = false;
	}

	@autobind
	onMouseMove(e) {
		if(this.mouseDown && (e.pageX > config.appearance.minSidepanelWidth && e.pageX < (window.innerWidth / 2))) {
			document.getElementById('sidepanel').style.width = e.pageX + 'px';
			SidepanelStore.sidepanelWidth = e.pageX;
		}
	}

	render() {
		let style = this.getStyle();

		return (
			<div style={style.sidepanel} id="sidepanel">
				<SidepanelTopBar/>
				<div style={style.dragbar} id="dragbar" onMouseDown={this.onMouseDown}></div>

				<div style={style.tabs}>
					{ (() => {
						switch(SidepanelStore.currentTab) {
							case SidepanelTabs.CHAT:
								return <ChatTab />;
							case SidepanelTabs.USER_LIST:
								return <UserListTab />;
							case SidepanelTabs.MODULES: 
								return <ModulesTab />;
							case SidepanelTabs.SETTINGS: 
								return <SettingsTab />;
						};
					})() }
				</div>
			</div>
		);
	}
}