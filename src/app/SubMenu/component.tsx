import * as React from 'react';

import { NavLink } from 'react-router-dom';

import { SubMenuProps } from './container';
import { AppRoutes, SubMenuRulesEnum, NavRulesEnum, MenuContainers, LanguagesEnum } from '../../_common/';

/* Materials */
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

const { demo, lesson, lessons, home, login, newuser } = AppRoutes;
const { notAnyLesson, notDemoLesson, notHome, notLesson } = NavRulesEnum;
const { notCurrentLocation, onlyAuthorized, onlyUnauthorized, notActiveLanguage } = SubMenuRulesEnum;
const { pl, en } = LanguagesEnum;

import { getActiveLanguage } from 'react-localize-redux';

/** Iternal state needed because otherwise React does not see change of state */
interface InternalState {
    render: boolean;
};

class SubMenuComponent extends React.Component<SubMenuProps, InternalState> {
    private _renderMethod: () => JSX.Element;
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickAway = this.handleClickAway.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            render: this.areNavRulesMet
        }

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
        let achorEl = this.props[this.props.container].anchorEl;
        return this.props[this.props.container].anchorEl;
    }

    componentDidUpdate(prevProps: SubMenuProps) {
        const { pathname } = this.props.location;
        const prevPathname = prevProps.location.pathname;

        if (pathname !== prevPathname) {
            this.setState({
                render: this.areNavRulesMet
            });
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
    get subMenuRules (): {[key: SubMenuRulesEnum]: (path?: AppRoutes, lang?: LanguagesEnum) => boolean } {
        return {
            [onlyAuthorized]: () => this.props.authorized,
            [onlyUnauthorized]: () => !this.props.authorized,
            [notCurrentLocation]: (path: AppRoutes) => path !== this.currentPathname,
            [notActiveLanguage]: (path: AppRoutes, lang: LanguagesEnum) => lang!== getActiveLanguage(this.props.localize).code
        }
    };

    /** If function for rule is not implemented an error will be thrown */
    areSubMenuRulesMet (rules: SubMenuRulesEnum[], pathname: AppRoutes, lang?: LanguagesEnum | ''): boolean {
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

    getLink (appRoute: AppRoutes, title: string, className: string) {
        let ind = 0;

        return (
            <MenuItem
                onClick={() => this.handleClose(appRoute)}
                key={`link-${title}-${ind++}`}
                divider={true}
                {...{ className }}
            >
                <NavLink to={appRoute}>
                    {title}
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
                {title}
            </MenuItem>
        );
    };

    get manyItems ()  {
        return ( this.props.menuItems && this.props.container && !this.props.menuItem )
    };

    get oneItem  () {
        return (this.props.menuItem && !this.props.container && !this.props.menuItems);
    }

    renderList () {
        const {
            iconButton = {},
            classes: { menuItemClass, menuIconClass, menuClass }
        } = this.props;

        return (
            <ClickAwayListener onClickAway={this.handleClickAway}>
                <>
                    <IconButton
                        onClick={this.handleClick}
                        className={menuIconClass}
                        {...iconButton}
                    >
                        {this.props.icon}
                    </IconButton>

                    {/** Could be redered only when anchorEl. It decreases menu's responsiveness */}
                    {<Menu
                        anchorEl={this.anchorEl}
                        open={Boolean(this.anchorEl)}
                        classes={{ paper : menuClass }}
                    >
                        {this.props.menuItems.map((menuItem, ind) => {
                            const { rules, appRoute, title, onClick, lang = '' } = menuItem;
                            if (this.areSubMenuRulesMet(rules, appRoute, lang)) {
                                return (
                                    (appRoute && this.getLink(appRoute, title, menuItemClass)) ||
                                    (onClick && this.getButton(onClick, title, menuItemClass))
                                );
                            }

                            return null;
                        })}
                    </Menu>}
                </>
            </ClickAwayListener>
        );
    }

    renderOneItem() {
        const {
            iconButton = {},
            classes: { menuIconClass },
            menuItem: { rules, appRoute },
            icon // TODO GC?
        } = this.props;

        /** Render if not current pathname */
        if (this.areSubMenuRulesMet(rules, appRoute)) {
            return (
                <IconButton
                    onClick={() => this.handleClose(appRoute)}
                    className={ menuIconClass }
                    { ...iconButton }
                >
                    { icon }
                </IconButton>
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