import { SendFormChangePasswordI } from '@forms/ChangePasswordForm/';
import { SendFormRemindPasswordI } from '@forms/RemindPasswordForm/';
import { SendNewUserFormI } from '@forms/NewUserForm/';
import { SendLoginFormI } from '@forms/LoginForm/';

import { AppRoutesEnum, AppRoutesServerEnum } from '@appTypes';
import { QueriesI } from '@app/api/';

export interface SendFormI {
    request: {
        path: AppRoutesServerEnum;
        queries?: QueriesI;
        body: SendFormChangePasswordI |
            SendFormRemindPasswordI |
            SendNewUserFormI |
            SendLoginFormI;
    };
    success: {
        value: any; // TODO
        redirectUrl?: AppRoutesEnum;
        successNotification: string;
        errorNotifications: {
            [key: string]: string // TODO key
        };
    }
}
