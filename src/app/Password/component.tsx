
import * as React from 'react';

import TextField from '@material-ui/core/TextField';

import { PasswordProps } from './container';

import { helperTexts, RulesErrorEnum } from '@shared/rules';

import getTranslation from '@shared/get.translation';

const { NO_SPACES, NO_SPECIALS, NOT_LONG, NO_DIGIT } = RulesErrorEnum;

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
      rules = [ NOT_LONG, NO_SPACES, NO_DIGIT, NO_SPECIALS ],
      value2
    } = props;

    const onChange = async ( e: React.ChangeEvent<HTMLInputElement> ) => {
        let answer = await setPassword( passwordType, container, e );

        if ( answer && rules && rules.length ) {
            validatePassword( answer.password, passwordType, container, rules, value2 );
            answer = null; // GC
        }
    };

    return (
    <TextField
        inputProps={{ tabIndex }}
        label={getTranslation( localize, `${passwordType}_Label` )}
        placeholder={getTranslation( localize, `${passwordType}_Placeholder` )}
        required
        type="password"
        value={password}
        error={!!passwordValid}
        onChange={onChange}
        helperText={!!passwordValid
            ? helperTexts( passwordValid, 'password', localize )
            : null
        }
    />
  );
};

export default PasswordComponent;
