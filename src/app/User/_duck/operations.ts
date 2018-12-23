
import { Dispatch } from 'redux';

import { UserAuthorizeI } from './types';
import { authorizeUser, UserAuthorizationAction } from './actions';

export const onAuthorize = ( options?: UserAuthorizeI ): any => (
    async (dispatch: Dispatch ): Promise<UserAuthorizationAction> => {

        /** Store login or email in place of login */
        return dispatch( authorizeUser( Object.assign(
            {},
            { login: Object(options).login || Object(options).email }
        )));
    }
);

export const onUnauthorize = (): any => {
    async (dispatch: Dispatch ): Promise<any> => {
    }
};

export default  {
    onAuthorize,
    onUnauthorize
};