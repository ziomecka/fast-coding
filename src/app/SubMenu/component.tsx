import * as React from 'react';

import { NavLink } from 'react-router-dom';

import { SubMenuProps, SubMenuItemType } from './container';
import { AppRoutesEnum, SubMenuRulesEnum, NavRulesEnum, LanguagesEnum } from '@appTypes';

/* Materials */
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

const { demo, lesson, lessons, home, login, newuser } = AppRoutesEnum;
const { notAnyLesson, notDemoLesson, notHome, notLesson } = NavRulesEnum;
const { notCurrentLocation, onlyAuthorized, onlyUnauthorized, notActiveLanguage } = SubMenuRulesEnum;
const { pl, en } = LanguagesEnum;

import getTranslation from '../../shared/get.translation';
import { getActiveLanguage } from 'react-localize-redux';

/**
 * @param { boolean } render                  - is menu rendered?
 *                                              Changes only if props authorized or location.pathname do change
 *                                              Increases menu responsiveness
 * @param { JSX.Element[] | SubMenuItemType } - containes list of menuItems to be dispalayed.
 *                                              Is updated with delay because menu is transitioning (hiding) and
 *                                                during transtion menu should not be updating
 * */
interface InternalState {
    render: boolean;
    listItems: JSX.Element[] | SubMenuItemType
};

// TODO muszę kombinować bo za dużo umieściłam w jednym komponencie
// Podzielić cały komponent na dwa: menu z listą i menu przycisk
class SubMenuComponent extends React.Component<SubMenuProps, InternalState> {
    private _renderMethod: () => JSX.Element;
    private _listTimeout: number;
    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleClickAway = this.handleClickAway.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            render: this.areNavRulesMet,
            listItems: this.listItems
        }

        this._listTimeout = 1000;

        /**
         * Check if either menuItems or menuItem provided in props.
         * If both or neither menuItems nor menuIteme provided in props then throw an error.
         */
        if (this.manyItems) {
            this._renderMethod = this.renderList
        }
        else if (this.oneItem) {
            this._renderMethod = this.renderOneItem;
        }
        else {
            throw new Error('SubMenu received incorrect props.');
        }
    }

    get currentPathname () {
        return this.props.location.pathname;
    }

    get anchorEl () {
        return this.props[this.props.container].anchorEl;
    }

    componentDidUpdate(prevProps: SubMenuProps) {
        const { props: { location: { pathname }, authorized } } = this;
        const { location: { pathname: prevPathname }, authorized: prevAuthorized } = prevProps;

        /**
         *  Updates menu only if pathname or authorization changed, therefore
         *  menu ressponsiveness is increased.
         *
         *  Moreove: listItems are updated with delay, therefore
         *  menu items do not change when menu is transitioning
         */
        if (( pathname !== prevPathname || authorized !== prevAuthorized )) {
            // @ts-ignore
            this.setState(() => (
                { render: this.areNavRulesMet && this.atLeastOneItem }
                ), () => {
                    let timeout = setTimeout( () => {
                        this.setState({ listItems: this.listItems });
                        clearTimeout( timeout ); // GC
                        timeout = null; // GC
                    }, this._listTimeout );
                }
            );
        }
    }

    handleClick (event: React.MouseEvent<HTMLButtonElement>) {
        this.props.setNavAnchorEl(this.props.container, event.currentTarget);
    }

    handleClose (loc: string) {
        this.props.history.push(loc);
        if (this.props.container) {
            this.props.setNavAnchorEl(this.props.container);
        }
    };

    handleClickAway () {
        if (this.anchorEl) {
            this.props.setNavAnchorEl(this.props.container);
        }
    };

    // @ts-ignore
    get subMenuRules (): {[key: SubMenuRulesEnum]: (path?: AppRoutesEnum, lang?: LanguagesEnum) => boolean } {
        return {
            [onlyAuthorized]: () => this.props.authorized,
            [onlyUnauthorized]: () => !this.props.authorized,
            [notCurrentLocation]: (path: AppRoutesEnum) => path !== this.currentPathname,
            [notActiveLanguage]: (path: AppRoutesEnum, lang: LanguagesEnum) => lang!== getActiveLanguage(this.props.localize).code
        }
    };

    /** If function for rule is not implemented an error will be thrown */
    areSubMenuRulesMet (rules: SubMenuRulesEnum[], pathname: AppRoutesEnum, lang?: LanguagesEnum | ''): boolean {
        return (!rules || rules.every(rule => this.subMenuRules[rule](pathname, lang)));
    };

    // @ts-ignore
    get navRules (): {[key: NavRulesEnum]: () => boolean} {
        return {
            [notLesson]: () => !RegExp(`.*${lesson}.*`, 'g').test(this.currentPathname),
            [notDemoLesson]: () => this.currentPathname !== demo,
            [notAnyLesson]: () => !RegExp(`.*${lesson}.*`,'g').test(this.currentPathname) && this.currentPathname !== demo,
            [notHome]: () => this.currentPathname !== home
        };
    };

    /** If function for rule is not implemented an error will be thrown */
    get areNavRulesMet (): boolean {
        return (!this.props.rules || this.props.rules.every(rule => this.navRules[rule]()));
    };

    getLink (appRoute: AppRoutesEnum, title: string, className: string) {
        let ind = 0;

        return (
            <MenuItem
                onClick={() => this.handleClose(appRoute)}
                key={`link-${title}-${ind++}`}
                divider={true}
                {...{ className }}
            >
                <NavLink to={appRoute}>
                    { getTranslation(this.props.localize, title, title) }
                </NavLink>
            </MenuItem>
        );
    };

    getButton (onClick, title: string, className: string) {
        let ind = 0;
        return (
            <MenuItem
                {...{ onClick }}
                key={`button-${title}-${ind++}`}
                divider={true}
                {...{ className }}
            >
                { getTranslation(this.props.localize, title, title) }
            </MenuItem>
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

    get manyItems ()  {
        return ( this.props.menuItems && this.props.container && !this.props.menuItem );
    };

    get oneItem  () {
        return (this.props.menuItem && !this.props.container && !this.props.menuItems);
    }

    /**
     * @description Check if list contains at lest one item. Items are rendered only if their conditions are met
     *              It may happen that none item meets conditions. List should not be rendered.
     *              If menu is only a button ( has this.props.menuItem ) then rendered always
     *              // TODO wynika z przekombinowania opisanego powyżej
     */
    get atLeastOneItem () {
        return (
            this.props.menuItem ||
            (
                this.props.menuItems &&
                this.props.menuItems.some( item => this.areSubMenuRulesMet(item.rules, item.appRoute, item.lang || '' ))
            )
        );
    }

    get listItems () {
        const {
            classes: { menuItemClass },
        } = this.props;

        return (
            this.props.menuItem || this.props.menuItems.map((menuItem, ind) => {
                const { rules, appRoute, title, onClick, lang = '' } = menuItem;

                if ( this.areSubMenuRulesMet(rules, appRoute, lang )) {
                    return (
                        ( appRoute && this.getLink( appRoute, title, menuItemClass ) ) ||
                        ( onClick && this.getButton( onClick, title, menuItemClass ) )
                    );
                }
                return null;
            })
        );
    }

    renderList () {
        const {
            classes: { menuClass },
            title
        } = this.props;

        /** Render list only if at least one item meets the rules */
        return (
            <ClickAwayListener onClickAway={this.handleClickAway}>
                <>
                    {
                        (title && (
                            <Tooltip title={getTranslation(this.props.localize, title)}>
                                { this.getIconButton(this.handleClick) }
                            </Tooltip>
                        )) ||
                        this.getIconButton(this.handleClick)
                    }

                    {/** Could be redered only when anchorEl. It decreases menu's responsiveness */}
                    {<Menu
                        anchorEl={this.anchorEl}
                        open={Boolean(this.anchorEl)}
                        classes={{ paper : menuClass }}
                    >
                        { this.state.listItems }
                    </Menu>}
                </>
            </ClickAwayListener>
        );
    }

    renderOneItem() {
        const {
            menuItem: { rules, appRoute },
            title
        } = this.props;

        /** Render if not current pathname */
        if (this.areSubMenuRulesMet(rules, appRoute)) {
            return (
                (title && (
                    <Tooltip title={getTranslation(this.props.localize, title)}>
                        { this.getIconButton(() => this.handleClose(appRoute)) }
                    </Tooltip>
                )) ||
                this.getIconButton(() => this.handleClose(appRoute))
            );
        }

        return null;
    }

    get renderMethod () {
        return this._renderMethod;
    }

    render () {
        if (this.state.render) {
            return (
                <>
                    { this.renderMethod() }
                </>
            );
        }

        return null;
    }
}

export default withStyles(styles)(SubMenuComponent);