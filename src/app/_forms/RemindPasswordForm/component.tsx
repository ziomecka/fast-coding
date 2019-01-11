import * as React from 'react';

import { RemindPasswordPropsI } from './container';
import LoginForm from '@forms/LoginForm';
import { DialogsEnum } from '@app/Dialog';
const { simple } = DialogsEnum;

import Email from '@forms/Email';
import Message from '@forms/FormHelperText/';

/* Materials */
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Translate } from 'react-localize-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

class RemindPasswordComponent extends React.Component<RemindPasswordPropsI> {
    constructor( props ) {
        super( props );
        this.emailOnChange = this.emailOnChange.bind( this );
        this.submit = this.submit.bind( this );
        this.redirect = this.redirect.bind( this );
    }

    componentWillUnmount() {
        this.props.reset();
    }

    emailOnChange ( e: React.ChangeEvent<HTMLInputElement> ) {
        this.props.setEmail( { email: e.target.value } );
    }

    submit () {
        const { email, emailValid } = this.props;

        if ( !email || !!emailValid ) {
            this.props.formInvalid();
        } else {
            this.props.sendForm( { email } );
        }
    }

    redirect () {
        this.props.openDialog( {
            Component: LoginForm,
            variant: simple
        } );
    }

    render () {
        const {
            email,
            emailValid,
            classes: { FCForm, FCFormButton, form }
         } = this.props;

        return (
            <Paper>
                <form onSubmit={ e => e.preventDefault() } className={ `${ FCForm } ${ form }` }>
                    <Email onChange={ this.emailOnChange } {...{ email, emailValid }} />

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

                    <Typography variant="body1">
                        <Button
                            onClick={ this.redirect }
                            type="submit"
                            tabIndex={3}
                            variant="text"
                            color="primary"
                            className={ FCFormButton }
                        >
                            <Translate id="remindPasswordRememberButton" />
                        </Button>
                    </Typography>
                </form>
            </Paper>
        );
    }
}

export default withStyles( styles )( RemindPasswordComponent );
