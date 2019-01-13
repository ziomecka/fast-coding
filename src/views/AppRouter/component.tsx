import * as React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import history from '@shared/history';

import HomeView from '@views/Home/';
import LessonsView from '@views/Lessons/';
import LessonView from '@views/Lesson/';
import PrivacyPolicy from '@views/PrivacyPolicy/';
import TermsOfService from '@views/TermsOfService/';

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

import { withMedia, MediaEnum, MediaProvider } from '@app/Media/';
import { LocationProvider } from '@app/LocationHoc';

interface IAppRouterState {
    routes: JSX.Element
}

class Root extends React.Component<AppRouterPropsI, IAppRouterState> {
    lessons: AppRoutesEnum;
    newUser: AppRoutesEnum;
    login: AppRoutesEnum;
    remindPassword: AppRoutesEnum;
    changePassword: AppRoutesEnum;
    termsOfService: AppRoutesEnum;
    privacyPolicy: AppRoutesEnum;

    xs: MediaEnum;
    constructor( props ) {
        super( props );

        Object.assign( this, AppRoutesEnum );

        this.state = {
            routes: this.routes
        };

        this.xs = MediaEnum.xs;
    }

    componentDidUpdate( prevProps ) {
        const { props: { media }, xs } = this;
        const { media: prevMedia } = prevProps;

        if ( media !== prevMedia && ( media === xs || prevMedia === xs ) ) {
            this.setState( { routes: this.routes } );
        }
    }

    get routes(): JSX.Element {
        if ( this.props.media === this.xs ){
            return this.mobile;
        }

        return this.desktop;
    }

    get common(): JSX.Element[] {
        const { lessons, privacyPolicy, termsOfService } = this;

        return [
            <Route path={`${ lessons }/:id`} component={ LessonView } key="lessonView" />,
            <Route exact path={`${ lessons }`} component={ LessonsView } key="lessonsView" />,
            <Route exact path={`${ privacyPolicy }`} component={ PrivacyPolicy } key="privacyPolicyView" />,
            <Route exact path={`${ termsOfService }`} component={ TermsOfService } key="termsOfServiceView" />,
            <Redirect from='/.+' to='/' key="redirectToHome" />
        ];
    }

    get onlyMobile(): JSX.Element[] {
        const { newUser, login, changePassword, remindPassword } = this;

        return [
            <Route exact path={`${ newUser }`} component={ NewUserView } key="newUserView" />,
            <Route exact path={`${ login }`} component={ LoginView } key="loginView" />,
            <Route exact path={`${ remindPassword }`} component={ RemindPasswordView } key="remindPasswordView" />,
            <Route exact path={`${ changePassword }`} component={ ChangePasswordView } key="changePasswordView" />,
        ];
    }

    get mobile(): JSX.Element {
        return <Switch>{ [ ...this.onlyMobile, ...this.common ] }</Switch>;
    }

    get desktop(): JSX.Element {
        return <Switch>{ [ ...this.onlyMobile, ...this.common ] }</Switch>;
    }

    render() {
        return (
            <MuiThemeProvider {...{ theme }}>
                <LocalizeProvider {...{ store }} >
                    <MediaProvider>
                        <Router {...{ history }}>
                            <LocationProvider>
                                <Route path="/">
                                    <HomeView>
                                        { this.state.routes }
                                    </HomeView>
                                </Route>
                            </LocationProvider>
                        </Router>
                    </MediaProvider>
                </LocalizeProvider>
            </MuiThemeProvider>
        );
    }
}

export default withMedia( Root );
