import * as React from 'react';

import { ChangePasswordFormProps } from './container';

import Password from '../Password/';
import Message from '../FormHelperText/';

import { AppContainers } from '@appTypes';
const { changePasswordForm } = AppContainers;

import { Translate } from 'react-localize-redux';

/** Materials */
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import { PasswordsEnum } from '@appTypes';
const { currentPass, newPass, confirmPass } = PasswordsEnum;

import { RulesErrorEnum } from '../../shared/_types/';

// TODO NO_MATCH ad MATCH
// mogłoby być jedno gdbym mogła w props rules komponentu Password przekazywać inforamcję czy rule ma być spełnione czy nie
const {
    NO_MATCH,
    MATCH,
    NOT_LONG,
    NO_SPACES,
    NO_DIGIT,
    NO_SPECIALS
} = RulesErrorEnum;

class ChangePasswordFormComponent extends React.Component<ChangePasswordFormProps> {
    container: AppContainers;
    constructor(props) {
        super(props);

        this.container = changePasswordForm;

        this.emailOnChange = this.emailOnChange.bind(this);
        this.loginOnChange = this.loginOnChange.bind(this);
        this.sendForm = this.sendForm.bind(this);
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

    sendForm () {
        const {
            [currentPass]: { password: currentPassword, passwordValid: currentPasswordValid },
            [newPass]: { password: newPassword, passwordValid: newPasswordValid },
            [confirmPass]: { password: confirmPassword, passwordValid: confirmPasswordValid }
        } = this.props;

        if ( !currentPassword || !newPassword || !confirmPassword ||
             !!currentPasswordValid || !!newPasswordValid || !! confirmPasswordValid ) {
                this.props.formInvalid();
        } else {
            this.props.sendForm({ currentPassword, newPassword });
        }
    }

    render () {
        const {
            container,
            props: {
                [newPass]: { password: newPassword },
                [currentPass]: { password: currentPassword }
            }
        } = this;

        return (
            <Paper>
                <form onSubmit={ (e) => e.preventDefault() }>
                    <FormControl tabIndex={1}>
                        <Password {...{ container, passwordType: currentPass }} tabIndex={2} />
                        {/* // TODO niepotrzebnie muszę ustawiać defaultowe sprawdzenia jeżeli chcę codadć jedną zasadę */}
                        <Password {...{ container, passwordType: newPass }} tabIndex={3} rules={[ NOT_LONG, NO_SPACES, NO_DIGIT, NO_SPECIALS, MATCH ]} value2={ currentPassword } />
                        <Password {...{ container, passwordType: confirmPass }} tabIndex={4} rules={[ NO_MATCH ]} value2={ newPassword } />
                        <Button
                            onClick={this.sendForm}
                            type="submit"
                            tabIndex={6}
                            variant="contained"
                            color="primary"
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

export default ChangePasswordFormComponent;