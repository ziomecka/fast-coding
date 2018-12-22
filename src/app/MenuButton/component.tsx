import * as React from 'react';

import { MenuButtonProps } from './container';

/* Materials */
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import getTranslation from '@shared/get.translation';

import { withMenuRules } from '../MenuRulesHoc/'

class MenuButtonComponent extends React.Component<MenuButtonProps> {
    constructor (props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }

    componentDidUpdate() {
    }

    handleClose (loc: string) {
        this.props.history.push(loc);
    };

    areMenuButtonRulesMet (): boolean {
        const {
            menuItem: { rules : componentRules, appRoute },
            menuRules
        } = this.props;

        return (
            !componentRules ||
            componentRules.every(rule => menuRules({ path: appRoute })[rule]())
        );
    };

    getIconButton (onClick) {
        const {
            iconButton: { className: iconButtonClassName, ...other } = { className: '' },
            classes: { menuIconClass },
            icon // TODO GC?
        } = this.props;

        return (
            <IconButton
                className={ `${ menuIconClass } ${ iconButtonClassName }` }
                { ...other }
                { ...{ onClick } }
            >
                { icon }
            </IconButton>
        );
    }

    renderButton() {
        const {
            props: {
                menuItem: { appRoute },
                title
            }
        } = this;

        /** Render if rules are met */
        return ( this.areMenuButtonRulesMet() &&
            ((title && (
                <Tooltip title={getTranslation(this.props.localize, title)}>
                    { this.getIconButton(() => this.handleClose(appRoute)) }
                </Tooltip>
            )) ||
            this.getIconButton(() => this.handleClose(appRoute)))
        );
    }

    render () {
        return (
            <>
                { this.renderButton() }
            </>
        );
    }
}

export default withMenuRules(withStyles(styles)(MenuButtonComponent));