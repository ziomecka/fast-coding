
import * as React from 'react';

import TextField from '@material-ui/core/TextField';

import { PasswordProps } from './container';

import { helperTexts } from '../../shared/rules';

const PasswordComponent: React.StatelessComponent<PasswordProps> = props => {
  const { setPassword, container, passwordType } = props;

  const { password, passwordValid } = Object(props[container])[passwordType] || Object(props[container]);

  return (
    <TextField
      label="Password"
      required
      type="password"
      value={password}
      error={passwordValid !== undefined}
      onChange={setPassword.bind(this, passwordType, container)}
      helperText={passwordValid !== undefined
        ? helperTexts[passwordValid]
          ? helperTexts[passwordValid]('password')
          : null
        : null
      }
    />
  );
};

export default PasswordComponent;