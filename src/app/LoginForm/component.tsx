import * as React from 'react';

import { LoginFormPropsI } from './container';
import { AppContainers, PasswordTypes } from '../_common';

const { loginForm } = AppContainers;

import Password from '../Password/';
import Login from '../Login/';
import Message from '../FormHelperText/';

/* Materials */
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import { Translate } from 'react-localize-redux';
const { newPass } = PasswordTypes;

class LoginFormComponent extends React.Component<LoginFormPropsI> {
    container: AppContainers;
    constructor (props) {
        super(props);
        this.container = loginForm;
        this.loginOnChange = this.loginOnChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    loginOnChange (e: React.ChangeEvent<HTMLInputElement>) {
        this.props.setLogin(e.target.value)
    }

    submit () {
        const { login, [newPass]: { password } } = this.props;
        this.props.log(login, password);
    }

    render() {
        const { container, props: { login } } = this;

        return (
          <Paper>
              <form onSubmit={ e => e.preventDefault() }>
                <FormControl tabIndex={1}>
                    <Login onChange={ this.loginOnChange } value={ login } tabIndex={1} {...{ container }}/>
                    <Password {...{ container, passwordType: newPass }} tabIndex={2} />
                    <Button
                        onClick={this.submit}
                        type="submit"
                        tabIndex={3}
                    >
                        <Translate id="submitForm" />
                    </Button>

                    <FormHelperText>
                        <Message />
                    </FormHelperText>

                </FormControl>
              </form>
          </Paper>
        );
    }
};

export default LoginFormComponent;