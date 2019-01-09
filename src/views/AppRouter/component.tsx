import * as React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from '@shared/history';

import HomeView from '../Home/';
import LessonsView from '../Lessons/';
import LessonView from '../Lesson/';
import PrivacyPolicy from '@views/PrivacyPolicy/';
import TermsOfService from '@views/TermsOfService/';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../theme/';

import { AppRoutesEnum } from '@appTypes';

import { LocalizeProvider } from 'react-localize-redux';
import store from '../../store';

import { AppRouterPropsI } from './container';

const Root: React.StatelessComponent<AppRouterPropsI> = () => {
    const { lessons, termsOfService, privacyPolicy } = AppRoutesEnum;

    return (
        <MuiThemeProvider {...{ theme }}>
            <LocalizeProvider {...{ store }} >
                <Router {...{ history }}>
                    <Route path="/">
                        <HomeView>
                            <Switch>
                                <Route path={`${ lessons }/:id`} component={ LessonView } />
                                <Route exact path={`${ lessons }`} component={ LessonsView } />,
                                <Route exact path={`${ privacyPolicy }`} component={ PrivacyPolicy } />,
                                <Route exact path={`${ termsOfService }`} component={ TermsOfService } />,
                            </Switch>
                        </HomeView>
                    </Route>
                </Router>
            </LocalizeProvider>
        </MuiThemeProvider>
    );
};

export default Root;
