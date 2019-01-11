import * as React from 'react';

import { RemindPasswordPropsI } from './container';
import LoginForm from '@forms/LoginForm';
import { DialogsEnum } from '@app/Dialog';
const { simple } = DialogsEnum;

import Email from '@forms/Email';
import Message from '@forms/FormHelperText/';

/* Materials */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Translate } from 'react-localize-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { withMedia, MediaEnum } from '@app/Media/';
import { AppRoutesEnum } from '@appTypes';

class RemindPasswordComponent extends React.Component<RemindPasswordPropsI> {
    xs: MediaEnum;
    redirectUrl: AppRoutesEnum;
    constructor( props ) {
        super( props );

        this.xs = MediaEnum.xs;
        this.redirectUrl = AppRoutesEnum.login;

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
        if ( this.props.media !== this.xs ) {
            this.props.openDialog( {
                Component: LoginForm,
                variant: simple
            } );
        } else {
            this.props.history.push( this.redirectUrl );
        }
    }

    render () {
        const {
            props: {
                email,
                emailValid,
                classes: { FCForm, FCFormButton, form, FCFormButtonText },
                media,
            },
            xs
         } = this;

        return (
                <form onSubmit={ e => e.preventDefault() } className={ `${ FCForm } ${ form }` }>
                    <Email
                        onChange={ this.emailOnChange }
                        {...{ email, emailValid }}
                        autoFocus={ media !== xs }
                    />

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

                        <Button
                            onClick={ this.redirect }
                            type="submit"
                            tabIndex={3}
                            variant="text"
                            color="primary"
                            className= { `${ FCFormButton } ${ FCFormButtonText }` }
                        >
                            <Translate id="remindPasswordRememberButton" />
                        </Button>
                </form>
        );
    }
}

export default withStyles( styles )( withMedia( RemindPasswordComponent ) );
