import * as React from 'react';

import Paper from '@material-ui/core/Paper';

import { GoogleLoginProps } from './container';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { getActiveLanguage } from 'react-localize-redux';

class GoogleLoginComponent extends React.Component<GoogleLoginProps> {
    id: string;
    constructor(props) {
        super(props);
        this.id = 'firebaseui-auth-container';
    }

    async componentDidMount () {
        let response = await this.props.authorizeFirebase();

        if (response || !response) {
            response = null;
            this.props.startFirebaseUI();
        }
    }

    componentDidUpdate(prevProps) {
        const activeLanguage = getActiveLanguage(this.props.localize);
        const prevActiveLanguage = getActiveLanguage(prevProps.localize);

        if ( activeLanguage !== prevActiveLanguage ){
            this.props.setTranslations();
        }
    }

    render() {
        const { id, props: { classes: { firebaseClass } } } = this;

        return (
            <div>
                <Paper { ...{ id } } className={ firebaseClass } />
                {/* <Paper id="firebaseui-auth-container">dupcia</Paper> */}

            </div>
        );
    }
};

export default withStyles(styles)(GoogleLoginComponent);