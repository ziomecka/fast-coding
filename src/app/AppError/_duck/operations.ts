import { Dispatch, Action } from 'redux';
import { onOpenNotification } from '@app/Notification/_duck/operations';

import history from '@shared/history';
import {
    AppRoutesEnum,
    NotificationVariantEnum,
    NotificationDurationEnum,
    AppErrorI
} from '@appTypes';

const { home } = AppRoutesEnum;
const { error } = NotificationVariantEnum;
const { standard } = NotificationDurationEnum;

export const onAppError = ( options?: AppErrorI ): any => (
    ( dispatch: Dispatch ): Action => {

        const {
            text = 'oopsSomethingWentWrong',
            redirect = true,
            duration = standard
        } = Object( options );

        if ( redirect ) history.push( home );

        return dispatch( onOpenNotification( {
            text,
            variant: error
        }, duration ) );
    }
);