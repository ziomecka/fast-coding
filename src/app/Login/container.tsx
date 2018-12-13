import { connect } from 'react-redux';
import { StandardTextFieldProps } from '@material-ui/core/TextField';
import { default as Login } from './component';
import { ApplicationState } from '../../store';
import { AppState } from '../_reducers/';

import { AppContainers } from '../_common';
import { ApplicationContainers } from '../../_common';

const { app } = ApplicationContainers;

const mapStateToProps = (state: ApplicationState): AppState => ({
    ...state[app]
});

const LoginContainer = connect(mapStateToProps)(Login);

export default LoginContainer;

export interface LoginPropsI extends StandardTextFieldProps {
    container: AppContainers;
};