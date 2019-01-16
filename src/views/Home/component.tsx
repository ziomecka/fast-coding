import * as React from 'react';
import Nav from '@app/Nav';

import { HomeViewProps } from './container';

import Content from '@app/Content/';
import TextGenerator from '@components/TextGenerator/';
import LessonsLoader from '@components/LessonsLoader/';
import User from '@app/User/';
import KeyboardListener from '@app/KeyboardListener/';
import TranslationsLoader from '@app/TranslationsLoader/';


import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseui from 'firebaseui';

import {
    projectId,
    authDomain,
    databaseURL
} from './constants';

class HomeViewComponent extends React.Component<HomeViewProps> {
    componentDidMount() {
        this.props.isAuthorized();
        firebase.initializeApp( {
            projectId,
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain,
            databaseURL
        } );
    }

    render() {
        return (
            <React.Fragment>
                <User />
                <KeyboardListener />
                <LessonsLoader />
                <Nav />

                <Content>
                    {/* TODO nie powinien byc tutaj tylko w lessons, zastanowic sie */}
                    <TextGenerator />
                    { this.props.children }
                </Content>

                <TranslationsLoader />
            </React.Fragment>
        );
    }
}

export default HomeViewComponent;
