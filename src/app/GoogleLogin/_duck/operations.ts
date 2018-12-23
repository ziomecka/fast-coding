// https://firebase.google.com/docs/auth/web/firebaseui
// https://firebase.google.com/docs/
// https://developers.facebook.com/

import { Dispatch, Action } from 'redux';
import { ThunkGetStateType, ApplicationContainersEnum } from '@applicationTypes';
import { AppContainersEnum, AppRoutesEnum } from '@appTypes';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import firebaseui from 'firebaseui';

import { projectId, apiKey, authDomain, databaseURL } from '../constants';
import { authorizeFirebase } from './actions';

import getTranslation from '@shared/get.translation';

import { onAuthorize } from '@app/User/_duck/operations';

import history from '@shared/history';

const { app } = ApplicationContainersEnum;
const { googleLogin } = AppContainersEnum;

const { lessons: signInSuccessUrl, privacyPolicy: privacyPolicyUrl } = AppRoutesEnum;

let ui;

export const onAuthorizeFirebase = (): any => (
    async (dispatch: Dispatch, getState: ThunkGetStateType): Promise<boolean> => {
        if ( !getState()[app][googleLogin].firebaseAuthorized ) {
            let response = await firebase.initializeApp({
                    projectId,
                    apiKey,
                    authDomain,
                    databaseURL
            });

            if (response) {
                ui = new firebaseui.auth.AuthUI(firebase.auth());
                dispatch(authorizeFirebase());
                response = null; // GC
                return true;
            }

            return false;
        }

    });

const signInSuccessWithAuthResult = async (authResult, redirectUrl, dispatch: Dispatch): Promise<boolean> => {
    const { displayName, email, photoURL, refreshToken } = authResult.user;

    try {
        let response = await dispatch(onAuthorize({ displayName, email, photoURL, refreshToken }));
        if (response) {
            history.push(signInSuccessUrl);
            response = null; // GC
        }
    } catch (err) {
        // TOD if failure
    } finally {
        return false; // do not redirect
    }
};

const signInFailure = async (err, dispatch: Dispatch): Promise<boolean> => {
    return Promise.resolve(false);
};

export const onStartFirebaseUI = (): any => (
    async (dispatch: Dispatch): Promise<any> => {

        ui.start('#firebaseui-auth-container', {
            callbacks: {
                signInSuccessWithAuthResult: async (authResult, redirectUrl) => signInSuccessWithAuthResult(authResult, redirectUrl, dispatch),
                signInFailure: err => signInFailure(err, dispatch)
            },
            signInFlow: 'popup',
            tosUrl: privacyPolicyUrl,
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