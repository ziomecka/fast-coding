import { connect } from 'react-redux';
import { StandardTextFieldProps } from '@material-ui/core/TextField';
import { default as Login } from './component';
import { ApplicationState } from '../../store';
import { AppState } from '../_reducers/';

import { AppContainers } from '../_common';
import { ApplicationContainers } from '../../_common';

import { LocalizeState } from 'react-localize-redux';

const { app } = ApplicationContainers;

const mapStateToProps = (state: ApplicationState): AppState => ({
    ...state[app],
    localize: state.localize
});

const LoginContainer = connect(mapStateToProps)(Login);

export default LoginContainer;

interface MapStateTopPropsI extends AppState {
    localize: LocalizeState
}

export interface LoginPropsI extends StandardTextFieldProps, MapStateTopPropsI {
    container: AppContainers;
};