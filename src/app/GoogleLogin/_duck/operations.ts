// https://firebase.google.com/docs/auth/web/firebaseui
// https://firebase.google.com/docs/
// https://developers.facebook.com/

import { Dispatch, Action } from 'redux';
import { ThunkGetStateType, ApplicationContainersEnum } from '@applicationTypes';
import { AppContainersEnum, AppRoutesEnum } from '@appTypes';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import firebaseui from 'firebaseui';

import { projectId, authDomain, databaseURL } from '../constants';
import { authorizeFirebase, unauthorizeFirebase } from './actions';

import getTranslation from '@shared/get.translation';

import { onAuthorize } from '@app/User/_duck/operations';

import { UserAuthorizationMethodEnum } from '@appTypes'

import history from '@shared/history';

const { app } = ApplicationContainersEnum;
const { googleLogin } = AppContainersEnum;

const { lessons: signInSuccessUrl, privacyPolicy: privacyPolicyUrl, termsOfService: tosUrl } = AppRoutesEnum;

export let ui;

export const onAuthorizeFirebase = (): any => (
    async (dispatch: Dispatch, getState: ThunkGetStateType): Promise<boolean> => {
        if ( !getState()[app][googleLogin].firebaseAuthorized ) {
            try {
                let response = await firebase.initializeApp({
                    projectId,
                    apiKey: process.env.FIREBASE_API_KEY,
                    authDomain,
                    databaseURL
                });

                if (response) {
                    ui = new firebaseui.auth.AuthUI(firebase.auth());
                    dispatch(authorizeFirebase());
                    response = null; // GC
                    return true;
                } else if (!response) {
                    return false;
                }

            } catch (err) {
                return Promise.resolve(false);
            }
        }

    });

const signInSuccessWithAuthResult = async (authResult, redirectUrl, dispatch: Dispatch): Promise<boolean> => {
    const {
        user: { displayName, email, photoURL, refreshToken },
        additionalUserInfo: { providerId }
    } = authResult;

    try {
        let response = await dispatch(onAuthorize({
            // @ts-ignore
            displayName, email, photoURL, refreshToken, authorizationMethod: UserAuthorizationMethodEnum[ providerId ]
        }));
        if (response) {
            history.push(signInSuccessUrl);
            response = null; // GC
        }
    } catch (err) {
        // TOD if failure
    } finally {
        return false; // false means 'do not redirect'
    }
};

const signInFailure = async (err, dispatch: Dispatch): Promise<boolean> => {
    return Promise.resolve(false);
};

export const onStartFirebaseUI = (): any => (
    async (dispatch: Dispatch): Promise<any> => {

        if (ui) {

            ui.start('#firebaseui-auth-container', {
                callbacks: {
                    signInSuccessWithAuthResult: async (authResult, redirectUrl) => signInSuccessWithAuthResult(authResult, redirectUrl, dispatch),
                    signInFailure: err => signInFailure(err, dispatch)
                },
                signInFlow: 'popup',
                privacyPolicyUrl,
                tosUrl,
                signInOptions: [
                    {
                        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                        scopes: [ 'https://www.googleapis.com/auth/plus.login' ],
                        // Forces account selection even when one account is available.
                        customParameters: { prompt: 'select_account' }
                    },
                    {
                        provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                        scopes: [
                            'public_profile',
                            'email',
                        ]
                    }
                ]
            });

            return Promise.resolve(true);
        } else {
            return dispatch( unauthorizeFirebase() );
        }
    }
);

const firebaseClassName = value => `${ value } .firebaseui-idp-text-long`;

export const onSetTranslations = (): any => (
    (dispatch: Dispatch, getState: ThunkGetStateType): boolean => {
        let { localize } = getState();

        document
            .querySelector(firebaseClassName('.firebaseui-idp-google'))
            .innerHTML = getTranslation(localize, 'signInWithGoogle');

        document
            .querySelector(firebaseClassName('.firebaseui-idp-facebook'))
            .innerHTML = getTranslation(localize, 'signInWithFacebook');

        localize = null; // GC

        return true;
    }
);