import React from 'react';
import theme from '../config/theme';
import locale from '../config/locale';
import settings from '../config/settings';

@locale
@theme
@settings
export default class TestComponent extends React.Component {
	render() {
		console.dir(this);
		return (
			<div>
				<h1 style={{background: this.props.getThemeProp('textError')}}>{this.props.getLocalizedTranslation('formNotFilled') + '\t' + this.props.getSettingsProp('testText')}</h1>
			</div>
		);
	}
}
