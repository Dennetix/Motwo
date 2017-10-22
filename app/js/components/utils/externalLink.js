import React from 'react';
import radium from 'radium';
import autobind from 'autobind-decorator';
import { shell } from 'electron';
import theme from '../../utils/theme';

@theme
@radium
export default class ExternalLink extends React.Component {
    getStyle() {
        return {
            color: this.props.getThemeProp('anchorText'),
            textDecoration: 'none',

            ':hover': {
                textDecoration: 'underline'
            }
        };
    }

    @autobind
	onClick(e) {
		e.preventDefault();
		shell.openExternal(e.target.href);
	}

	render() {
        let style = this.getStyle();
        
		return (
			<a style={style} href={this.props.href} onClick={this.onClick}>{this.props.children}</a>
		);
	}
};
