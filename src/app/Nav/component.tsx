import * as React from 'react';

import { NavProps } from './container';

import {
    HOME_HEADING_ANIMATED,
    HOME_WELCOME_TIMEOUT
} from './constants';

import { getTranslations, getActiveLanguage, getLanguages, withLocalize } from 'react-localize-redux';

/** Materials */
import AppBar from '@material-ui/core/AppBar';
import Dashboard from '@material-ui/icons/Dashboard';
import Face from '@material-ui/icons/Face';
import withStyles from '@material-ui/core/styles/withStyles';
import style from './styles';

import { MenuContainersEnum, MenuRulesEnum, AppRoutesEnum } from '@appTypes';
import { NavMenuProps, INavState } from './_duck/types';

import AppMenu from '@app/AppMenu';
import { DialogsEnum } from '@app/Dialog/';
import { MenuProvider } from '@app/MenuRulesHoc/index';
import MenuList from '@app/MenuList';
import MenuButton from '@app/MenuButton';
import Welcome from '@app/Welcome/';
import { withMedia, MediaEnum } from '@app/Media';

import LoginForm from '@forms/LoginForm';
import NewUserForm from '@forms/NewUserForm';
import RemindPasswordForm from '@forms/RemindPasswordForm';
import ChangePasswordForm from '@forms/ChangePasswordForm';

class NavComponent extends React.Component<NavProps, INavState> {
    notAnyLesson: MenuRulesEnum;
    notActiveLanguage: MenuRulesEnum;
    onlyAuthorized: MenuRulesEnum;
    onlyUnauthorized: MenuRulesEnum;
    notCurrentLocation: MenuRulesEnum;
    fastCodingAuthorization: MenuRulesEnum;

    login: AppRoutesEnum;
    newUser: AppRoutesEnum;
    changePassword: AppRoutesEnum;
    remindPassword: AppRoutesEnum;
    lessons: AppRoutesEnum;

    xs: MediaEnum;
    simple: DialogsEnum.simple;
    appBarColor: any;

    languagesMenu: MenuContainersEnum;
    userMenu: MenuContainersEnum;
    constructor( props ) {
        super( props );
        this.state = {
            media: this.props.media
        };

        this.userOnClick = this.userOnClick.bind( this );

        Object.assign( this, MenuRulesEnum );
        Object.assign( this, AppRoutesEnum );

        this.xs = MediaEnum.xs;
        this.simple = DialogsEnum.simple;
        this.appBarColor = 'primary';

        this.languagesMenu = MenuContainersEnum.languagesMenu;
        this.userMenu = MenuContainersEnum.userMenu;
    }

    componentDidUpdate( prevProps ) {
        const { props: { media }} = this;
        const { media: prevMedia } = prevProps;

        if ( media !== prevMedia ) {
            this.setState( { media } );
        }
    }

    get languageM(): NavMenuProps {
        const {
            props: {
                languages,
                setActiveLanguage,
                activeLanguage,
            },
            notActiveLanguage,
            languagesMenu
        } = this;

        return {
            component: <MenuList
                menuItems={ languages
                    .reduce( ( acc, cv ) => {
                        const { code } = cv;
                        acc.push( {
                            title: code,
                            rules: [ notActiveLanguage ],
                            lang: code,
                            onClick: () => {
                                setActiveLanguage( code );
                            } } );
                        return acc;
                    }, [] ) }
                icon={ <React.Fragment> { activeLanguage ? activeLanguage.code : '' } </React.Fragment> }
                container={ languagesMenu }
                title={ 'submenuChangeLanguage' }
            />
        };
    }

    get lessonsM(): NavMenuProps {
        const { notAnyLesson, notCurrentLocation, lessons } = this;

        return {
            component: <MenuButton
                appRoute={ lessons }
                rules={ [ notCurrentLocation, notAnyLesson ] }
                icon ={ <Dashboard /> }
                title={ 'submenuGoToCourses' }
            />
        };
    }

    userOnClick( Component: React.FunctionComponent | React.ComponentClass, appRoute: string ): void {
        const {
            props: { openDialog, history },
            state:{ media },
            xs, simple
        } = this;

        if ( media !== xs ) {
            openDialog( { variant: simple, Component } );
        } else {
            history.push( appRoute );
        }
    }

    get userM(): NavMenuProps {
        const {
            props: { classes: { navLogin }, logOut, login : loginClass, displayName },
            onlyAuthorized, onlyUnauthorized, fastCodingAuthorization,
            login,
            newUser,
            changePassword,
            remindPassword,
            userMenu
        } = this;

        return {
            component: <MenuList
                menuItems={ [
                    {
                        title: 'subMenuUserLogin',
                        onClick: () => this.userOnClick( LoginForm, login ),
                        rules: [ onlyUnauthorized ]
                    },
                    {
                        title: 'subMenuUserNewUser',
                        onClick: () => this.userOnClick( NewUserForm, newUser ),
                        rules: [ onlyUnauthorized ]
                    },
                    {
                        title: 'subMenuUserChangePassword',
                        onClick: () => this.userOnClick( ChangePasswordForm, changePassword ),
                        rules: [ onlyAuthorized, fastCodingAuthorization ]
                    },
                    {
                        title: 'subMenuRemindPassword',
                        onClick: () => this.userOnClick( RemindPasswordForm, remindPassword ),
                        rules: [ onlyUnauthorized ]
                    },
                    {
                        title: 'subMenuUserLogOut',
                        rules: [ onlyAuthorized ],
                        onClick: logOut
                    }
                ] }
                //@ts-ignore
                icon={ <span> <Face /> </span> }
                container={ userMenu }
                title={ 'submenuOpenUserMenu' }
                iconButton={{
                    className: navLogin,
                    login: displayName || loginClass // Displayed under Face icon
                }}
            />
        };
    }

    get isLesson() {
        return RegExp( /.*lessons\/lesson-.*/ ).test( this.props.location.pathname );
    }

    render() {
        const {
            props: {
                classes: { navClass, navLessonClass },
                media
            },
            isLesson, appBarColor, xs
        } = this;

        let { localize } = this.props;

        const heading = getTranslations( localize ).welcomeHeading[
            getLanguages( localize )
                .findIndex( lang => (
                    lang.code === getActiveLanguage( localize ).code )
                )
        ];

        localize = null; // GC

        return (
            <AppBar
                position={ media === xs ? 'absolute' : 'fixed' }
                color={ appBarColor }
                className={` ${ navClass } ${ isLesson ? navLessonClass : '' }` }
            >
                <MenuProvider>
                    <Welcome
                        { ... { heading } }
                        animated={ HOME_HEADING_ANIMATED}
                        timeout={ HOME_WELCOME_TIMEOUT }
                    />
                    <AppMenu subMenus={[ this.languageM, this.lessonsM, this.userM ]} />
                </MenuProvider>
            </AppBar>
        );
    }
}

export default withStyles( style )( withLocalize( withMedia( NavComponent ) ) );
