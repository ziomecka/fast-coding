import * as React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import history from '@shared/history';

import HomeView from '@views/Home/';
import LessonsView from '@views/Lessons/';
import LessonView from '@views/Lesson/';
import PrivacyPolicy from '@views/PrivacyPolicy/';
import TermsOfService from '@views/TermsOfService/';

import NewPasswordView from '@views/NewPassword/';
import NewUserView from '@views/NewUser/';
import RemindPasswordView from '@views/RemindPassword';
import ChangePasswordView from '@views/ChangePassword';
import LoginView from '@views/Login';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '@theme';

import { AppRoutesEnum } from '@appTypes';

import { LocalizeProvider } from 'react-localize-redux';
import store from '@appStore';

import { AppRouterPropsI } from './container';

import { withMedia, MediaEnum } from '@app/Media/';
const { xs } = MediaEnum;

const Root: React.StatelessComponent<AppRouterPropsI> = props => {
    const { media } = props;
    const {
        lessons,
        termsOfService,
        privacyPolicy,
        newPassword,
        newUser,
        login,
        remindPassword,
        changePassword
    } = AppRoutesEnum;

    const common = [
        <Route path={`${ lessons }/:id`} component={ LessonView } key="lessonView" />,
        <Route exact path={`${ lessons }`} component={ LessonsView } key="lessonsView" />,
        <Route exact path={`${ privacyPolicy }`} component={ PrivacyPolicy } key="privacyPolicyView" />,
        <Route exact path={`${ termsOfService }`} component={ TermsOfService } key="termsOfServiceView" />,
        <Redirect from='/.+' to='/' key="redirectToHome" />
    ];

    const onlyMobile = [
        <Route exact path={`${ newPassword }`} component={ NewPasswordView } key="newPasswordView" />,
        <Route exact path={`${ newUser }`} component={ NewUserView } key="newUserView" />,
        <Route exact path={`${ login }`} component={ LoginView } key="loginView" />,
        <Route exact path={`${ remindPassword }`} component={ RemindPasswordView } key="remindPasswordView" />,
        <Route exact path={`${ changePassword }`} component={ ChangePasswordView } key="changePasswordView" />,
    ];

    const mobile = (
        <Switch>{ [ ...onlyMobile, ...common ] }</Switch>
    );

    const desktop = (
        <Switch>{ common }</Switch>
    );

    return (
        <MuiThemeProvider {...{ theme }}>
            <LocalizeProvider {...{ store }} >
                <Router {...{ history }}>
                    <Route path="/">
                        <HomeView>
                            { media === xs
                                ? mobile
                                : desktop
                            }
                        </HomeView>
                    </Route>
                </Router>
            </LocalizeProvider>
        </MuiThemeProvider>
    );
};

export default withMedia( Root );
