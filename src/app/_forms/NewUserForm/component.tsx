import * as React from 'react';

import { NewUserFormProps } from './container';

import Password from '@forms/Password/';
import Login from '@forms/Login/';
import Email from '@forms/Email/';
import Message from '@forms/FormHelperText/';

import { AppContainersEnum, PasswordsEnum } from '@appTypes';
const { newUserForm } = AppContainersEnum;

import { Translate } from 'react-localize-redux';

/** Materials */
import Button from '@material-ui/core/Button';

const { newPass, confirmPass } = PasswordsEnum;

import { RulesErrorEnum } from '@shared/_types/';
const { NO_MATCH } = RulesErrorEnum;


import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';
import { withMedia, MediaEnum } from '@app/Media/';

class NewUserFormComponent extends React.Component<NewUserFormProps> {
    container: AppContainersEnum;
    xs: MediaEnum;
    constructor( props ) {
        super( props );

        this.container = newUserForm;
        this.xs = MediaEnum.xs;

        this.emailOnChange = this.emailOnChange.bind( this );
        this.loginOnChange = this.loginOnChange.bind( this );
        this.sendNewUserForm = this.sendNewUserForm.bind( this );
    }

    componentWillUnmount() {
        this.props.reset();
    }

    emailOnChange ( e: React.ChangeEvent<HTMLInputElement> ) {
        this.props.setEmail( e.target.value );
    }

    loginOnChange ( e: React.ChangeEvent<HTMLInputElement> ) {
        this.props.setLogin( e.target.value );
    }

    sendNewUserForm () {
        const {
            email,
            emailValid,
            login,
            loginValid,
            [newPass]: { password: newPassword, passwordValid: newPasswordValid },
            [confirmPass]: { password: confirmPassword, passwordValid: confirmPasswordValid }
        } = this.props;

        if ( !login || !newPassword || !confirmPassword || !email ||
             !!loginValid || !!newPasswordValid || !! confirmPasswordValid || !!emailValid ) {
            this.props.formInvalid();
        } else {
            this.props.sendNewUserForm( { login, password: newPassword, email } );
        }
    }

    render () {
        const {
            container,
            props: {
                email, emailValid, login,
                [newPass]: { password: newPassword },
                classes: { FCForm, FCFormButton, form },
                media
            },
            xs
        } = this;

        return (
            <form onSubmit={ ( e ) => e.preventDefault() } className={ `${ FCForm } ${ form }` }>
                <Login
                    onChange={ this.loginOnChange }
                    value={ login }
                    tabIndex={1}
                    {...{ container }}
                    autoFocus={ media !== xs }
                />
                <Password {...{ container, passwordType: newPass }} tabIndex={2} />
                <Password {...{ container, passwordType: confirmPass }} tabIndex={3} rules={[ NO_MATCH ]} value2={ newPassword } />
                <Email onChange={ this.emailOnChange } {...{ email, emailValid }} tabIndex={4} />
                <Button
                    onClick={this.sendNewUserForm}
                    type="submit"
                    tabIndex={5}
                    variant="contained"
                    color="primary"
                    className={ FCFormButton }
                >
                    <Translate id='submitForm' />
                </Button>

                <Message />
            </form>
        );
    }
}

export default withStyles( styles )( withMedia( NewUserFormComponent ) );
