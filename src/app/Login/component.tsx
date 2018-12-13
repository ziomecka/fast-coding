import * as React from 'react';

import { LoginPropsI } from './container';

import { helperTexts } from '../../shared/rules';

/** Materials */
import TextField from '@material-ui/core/TextField';

const LoginComponent: React.StatelessComponent<LoginPropsI> = props => {
    const { container } = props;

    const {
        onChange,
        [container]: { login, loginValid }
    } = props;

  return (
      <TextField
        label="Login"
        required
        {...{ onChange }}
        value={ login }
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