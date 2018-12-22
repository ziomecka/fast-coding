import * as React from 'react';

import { MenuButtonProps } from './container';
import { LanguagesEnum } from '@applicationTypes';
import { AppRoutesEnum, SubMenuRulesEnum, NavRulesEnum } from '@appTypes';

/* Materials */
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

const { notCurrentLocation, onlyAuthorized, onlyUnauthorized, notActiveLanguage } = SubMenuRulesEnum;

import getTranslation from '@shared/get.translation';
import { getActiveLanguage } from 'react-localize-redux';

/**
 * @param { boolean } render                  - is menu rendered?
 *                                              Changes only if props authorized or location.pathname do change
 *                                              Increases menu responsiveness
 * */
interface InternalState {
    render: boolean;
};

class MenuButtonComponent extends React.Component<MenuButtonProps, InternalState> {
    constructor (props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);

        this.state = {
            render: this.areMenuButtonRulesMet()
        }
    }

    get currentPathname () {
        return this.props.location.pathname;
    }

    componentDidUpdate(prevProps: MenuButtonProps) {
        const { props: { location: { pathname }, authorized } } = this;
        const { location: { pathname: prevPathname }, authorized: prevAuthorized } = prevProps;

        /**
         *  Updates menu only if pathname or authorization changed, therefore
         *  menu ressponsiveness is increased.
         */
        if (( pathname !== prevPathname || authorized !== prevAuthorized )) {
            this.setState({ render: this.areMenuButtonRulesMet() });
        }
    }

    handleClose (loc: string) {
        this.props.history.push(loc);
    };

    // @ts-ignore
    get menuButtonRules (): {[key: SubMenuRulesEnum]: (path?: AppRoutesEnum, lang?: LanguagesEnum) => boolean } {
        return {
            [onlyAuthorized]: () => this.props.authorized,
            [onlyUnauthorized]: () => !this.props.authorized,
            [notCurrentLocation]: (path: AppRoutesEnum) => path !== this.currentPathname,
            [notActiveLanguage]: (path: AppRoutesEnum, lang: LanguagesEnum) => lang!== getActiveLanguage(this.props.localize).code
        }
    };

    areMenuButtonRulesMet (): boolean {
        const {
            menuItem: { rules, appRoute },
            title
        } = this.props;
        return (!rules || rules.every(rule => this.menuButtonRules[rule](appRoute)));
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
            },
            state: { render }
        } = this;

        /** Render if rules are met */
        return ( render &&
            (title && (
                <Tooltip title={getTranslation(this.props.localize, title)}>
                    { this.getIconButton(() => this.handleClose(appRoute)) }
                </Tooltip>
            )) ||
            this.getIconButton(() => this.handleClose(appRoute))
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

export default withStyles(styles)(MenuButtonComponent);