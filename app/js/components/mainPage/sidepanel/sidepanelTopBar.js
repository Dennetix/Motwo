import React from 'react';
import radium from 'radium';
import theme from '../../../utils/theme';

@theme
@radium
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
				width: 'calc(25% - 1px)',
				height: '100%', 
				display: 'inline-block',
				transition: 'background 0.1s',
				
				':hover': {
					background: 'rgba(0, 0, 0, 0.2)'
				},
			},
			tabBorder: {
				borderLeft: '1px solid rgba(0, 0, 0, 0.2)'
			},
			icon: {
				width: '100%',
				height: '1.8rem',
				margin: '15px auto 10px auto'
			}
		};
	}

	render() {
		let style = this.getStyle();

		return (
			<div style={style.topBar}>
				<div key="tab1" style={style.tab}><img style={style.icon} src={this.props.getThemeProp('iconSidepanelTopBarChat', true)} /></div>
				<div key="tab2" style={[style.tab, style.tabBorder]}><img style={style.icon} src={this.props.getThemeProp('iconSidepanelTopBarModules', true)} /></div>
				<div key="tab3" style={[style.tab, style.tabBorder]}><img style={style.icon} src={this.props.getThemeProp('iconSidepanelTopBarShop', true)} /></div>
				<div key="tab4" style={[style.tab, style.tabBorder]}><img style={style.icon} src={this.props.getThemeProp('iconSidepanelTopBarSettings', true)} /></div>
			</div>
		);
	}
}