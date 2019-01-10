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
        const { firebaseAuthorized } = this.props;

        /** If already authorized in firebase then start firebase ui
         *  Else authorize and depending on response satrtFirebaseUI
         */
        if ( firebaseAuthorized ) {
            return this.startFirebaseUI();
        }  else {
            return this.authorizeFirebase();
        }
    }

    async authorizeFirebase (): Promise<void> {
        let response = await this.props.authorizeFirebase();

        if (response) {
            response = null; // GC
            return(this.startFirebaseUI());
        }
    }

    async startFirebaseUI (): Promise<void> {
        let response = await this.props.startFirebaseUI();

        if (response) {
            response = null; // GC
            return (this.props.setTranslations());
        }
    }

    componentDidUpdate(prevProps) {
        const activeLanguage = getActiveLanguage(this.props.localize);
        const prevActiveLanguage = getActiveLanguage(prevProps.localize);

        const { firebaseAuthorized } = this.props;
        const { firebaseAuthorized: prevFirebaseAuthorized } = prevProps;

        if ( activeLanguage !== prevActiveLanguage ){
            this.props.setTranslations();
        }

        if (firebaseAuthorized !== prevFirebaseAuthorized && !firebaseAuthorized) {
            this.authorizeFirebase();
        }
    }

    render() {
        const { id, props: { classes: { firebaseClass } } } = this;

        return (
            <div>
                <Paper { ...{ id } } className={ firebaseClass } />
            </div>
        );
    }
};

export default withStyles(styles)(GoogleLoginComponent);