import { SendFormChangePasswordI } from '@app/ChangePasswordForm/';
import { SendFormRemindPasswordI } from '@app/RemindPasswordForm/';
import { SendNewUserFormI } from '@app/NewUserForm/';
import { SendLoginFormI } from '@app/LoginForm/';

import { AppRoutesEnum } from '@appTypes';
import { QueriesI } from '@app/api/';

export interface SendFormI {
    request: {
        path: AppRoutesEnum;
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
