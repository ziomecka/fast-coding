import * as React from 'react';

import { NewUserFormProps } from './container';

import Password from '../Password/';
import Login from '../Login/';
import Email from '../Email/';
import Message from '../FormHelperText/';

import { AppContainers } from '../_common/';
const { newUserForm } = AppContainers;

import { Translate } from 'react-localize-redux';

/** Materials */
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import { PasswordTypes } from '../_common/';
const { newPass, confirmPass } = PasswordTypes;

class NewUserFormComponent extends React.Component<NewUserFormProps> {
    container: AppContainers;
    constructor(props) {
        super(props);

        this.container = newUserForm;

        this.emailOnChange = this.emailOnChange.bind(this);
        this.loginOnChange = this.loginOnChange.bind(this);
        this.sendNewUserForm = this.sendNewUserForm.bind(this);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    emailOnChange (e: React.ChangeEvent<HTMLInputElement>) {
        this.props.setEmail(e.target.value);
    }

    loginOnChange (e: React.ChangeEvent<HTMLInputElement>) {
        this.props.setLogin(e.target.value);
    }

    sendNewUserForm () {
        const { email, login, [newPass]: { password } } = this.props;
        this.props.sendNewUserForm(login, password, email);
    }

    render () {
        const { container, props: { email, login } } = this;

        return (
            <Paper>
                <form onSubmit={ (e) => e.preventDefault() }>
                    <FormControl tabIndex={1} >
                        <Login onChange={ this.loginOnChange } value={ login } tabIndex={1} {...{ container }} />
                        <Password {...{ container, passwordType: newPass }} tabIndex={2} />
                        <Password {...{ container, passwordType: confirmPass }} tabIndex={3} />
                        <Email onChange={ this.emailOnChange } value={ email } tabIndex={4} />
                        <Button
                            onClick={this.sendNewUserForm}
                            type="submit"
                            variant="contained"
                            tabIndex={5}
                        >
                            <Translate id='submitForm' />
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

export default NewUserFormComponent;