import * as React from 'react';

import { LoginFormPropsI } from './container';
import { AppContainersEnum, PasswordsEnum } from '@appTypes';

const { loginForm } = AppContainersEnum;

import Password from '../Password/';
import Login from '../Login/';
import Message from '../FormHelperText/';
import GoogleLogin from '../GoogleLogin/';
import RemindPasswordForm from '@app/RemindPasswordForm';
import { DialogsEnum } from '@app/Dialog';
const { simple } = DialogsEnum;

/* Materials */
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

import { Translate } from 'react-localize-redux';
const { pass } = PasswordsEnum;

import withStyles from '@material-ui/core/styles/withStyles';
import styles from '@appForm/styles';

class LoginFormComponent extends React.Component<LoginFormPropsI> {
    container: AppContainersEnum;
    constructor (props) {
        super(props);
        this.container = loginForm;
        this.loginOnChange = this.loginOnChange.bind(this);
        this.submit = this.submit.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    loginOnChange (e: React.ChangeEvent<HTMLInputElement>) {
        this.props.setLogin(e.target.value)
    }

    submit () {
        const { login, loginValid, [pass]: { password, passwordValid } } = this.props;

        if ( !login || !password || !!loginValid || !!passwordValid ) {
            this.props.formInvalid();
        } else {
            this.props.log({ login, password });
        }
    }

    redirect () {
        this.props.openDialog({
            Component: RemindPasswordForm,
            variant: simple
        });
    }

    render() {
        const { container, props: {
            login,
            classes: { FCForm, FCFormButton }
         } } = this;

        return (
          <Paper>
              <form onSubmit={ e => e.preventDefault() } className= { FCForm } >
                <FormControl tabIndex={1}>
                    <Login onChange={ this.loginOnChange } value={ login } tabIndex={1} {...{ container }}/>
                    <Password {...{ container, passwordType: pass }} tabIndex={2} rules={[]}/>
                    <Button
                        onClick={this.submit}
                        type="submit"
                        tabIndex={3}
                        variant="contained"
                        color="primary"
                    >
                        <Translate id="signInWithFastCoding" />
                    </Button>

                    <Message />

                    <Typography variant="body1">
                        <Button
                            onClick={ this.redirect }
                            type="submit"
                            tabIndex={3}
                            variant="text"
                            color="primary"
                            className= { FCFormButton }
                        >
                            <Translate id="loginDoNotRememberButton" />
                        </Button>
                    </Typography>

                    <GoogleLogin />

                </FormControl>
              </form>
          </Paper>
        );
    }
};

export default withStyles(styles)(LoginFormComponent);