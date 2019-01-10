import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { default as GoogleLogin } from './component';
import { ApplicationState } from '@appStore';

import { GoogleLoginState } from './_duck/reducers';
import { onAuthorizeFirebase, onStartFirebaseUI, onSetTranslations } from './_duck/operations';

import { ApplicationContainersEnum } from '@applicationTypes';
import { AppContainersEnum } from '@appTypes';

import { LocalizeState } from 'react-localize-redux';
import { WithStyles } from '@material-ui/core/styles/withStyles';

const { app } = ApplicationContainersEnum;
const { googleLogin } = AppContainersEnum;

const mapStateToProps = (state: ApplicationState): MapStateToPropsI => ({
    ...state[app][googleLogin],
    localize: state.localize
});

const mapDispatchToProps = (dispatch: Dispatch): GoogleLoginDispatch => ({
    authorizeFirebase: () => dispatch(onAuthorizeFirebase()),
    startFirebaseUI: () => dispatch(onStartFirebaseUI()),
    setTranslations: () => dispatch(onSetTranslations())
});

const GoogleLoginContainer = connect(mapStateToProps, mapDispatchToProps)(GoogleLogin);

export default GoogleLoginContainer;

interface MapStateToPropsI extends GoogleLoginState {
    localize: LocalizeState
}

export interface GoogleLoginDispatch {
    authorizeFirebase: () => Promise<any>;
    startFirebaseUI: () => Promise<any>;
    setTranslations: () => void;
}

export interface GoogleLoginProps extends
    GoogleLoginDispatch,
    MapStateToPropsI,
    WithStyles {}