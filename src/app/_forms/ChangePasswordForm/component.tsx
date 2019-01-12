import * as React from 'react';

import { ChangePasswordFormProps } from './container';

import Password from '@forms/Password/';
import Message from '@forms/FormHelperText/';

import { AppContainersEnum, PasswordsEnum } from '@appTypes';
const { changePasswordForm } = AppContainersEnum;

import { Translate } from 'react-localize-redux';

/** Materials */
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

const { currentPass, newPass, confirmPass } = PasswordsEnum;

import { RulesErrorEnum } from '@shared/_types/';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { withMedia, MediaEnum } from '@app/Media';

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
    container: AppContainersEnum;
    xs: MediaEnum;
    constructor( props ) {
        super( props );

        this.container = changePasswordForm;
        this.xs = MediaEnum.xs;

        this.emailOnChange = this.emailOnChange.bind( this );
        this.loginOnChange = this.loginOnChange.bind( this );
        this.sendForm = this.sendForm.bind( this );
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

    sendForm () {
        const {
            [ currentPass ]: { password: currentPassword, passwordValid: currentPasswordValid },
            [ newPass ]: { password: newPassword, passwordValid: newPasswordValid },
            [ confirmPass ]: { password: confirmPassword, passwordValid: confirmPasswordValid }
        } = this.props;

        if ( !currentPassword || !newPassword || !confirmPassword ||
             !!currentPasswordValid || !!newPasswordValid || !! confirmPasswordValid ) {
            this.props.formInvalid();
        } else {
            this.props.sendForm( { currentPassword, newPassword } );
        }
    }

    render () {
        const {
            container,
            props: {
                [ newPass ]: { password: newPassword },
                [ currentPass ]: { password: currentPassword },
                classes: { FCForm, form },
                media
            },
            xs
        } = this;

        return (
            <form onSubmit={ ( e ) => e.preventDefault() } className={ `${ FCForm } ${ form }` }>
                <Password
                    {...{ container, passwordType: currentPass }}
                    tabIndex={2}
                    autoFocus={ media !== xs }
                />
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
            </form>
        );
    }
}

export default withStyles( styles )( withMedia( ChangePasswordFormComponent ) );
