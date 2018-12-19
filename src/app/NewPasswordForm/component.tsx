import * as React from 'react';

import { NewPasswordFormPropsI } from './container';
import * as types from '@appTypes';
import { PasswordsEnum } from '@appTypes';

const {
    AppContainersEnum: { newPasswordForm: container },
} = types;

const { newPass, confirmPass } = PasswordsEnum;

import Password from '../Password/';
import Message from '../FormHelperText/';

import { RulesErrorEnum } from '@sharedTypes';
const { NO_MATCH } = RulesErrorEnum;

/* Materials */
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import { Translate } from 'react-localize-redux';
import { KEY_PARAM } from '@views/AppRouter/constants';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from '@appForm/styles';

class NewPasswordFormComponent extends React.Component<NewPasswordFormPropsI> {
    constructor (props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    submit () {
        const {
            [newPass]: { password: newPassword, passwordValid: newPasswordValid },
            [confirmPass]: { password: confirmPassword, passwordValid: confirmPasswordValid },
            match: { params },
         } = this.props;

         if ( !newPassword || !confirmPassword ||
             !!newPasswordValid || !! confirmPasswordValid ) {

            this.props.formInvalid();

        } else {
            // @ts-ignore
            this.props.sendForm({ newPassword, key: params.key.slice(KEY_PARAM.length) });
        }
    };


    render () {
        const {
            [newPass]: { password: newPassword },
            classes: { FCForm }
         } = this.props;

        return (
            <Paper>
                <form onSubmit={ e => e.preventDefault() } className={ FCForm }>
                    <FormControl>
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

                    </FormControl>
                </form>
            </Paper>
        );
    }
}

export default withStyles(styles)(NewPasswordFormComponent);