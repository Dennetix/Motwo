import React from 'react';
import radium from 'radium';
import autobind from 'autobind-decorator';
import settings from '../../../utils/settings';

import SidepanelTopBar from './sidepanelTopBar';

@settings
@radium
export default class Sidepanel extends React.Component {
	constructor(props) {
		super(props);

		this.styles = {
			sidepanel: {
				background: '#333333',
				width: this.props.getSettingsProp('sidepanelWidth'),
				maxWidth: '50%',
				height: '100vh',
				overflowY: 'hidden'
			},
			dragbar: {
				width: '4px',
				height: '100vh',
				float: 'right',

				':hover': {
					cursor: 'ew-resize'
				}
			}
		};

		document.addEventListener('mouseup', this.onMouseUp);
		document.addEventListener('mousemove', this.onMouseMove);
	}

	@autobind
	onMouseDown() {
		this.mouseDown = true;
	}

	@autobind
	onMouseUp() {
		if(this.mouseDown)	
			this.props.setSettingsProp({sidepanelWidth: document.getElementById('sidepanel').style.width});

		this.mouseDown = false;
	}

	@autobind
	onMouseMove(e) {
		if(this.mouseDown && (e.pageX > 250 && e.pageX < (window.innerWidth / 2))) {
			document.getElementById('sidepanel').style.width = e.pageX + 'px';
		}
	}

	render() {
		return (
			<div style={this.styles.sidepanel} id="sidepanel">
				<SidepanelTopBar/>
				<div style={this.styles.dragbar} onMouseDown={this.onMouseDown}></div>
			</div>
		);
	}
}