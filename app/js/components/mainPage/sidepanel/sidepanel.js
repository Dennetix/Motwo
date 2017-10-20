import React from 'react';
import radium from 'radium';
import autobind from 'autobind-decorator';
import settings from '../../../utils/settings';
import theme from '../../../utils/theme';

import SidepanelTopBar from './sidepanelTopBar';

@settings
@theme
@radium
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
				width: '4px',
				height: '100vh',
				float: 'right',

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
		if(this.mouseDown)	
			this.props.setSettingsProp({sidepanelWidth: document.getElementById('sidepanel').style.width}, false);

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

		return (
			<div style={style.sidepanel} id="sidepanel">
				<SidepanelTopBar/>
				<div style={style.dragbar} onMouseDown={this.onMouseDown}></div>
			</div>
		);
	}
}