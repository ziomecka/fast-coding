import * as React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from '../shared/history';

import HomeView from './home/';
import LessonsView from './lessons/';
import LessonView from './lesson/';
import AboutView from './about/';
import LoginView from './login/';
import NewUserView from './newuser/';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../theme/';

import { AppRoutes } from '../_common/';

const Root: React.StatelessComponent<{}> = () => {
    const { lessons, about, login, newuser } = AppRoutes;

    return (
        <MuiThemeProvider {...{ theme }}>
        <Router {...{ history }}>
            <Route path="/">
            <HomeView>
                <Switch>
                <Route exact path={`${lessons}`} component={LessonsView} />
                <Route path={`${lessons}/:id`} component={LessonView} />
                <Route path={`${about}`} component={AboutView} />
                <Route path={`${login}`} component={LoginView} />
                <Route path={`${newuser}`} component={NewUserView} />
                </Switch>
            </HomeView>
            </Route>
        </Router>
        </MuiThemeProvider>
    );
};

export default Root;
