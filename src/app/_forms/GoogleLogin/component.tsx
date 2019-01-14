import * as React from 'react';

import { GoogleLoginProps } from './container';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { getActiveLanguage } from 'react-localize-redux';
import { htmlId } from './constants';

class GoogleLoginComponent extends React.Component<GoogleLoginProps> {
    id: string;
    constructor( props ) {
        super( props );
        this.id = htmlId;
    }

    componentDidMount() {
        this.props.initializeFirebase();
    }

    componentDidUpdate( prevProps ) {
        const activeLanguage = getActiveLanguage( this.props.localize );
        const prevActiveLanguage = getActiveLanguage( prevProps.localize );

        if ( activeLanguage !== prevActiveLanguage ){
            this.props.setTranslations();
        }
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
