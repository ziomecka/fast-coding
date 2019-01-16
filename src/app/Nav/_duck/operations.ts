import { Dispatch, Action } from 'redux';

import { unauthorizeUser } from '@app/User/_duck/actions';
import { onOpenNotification } from '@app/Notification/_duck/operations';

import { AppRoutesEnum, AppRoutesServerEnum } from '@appTypes';
import history from '@shared/history';
import { get } from '@app/api/';

const { lessons } = AppRoutesEnum;
const { logOut } = AppRoutesServerEnum;

export const onLogOut = (): any => (
    async ( dispatch: Dispatch ): Promise<Action> => {
        let serverResponse = await get( { path: logOut } );

        if ( serverResponse ) {
            let response = await dispatch( unauthorizeUser() );
            // TODO if not try catch?
            /** redirect to lessons and notify about success */
            if ( response ) {
                response = null; // GC
                history.push( lessons );
                return dispatch( onOpenNotification( { text: 'notificationSignOutSuccess' } ) );
            }
            serverResponse = null; //GC
        }

    }
);

export default {
    onLogOut
};
