import * as React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from '../shared/history';

import HomeView from './home/';
import LessonsView from './lessons/';
import LessonView from './lesson/';
import LoginView from './login/';
import NewUserView from './newuser/';
import ChangePasswordView from './changePassword/';
import RouteAuth from './RouteAuth/';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../theme/';

import { AppRoutes } from '../_common/';

import { LocalizeProvider } from 'react-localize-redux';
import store from '../store';

const Root: React.StatelessComponent<{}> = () => {
    const { lessons, login, newuser, changePassword } = AppRoutes;

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
                                <RouteAuth path={`${ changePassword }`} component={ ChangePasswordView } />
                            </Switch>
                    </HomeView>
                    </Route>
                </Router>
            </LocalizeProvider>
        </MuiThemeProvider>
    );
};

export default Root;
