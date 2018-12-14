import * as React from 'react';

import { ChangePasswordFormProps } from './container';

import Password from '../Password/';
import Message from '../FormHelperText/';

import { AppContainers } from '../_common/';
const { changePasswordForm } = AppContainers;

import { Translate } from 'react-localize-redux';

/** Materials */
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import { PasswordTypes } from '../_common/';
const { currentPass, newPass, confirmPass } = PasswordTypes;

import { RulesErrorEnum } from '../../shared/_types/';
const { NO_MATCH } = RulesErrorEnum;

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

        console.log("here")
        if ( !currentPassword || !newPassword || !confirmPassword ||
             !!currentPasswordValid || !!newPasswordValid || !! confirmPasswordValid ) {
                this.props.formInvalid();
        } else {
            this.props.sendForm({ currentPassword, newPassword });
        }
    }

    render () {
        const { container, props: { [newPass]: { password: newPassword } } } = this;

        return (
            <Paper>
                <form onSubmit={ (e) => e.preventDefault() }>
                    <FormControl tabIndex={1}>
                        <Password {...{ container, passwordType: currentPass }} tabIndex={2} />
                        <Password {...{ container, passwordType: newPass }} tabIndex={3} />
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