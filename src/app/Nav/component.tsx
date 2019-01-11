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
import { NavMenuProps } from './_duck/types';

import AppMenu from '@app/AppMenu';
import { DialogsEnum } from '@app/Dialog/';
import { MenuProvider } from '@app/MenuRulesHoc/index';
import MenuList from '@app/MenuList';
import MenuButton from '@app/MenuButton';
import Welcome from '@app/Welcome/';

import LoginForm from '@forms/LoginForm';
import NewUserForm from '@forms/NewUserForm';
import RemindPasswordForm from '@forms/RemindPasswordForm';
import ChangePasswordForm from '@forms/ChangePasswordForm';

const { languagesMenu, userMenu } = MenuContainersEnum;
const appBarColor = 'primary';
const { simple } = DialogsEnum;
const { lessons } = AppRoutesEnum;
const { onlyUnauthorized, notCurrentLocation, fastCodingAuthorization } = MenuRulesEnum;

const NavComponent: React.StatelessComponent<NavProps> = props => {
    const { notAnyLesson, notActiveLanguage, onlyAuthorized } = MenuRulesEnum;
    const {
        languages,
        setActiveLanguage,
        activeLanguage,
        classes: { navClass, navLessonClass, navLogin },
        logOut,
        login,
        displayName,
        openDialog
    } = props;

    const languageM: NavMenuProps = {
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
            icon={ <>''{ activeLanguage ? activeLanguage.code : '' }''</> }
            container={ languagesMenu }
            title={ 'submenuChangeLanguage' }
    />
    };

    const lessonsM: NavMenuProps = {
        component: <MenuButton
            appRoute={ lessons }
            rules={ [ notCurrentLocation, notAnyLesson ] }
            icon ={ <Dashboard /> }
            title={ 'submenuGoToCourses' }
        />
    };

    const userM: NavMenuProps = {
        component: <MenuList
            menuItems={ [
                {
                    title: 'subMenuUserLogin',
                    onClick: () => openDialog( {
                        variant: simple,
                        Component: LoginForm
                    } ),
                    rules: [ onlyUnauthorized ]
                },
                {
                    title: 'subMenuUserNewUser',
                    onClick: () => openDialog( {
                        variant: simple,
                        Component: NewUserForm
                    } ),
                    rules: [ onlyUnauthorized ]
                },
                {
                    title: 'subMenuUserChangePassword',
                    onClick: () => openDialog( {
                        variant: simple,
                        Component: ChangePasswordForm
                    } ),
                    rules: [ onlyAuthorized, fastCodingAuthorization ]
                },
                {
                    title: 'subMenuRemindPassword',
                    onClick: () => openDialog( {
                        variant: simple,
                        Component: RemindPasswordForm
                    } ),
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
                login: displayName || login // Displayed under Face icon
            }}
        />
    };

    const isLesson = () => RegExp( /.*lessons\/lesson-.*/ ).test( props.location.pathname );

    return (
        <AppBar color={appBarColor} className={`${navClass} ${isLesson() ? navLessonClass : ''}`}>
            <MenuProvider>
                <Welcome
                    heading={
                        getTranslations( props.localize ).welcomeHeading[
                            getLanguages( props.localize )
                            .findIndex( lang => (
                                lang.code === getActiveLanguage( props.localize ).code )
                            )
                        ]
                    }
                    animated={HOME_HEADING_ANIMATED}
                    timeout={HOME_WELCOME_TIMEOUT}
                />
                    <AppMenu subMenus={[ languageM, lessonsM, userM ]} />
            </MenuProvider>
        </AppBar>
    );
};

export default withStyles( style )( withLocalize( NavComponent ) );
