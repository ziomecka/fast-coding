import * as React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from '../../shared/history';

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
import { KEY_PARAM, KEY_PARAM_MIN_LENGTH } from './constants';

const Root: React.StatelessComponent<AppRouterPropsI> = props => {
    const { lessons, login, newuser, changePassword, newPassword, remindPassword } = AppRoutesEnum;
    const { authorized } = props;

    const expectedKeyLength = KEY_PARAM.length + KEY_PARAM_MIN_LENGTH;
    const { location: { href: pathname }} = window;

    // TODO może być lepsza walidacja, wręcz do kluczy otrzymanych z serwera
    // TODO to nie jest najlepsze miejsce do takiego sprawdzenia
    const isKey = (
        pathname.indexOf(KEY_PARAM) !== -1 &&
        pathname.slice(pathname.indexOf(KEY_PARAM)).length >= expectedKeyLength
    );

    return (
        <MuiThemeProvider {...{ theme }}>
            <LocalizeProvider {...{ store }} >
                <Router {...{ history }}>
                    <Route path="/">
                    <HomeView>
                            <Switch>
                                <Route exact path={`${lessons}`} component={LessonsView} />
                                <Route path={`${lessons}/:id`} component={LessonView} />
                                <Route path={`${login}`} component={LoginView} />
                                <Route path={`${newuser}`} component={NewUserView} />
                                <RouteAuth path={`${ changePassword }`} component={ ChangePasswordView } condition={ authorized } />
                                <RouteAuth path={`${ remindPassword }`} component={ RemindPasswordView } condition={ !authorized } />
                                <RouteAuth path={`${ newPassword }/:key`} component={ NewPasswordView } condition={ isKey } />
                            </Switch>
                    </HomeView>
                    </Route>
                </Router>
            </LocalizeProvider>
        </MuiThemeProvider>
    );
};

export default Root;
