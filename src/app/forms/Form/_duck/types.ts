import { SendFormChangePasswordI } from '@forms/ChangePasswordForm/_duck/types';
import { SendFormRemindPasswordI } from '@forms/RemindPasswordForm/_duck/types';
import { SendNewUserFormI } from '@forms/NewUserForm/_duck/types';
import { SendLoginFormI } from '@forms/LoginForm/_duck/types';

import { AppRoutesEnum } from '@appTypes';
import { QueriesI } from '@app/api/index';

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
};