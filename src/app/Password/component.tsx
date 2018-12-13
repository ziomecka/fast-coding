
import * as React from 'react';

import TextField from '@material-ui/core/TextField';

import { PasswordProps } from './container';

import { helperTexts, invalidError } from '../../shared/rules';

import getTranslation from '../../shared/get.translation';

const { noSpaces, notLong, noDigit, noSpecials } = invalidError;

const PasswordComponent: React.StatelessComponent<PasswordProps> = props => {
  const {
      setPassword,
      container,
      passwordType,
      [container]: {
          [passwordType]: { password, passwordValid }
      },
      tabIndex,
      localize,
      validatePassword,
      rules = [ notLong, noSpaces, noDigit, noSpecials ],
      value2
    } = props;

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let answer = await setPassword(passwordType, container, e);

        if ( answer && rules && rules.length ) {
            validatePassword(answer.password, passwordType, container, rules, value2);
            answer = null; // GC
        }
    };

    return (
    <TextField
        inputProps={{ tabIndex }}
        label={getTranslation(localize, `${passwordType}_Label`)}
        placeholder={getTranslation(localize, `${passwordType}_Placeholder`)}
        required
        type="password"
        value={password}
        error={!!passwordValid}
        onChange={onChange}
        helperText={!!passwordValid
            ? helperTexts(passwordValid, 'password', localize)
            : null
        }
    />
  );
};

export default PasswordComponent;