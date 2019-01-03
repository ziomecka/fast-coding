import * as React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import history from '@shared/history';

import HomeView from '../Home/';
import LessonsView from '../Lessons/';
import LessonView from '../Lesson/';
import LoginView from '../Login/';
import NewUserView from '../Newuser/';
import ChangePasswordView from '../ChangePassword/';
import NewPasswordView from '../NewPassword/';
import RemindPasswordView from '../RemindPassword/';

import RouteAuth from '../RouteAuth/';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../theme/';

import { AppRoutesEnum } from '@appTypes';

import { LocalizeProvider } from 'react-localize-redux';
import store from '../../store';

import { AppRouterPropsI } from './container';

import Media from 'react-media';

import { MEDIA_DESKTOP_MD, MEDIA_DESKTOP_LG } from '@constantsStyles';

const Root: React.StatelessComponent<AppRouterPropsI> = props => {
    const { lessons, login, newuser, changePassword, newPassword, remindPassword } = AppRoutesEnum;
    const { authorized } = props;

    const desktop = (
        <Switch>
            <Route path={`${lessons}/:id`} component={ LessonView } />
            <Route exact path={`${lessons}`} component={LessonsView} key='lessons'/>,
            <Route path={`${login}`} component={LoginView} key='login' />,
            <Route path={`${newuser}`} component={NewUserView} key='newuser' />,
            <RouteAuth path={`${ changePassword }`} component={ ChangePasswordView } condition={ authorized } key='changePassword' />,
            <RouteAuth path={`${ remindPassword }`} component={ RemindPasswordView } condition={ !authorized } key='remindPassword' />,
            <Route path={`${ newPassword }`} component={ NewPasswordView } key='newPassword' />
        </Switch>
    );

    const smallerThanDesktop = (
        <Switch>
            <Route exact path="/" />
            <Route path="/">
                <Redirect to='/' />
            </Route>
        </Switch>
    );

    return (
        <MuiThemeProvider {...{ theme }}>
            <LocalizeProvider {...{ store }} >
                <Router {...{ history }}>
                    <Route path="/">
                        <HomeView>
                            <Media query={`(min-width: ${ MEDIA_DESKTOP_MD }px)`}>{ matches =>
                                matches
                                    ?
                                        <>{ desktop }</>
                                    :
                                        <>{ smallerThanDesktop }</>
                            }</Media>
                        </HomeView>
                    </Route>
                </Router>
            </LocalizeProvider>
        </MuiThemeProvider>
    );
};

export default Root;
