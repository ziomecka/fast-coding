import * as React from 'react';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseui from 'firebaseui';

import { GoogleLoginProps } from './container';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { getActiveLanguage } from 'react-localize-redux';

import { htmlId } from './constants';

require( './styles.sass' );

class GoogleLoginComponent extends React.Component<GoogleLoginProps> {
    id: string;
    ui: any;
    constructor( props ) {
        super( props );
        this.id = htmlId;
    }

    async componentDidMount() {
        // @ts-ignore
        this.ui = new firebaseui.auth.AuthUI( firebase.auth() );
        this.props.startUI( this.ui );
        this.props.addTabIndex();
    }

    componentDidUpdate( prevProps ) {
        const activeLanguage = getActiveLanguage( this.props.localize );
        const prevActiveLanguage = getActiveLanguage( prevProps.localize );

        if ( activeLanguage !== prevActiveLanguage ){
            this.props.setTranslations();
        }
    }

    componentWillUnmount() {
        this.ui.delete();
        this.props.removeTabIndex();
    }

    render() {
        const {
            id,
            props: { classes: { firebaseClass } }
        } = this;

        return (
            <div { ...{ id } } className={ firebaseClass } />
        );
    }
}

export default withStyles( styles )( GoogleLoginComponent );
