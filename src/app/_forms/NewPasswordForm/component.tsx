import * as React from 'react';

import { NewPasswordFormPropsI } from './container';
import { PasswordsEnum, AppContainersEnum } from '@appTypes';

const { newPasswordForm: container } = AppContainersEnum;

const { newPass, confirmPass } = PasswordsEnum;

import Password from '@forms/Password/';
import Message from '@forms/FormHelperText/';

import { RulesErrorEnum } from '@sharedTypes';
const { NO_MATCH } = RulesErrorEnum;

import parseQueries from '@shared/parse.queries';

/* Materials */
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { Translate } from 'react-localize-redux';
import { SERVER_CONSTANTS } from '@constants';
import { QueriesI } from '@app/api/';

const {
    QUERY_PARAM_KEY,
    QUERY_PARAM_EMAIL,
    QUERY_PARAM_KEY_LENGTH
} = SERVER_CONSTANTS;

import withStyles from '@material-ui/core/styles/withStyles';

import styles from './styles';

class NewPasswordFormComponent extends React.Component<NewPasswordFormPropsI> {
    keyParam: string;
    emailParam: string;
    expectedKeyLength: number;
    queries: QueriesI;
    key?: string;
    email?: string;
    constructor ( props ) {
        super( props );

        this.keyParam = QUERY_PARAM_KEY;
        this.emailParam = QUERY_PARAM_EMAIL;
        this.expectedKeyLength = QUERY_PARAM_KEY_LENGTH;

        this.submit = this.submit.bind( this );

        Object.assign( this, parseQueries( props.location.search ) );
    }

    get queryIsValid () {
        const { key, email, expectedKeyLength } = this;

        return ( key && email && key.length === expectedKeyLength );
    }

    componentWillUnmount() {
        this.props.reset();
    }

    submit () {
        const {
            props: {
                [newPass]: { password: newPassword, passwordValid: newPasswordValid },
                [confirmPass]: { password: confirmPassword, passwordValid: confirmPasswordValid }
            },
            key,
            email
         } = this;

         if ( !newPassword || !confirmPassword ||
             !!newPasswordValid || !! confirmPasswordValid ) {

            this.props.formInvalid();

        } else {
            // @ts-ignore
            this.props.sendForm( { newPassword, key, email } );
        }
    }

    render () {
        const {
            queryIsValid,
            props: {
                [newPass]: { password: newPassword },
                classes: { FCForm, form }
            }
         } = this;

        if ( queryIsValid ) {
            return (
                <Paper>
                    <form onSubmit={ e => e.preventDefault() } className={ `${ FCForm } ${ form }` }>
                        <Password {...{ container, passwordType: newPass }} />
                        <Password {...{ container, passwordType: confirmPass }} rules={[ NO_MATCH ]} value2={ newPassword } />

                        <Button
                            onClick={ this.submit }
                            type="submit"
                            tabIndex={3}
                            variant="contained"
                            color="primary"
                        >
                            <Translate id="submitForm" />
                        </Button>

                        <Message />
                    </form>
                </Paper>
            );
        }

        this.props.displayAppError( { text: 'newpasswordRouteError' } );

        return null;
    }
}

export default withStyles( styles )( NewPasswordFormComponent );
