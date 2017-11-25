import React from 'react';
import autobind from 'autobind-decorator';
import theme from '../../utils/theme';

@theme
export default class FormDroptownInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showOptions: false
		};
	} 
	
	getStyle() {
		return {
			dropdown: {
				width: '100%',
				padding: '15px',
				margin: '10px 0',

				background: this.props.getThemeProp('formDropdownInputBackground'),
				color: this.props.getThemeProp('formDropdownInputColor')
			},
			arrow: {
				float: 'right'
			},
			options: {
				width: '100%',
				position: 'absolute',
				transform: 'translateY(-10px)',
				zIndex: '100'
			}
		};
	}

	@autobind
	onFocus() {
		this.setState({showOptions: true});
	}

	@autobind
	onBlur() {
		this.setState({showOptions: false});
	}
	
	@autobind
	onClick(e) {
		this.props.onChange && this.props.onChange(this.props.children.find(c => c.props.children === e.target.innerText));
		document.activeElement.blur();
	}

	render() {
		const style = this.getStyle();

		if(this.state.showOptions)
			style.dropdown.borderRadius = '3px 3px 0 0';
		else 
			style.dropdown.borderRadius = '3px';

		return (
			<div tabIndex="0" onFocus={this.onFocus} onBlur={this.onBlur}>
				<div style={style.dropdown}>
					<span>{
						this.props.children.find(c => c.props.value === this.props.value).props.children
					}</span>
					<span style={style.arrow}>v</span>
				</div>
				
				{
					this.state.showOptions && 
					<div style={style.options}>
						{this.props.children.map((c, key) => {
							return <div key={key} onClick={this.onClick}>{c}</div>
						})}
					</div>
				}
			</div>
		);
	}
}