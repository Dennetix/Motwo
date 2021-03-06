import React from 'react';
import autobind from 'autobind-decorator';
import radium from 'radium';
import { remote } from 'electron'
import theme from '../../utils/theme';

@theme
@radium
export default class WindowControls extends React.Component {
	constructor(props) {
		super(props);

		remote.getCurrentWindow().removeAllListeners('maximize');
		remote.getCurrentWindow().removeAllListeners('unmaximize');

		remote.getCurrentWindow().on('maximize', () => {this.forceUpdate()});
		remote.getCurrentWindow().on('unmaximize', () => {this.forceUpdate()});
	}

	getStyle() {
		return {
			dragbar: {
				width: '100%',
				height: '3.5rem',
				position: 'fixed',
				top: 1,
				left: 0,
				WebkitAppRegion: 'drag',
				pointerEvents: 'none'
			},
			controls: {
				position: 'fixed',
				top: '14px',
				right: '12px',
				WebkitAppRegion: 'no-drag'
			},
			icon: {
				width: '25px',
				height: '25px',
				padding: '0 4px',
				opacity: '0.7',
				transition: 'opacity 0.15s',
				pointerEvents: 'visible',

				':hover': {
					opacity: '1',
					cursor: 'pointer'
				}
			}
		};
	}

	@autobind
	onMinimize() {
		remote.getCurrentWindow().minimize();
	}

	@autobind
	onMaximizeRestore() {
		if(remote.getCurrentWindow().isMaximized())
			remote.getCurrentWindow().restore();
		else 
			remote.getCurrentWindow().maximize();
	}

	@autobind
	onClose() {
		remote.getCurrentWindow().close();
	}

	render() {
		let style = this.getStyle();

		return (
			<div style={style.dragbar}>
				<div style={style.controls}>
					<img key="minimize" src={this.props.getThemeProp('iconWindowControlsMinimize', true)} style={style.icon} onClick={this.onMinimize} />
					<img key="maximizeRestore" src={remote.getCurrentWindow().isMaximized() ? this.props.getThemeProp('iconWindowControlsRestore', true) : this.props.getThemeProp('iconWindowControlsMaximize', true)} style={style.icon} onClick={this.onMaximizeRestore} />
					<img key="close" src={this.props.getThemeProp('iconWindowControlsClose', true)} style={style.icon} onClick={this.onClose} />
				</div>
			</div>
		);
	}
}
