// https://firebase.google.com/docs/auth/web/firebaseui
// https://firebase.google.com/docs/
// https://developers.facebook.com/

import { Dispatch } from 'redux';
import { ThunkGetStateType } from '@applicationTypes';
import { AppRoutesEnum, UserAuthorizationMethodEnum, AppRoutesServerEnum } from '@appTypes';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import {
    htmlId,
    facebookClass,
    googleClass,
    textLongClass,
    googleScopes,
    facebookScopes
} from '../constants';

import getTranslation from '@shared/get.translation';

import { onAuthorize } from '@app/User/_duck/operations';

import history from '@shared/history';

import { closeDialog } from '@app/Dialog/';
import { openNotification, error, success } from '@app/Notification/';

import { post } from '@app/api/';

const { loginFirebase } = AppRoutesServerEnum;

const {
    lessons: signInSuccessUrl,
    privacyPolicy: privacyPolicyUrl,
    termsOfService: tosUrl
} = AppRoutesEnum;

export const onStartUi = ( ui: any ): any => (
    async ( dispatch: Dispatch ): Promise<void> => {
        ui.start( `#${ htmlId }`, {
            callbacks: {
                signInSuccessWithAuthResult: authResult => signInSuccessWithAuthResult( authResult, dispatch ),
                signInFailure: () => signInFailure( dispatch )
            },
            signInFlow: 'popup',
            privacyPolicyUrl,
            tosUrl,
            signInOptions: [
                {
                    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    scopes: googleScopes,
                    // Forces account selection even when one account is available.
                    customParameters: { prompt: 'select_account' }
                },
                {
                    provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                    scopes: facebookScopes
                }
            ]
        } );
    }
);

const signInSuccessWithAuthResult = ( authResult, dispatch: Dispatch ): boolean => {
    const {
        user: { displayName, email, photoURL, refreshToken },
        additionalUserInfo: { providerId }
    } = authResult;

    const authorizationMethod = UserAuthorizationMethodEnum[ providerId ];

    dispatch( onAuthorize( {
        displayName,
        email,
        photoURL,
        refreshToken,
        // @ts-ignore
        authorizationMethod
    } ) );

    dispatch( closeDialog() );
    history.push( signInSuccessUrl );
    dispatch( openNotification( { text: 'notificationAuthorized', variant: success } ) );

    post( { path: loginFirebase, body: { displayName, email, authorizationMethod, refreshToken } } );

    return false; // false means 'do not redirect'
};

const signInFailure = ( dispatch: Dispatch ): Promise<any> => {
    return dispatch( openNotification( { text: 'notificationLoginFailure', variant: error } ) );
};

const firebaseClassName = value => `${ value } .${ textLongClass }`;

export const onSetTranslations = (): any => (
    ( dispatch: Dispatch, getState: ThunkGetStateType ): boolean => {
        let { localize } = getState();

        document
            .querySelector( firebaseClassName( `.${ googleClass }` ) )
            .innerHTML = getTranslation( localize, 'signInWithGoogle' );

        document
            .querySelector( firebaseClassName( `.${ facebookClass }` ) )
            .innerHTML = getTranslation( localize, 'signInWithFacebook' );

        localize = null; // GC

        return true;
    }
);
