import { SendFormChangePasswordI } from '../../ChangePasswordForm/_duck/types';
import { SendFormRemindPasswordI } from '../../RemindPasswordForm/_duck/types';
import { AppRoutesEnum } from '@appTypes';

export interface SendFormI {
    request: {
        path: AppRoutesEnum;
        body: SendFormChangePasswordI | SendFormRemindPasswordI; // TODO rozszerzać
    };
    success: {
        value: any; // TODO
        redirectUrl?: AppRoutesEnum;
        successNotification: string;
        errorNotifications: {
            [key: string]: string // TODO key
        };
    }
};