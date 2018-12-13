import * as React from 'react';

import { LoginPropsI } from './container';

import { helperTexts } from '../../shared/rules';

/** Materials */
import TextField from '@material-ui/core/TextField';

  const { container, setLogin } = props;
  const { login, loginValid } = Object(props[container]);
const LoginComponent: React.StatelessComponent<LoginPropsI> = props => {

  return (
      <TextField
        label="Login"
        required
        value={login}
        onChange={setLogin.bind(this, container)}
        error={loginValid !== undefined}
        helperText={loginValid !== undefined
          ? helperTexts[loginValid]
            ? helperTexts[loginValid]('login')
            : null
          : null
        }
        autoFocus
      />
  );
};

export default LoginComponent;