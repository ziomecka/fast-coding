import { connect } from 'react-redux';
import { StandardTextFieldProps } from '@material-ui/core/TextField';
import { default as Login } from './component';
import { ApplicationState } from '@appStore';
import { AppState } from '@app/_reducers/';

import { AppContainersEnum } from '@appTypes';
import { ApplicationContainersEnum } from '@applicationTypes';

import { LocalizeState } from 'react-localize-redux';

const { app } = ApplicationContainersEnum;

const mapStateToProps = (state: ApplicationState): MapStateToPropsI => ({
    ...state[app],
    localize: state.localize
});

const LoginContainer = connect(mapStateToProps)(Login);

export default LoginContainer;

interface MapStateToPropsI extends AppState {
    localize: LocalizeState
}

export interface LoginPropsI extends StandardTextFieldProps, MapStateToPropsI {
    container: AppContainersEnum;
};