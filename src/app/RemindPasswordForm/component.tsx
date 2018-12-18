import * as React from 'react';

import { RemindPasswordPropsI } from './container';
import * as types from '@appTypes';

const {
    AppRoutesEnum: { login }
} = types;

import Email from '../Email';
import Message from '../FormHelperText/';

import history from '../../shared/history';

/* Materials */
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import { Translate } from 'react-localize-redux';

class RemindPasswordComponent extends React.Component<RemindPasswordPropsI> {
    constructor(props) {
        super(props);
        this.emailOnChange = this.emailOnChange.bind(this);
        this.submit = this.submit.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    emailOnChange (e: React.ChangeEvent<HTMLInputElement>) {
        this.props.setEmail({ email: e.target.value });
    };

    submit () {
        const { email, emailValid } = this.props;

        if ( !email || !!emailValid ) {
            this.props.formInvalid();
        } else {
            this.props.sendForm({ email });
        }
    };

    redirect () {
        history.push(login);
    }

    render () {
        const { email, emailValid } = this.props;

        return (
            <Paper>
                <form onSubmit={ e => e.preventDefault() }>
                    <FormControl tabIndex={1}>
                        <Typography>

                        </Typography>

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

                        <FormHelperText>
                            <Message />
                        </FormHelperText>

                        <Typography variant="body1">
                            <Button
                                onClick={ this.redirect }
                                type="submit"
                                tabIndex={3}
                                variant="text"
                                color="primary"
                            >
                                <Translate id="remindPasswordRememberButton" />
                            </Button>
                        </Typography>
                    </FormControl>
                </form>
            </Paper>
        );
    }
};

export default RemindPasswordComponent;