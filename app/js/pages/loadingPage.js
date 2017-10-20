import React from 'react';
import theme from '../utils/theme';

@theme
export default class LoginPage extends React.Component {
	getStyle() {
		return {
			container: {
				width: '100%',
				height: '100vh'
			},
			loader: {
				width: '75px',
				height: '75px',
				position: 'absolute',
				left: '50%',
				top: '50%',
				transform: 'translate(-50%, -60%)'
			}
		};
	}

	render() {
		let style = this.getStyle();

		return (
			<div style={style.container}>
				<img style={style.loader} src={this.props.getThemeProp('animationLoader', true)}/>
			</div>
		);
	}
}