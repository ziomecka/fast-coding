import { SendFormChangePasswordI } from '../../ChangePasswordForm/_duck/types';
import { SendFormRemindPasswordI } from '../../RemindPasswordForm/_duck/types';
import { SendNewUserFormI } from '../../NewUserForm/_duck/types';
import { SendLoginFormI } from '../../LoginForm/_duck/types';

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