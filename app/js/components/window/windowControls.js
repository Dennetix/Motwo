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

		remote.getCurrentWindow().on('maximize', this.forceUpdate.bind(this));
		remote.getCurrentWindow().on('unmaximize', this.forceUpdate.bind(this));

		this.styles = {
			dragbar: {
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '3.5rem',
				WebkitAppRegion: 'drag',
				pointerEvents: 'none'
			},
			controls: {
				WebkitAppRegion: 'no-drag',
				position: 'fixed',
				top: '14px',
				right: '12px'
			},
			icon: {
				width: '25px',
				height: '25px',
				padding: '0 4px',
				opacity: '0.6',
				transition: 'opacity 0.15s',

				':hover': {
					opacity: '1',
					cursor: 'pointer'
				}
			}
		}
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
		return (
			<div style={this.styles.dragbar}>
				<div style={this.styles.controls}>
					<img key="minimize" src={this.props.getThemeProp('windowControlsMinimize', true)} style={this.styles.icon} onClick={this.onMinimize} />
					<img key="maximizeRestore" src={remote.getCurrentWindow().isMaximized() ? this.props.getThemeProp('windowControlsRestore', true) : this.props.getThemeProp('windowControlsMaximize', true)} style={this.styles.icon} onClick={this.onMaximizeRestore} />
					<img key="close" src={this.props.getThemeProp('windowControlsClose', true)} style={this.styles.icon} onClick={this.onClose} />
				</div>
			</div>
		);
	}
}
