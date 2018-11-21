import * as React from 'react';

import { LoginFormProps } from './container';
import { AppContainers, PasswordTypes } from '../_common';

const { loginForm } = AppContainers;

import Password from '../Password/';
import Login from '../Login/';

/* Materials */
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const { newPass } = PasswordTypes;

const LoginFormComponent: React.StatelessComponent<LoginFormProps> = props => {
  const container = loginForm;

  return (
    <Paper>
      <form className="form-vertical">
        <Login {...{ container }}/>
        <Password {...{ container, passwordType: newPass }} />
        <Button
          onClick={props.onLoginForm}
        >
          Send
        </Button>
      </form>
    </Paper>
  );
};

export default LoginFormComponent;