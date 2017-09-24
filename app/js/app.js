import React from 'react';
import ReactDom from 'react-dom';
import { observer } from 'mobx-react';
import { setSettingsProp, getSettingsProp } from './config/settings';
import { setLocale, getAllLocales } from './config/locale';
import { setTheme, getAllThemes } from './config/theme';

import TestComponent from './components/test';

@observer
class App extends React.Component {
	render() {
		console.log(Object.keys(getAllThemes()));
		return (
			<div>
				<TestComponent/>

				<hr/>
				<h1>Themes</h1>
				<select value={getSettingsProp('theme')} onChange={(e) => {setTheme(e.target.value); this.forceUpdate()}}>
					{
						Object.keys(getAllThemes()).map((theme, key) => {
							return <option value={theme} key={key}>{theme}</option>
						}) 
					}
				</select>

				<hr/>
				<h1>Settings test</h1>
				<input value={getSettingsProp('testText')} onChange={(e) => {setSettingsProp({testText: e.target.value}); this.forceUpdate()}}/>

				<hr />
				<h1>Locales</h1>
				<select value={getSettingsProp('locale')} onChange={(e) => {setLocale(e.target.value); this.forceUpdate()}}>
					{
						Object.keys(getAllLocales()).map((locale, key) => {
							return <option value={locale} key={key}>{locale}</option>
						})
					}
				</select>
			</div>
		);
	}
}

ReactDom.render(<App />, document.getElementById('app'));