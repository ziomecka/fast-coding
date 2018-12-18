import { connect } from 'react-redux';
import { StandardTextFieldProps } from '@material-ui/core/TextField';
import { default as Login } from './component';
import { ApplicationState } from '../../store';
import { AppState } from '../_reducers/';

import { AppContainers } from '@appTypes';
import { ApplicationContainers } from '@applicationTypes';

import { LocalizeState } from 'react-localize-redux';

const { app } = ApplicationContainers;

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
    container: AppContainers;
};