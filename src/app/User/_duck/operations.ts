
import { Dispatch } from 'redux';

import { UserAuthorizeI } from './types';
import { authorizeUser, UserAuthorizationAction } from './actions';

export const onAuthorize = ( options?: UserAuthorizeI ): any => (
    async (dispatch: Dispatch ): Promise<UserAuthorizationAction> => {
        const { login, email } = Object(options);

        /** Store login or email in place of login */
        return dispatch( authorizeUser( Object.assign(
            Object(options), { login: login || email }
        )));
    }
);

export const onUnauthorize = (): any => {
    async (dispatch: Dispatch ): Promise<any> => {
    };
};

export default {
    onAuthorize,
    onUnauthorize
};