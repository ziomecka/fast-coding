import * as React from 'react';

import { NewUserFormProps } from './container';

import Password from '../Password/';
import Login from '../Login/';

import { AppContainers } from '../_common/';
const { newUserForm } = AppContainers;

/** Materials */
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { PasswordTypes } from '../_common/';
const { newPass, confirmPass } = PasswordTypes;

const NewUserFormComponent: React.StatelessComponent<NewUserFormProps> = props => {
  const container = newUserForm;

  return (
    <Paper>
      <form className="form-vertical">
        <Login {...{ container }} />
        <Password {...{ container, passwordType: newPass }}/>
        <Password {...{ container, passwordType: confirmPass }}/>
        <Button
          onClick={props.onSendNewUserForm}
        >
          Send
        </Button>
      </form>
    </Paper>
  );
};

export default NewUserFormComponent;