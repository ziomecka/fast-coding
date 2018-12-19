import * as React from 'react';

import { LoginPropsI } from './container';

import { helperTexts } from '@shared/rules';

import getTranslation from '@shared/get.translation';

/** Materials */
import TextField from '@material-ui/core/TextField';

const LoginComponent: React.StatelessComponent<LoginPropsI> = props => {
    const { container } = props;

    const {
        onChange,
        tabIndex,
        autoFocus = true,
        [container]: { login, loginValid },
        localize
    } = props;

  return (
      <TextField
        label={getTranslation(props.localize, 'loginLabel')}
        placeholder={getTranslation(props.localize, 'loginPlaceholder')}
        required
        {...{ onChange, autoFocus }}
        value={ login }
        inputProps={{ tabIndex }}
        error={ !!loginValid }
        helperText={ !!loginValid
          ? helperTexts(loginValid, 'login', localize)
          : null
        }
      />
  );
};

export default LoginComponent;