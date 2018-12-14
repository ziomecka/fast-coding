import { SendFormChangePasswordI } from '../../ChangePasswordForm/_duck/types';
import { AppRoutes } from '../../../_common/index';

export interface SendFormI {
    request: {
        path: AppRoutes;
        body: SendFormChangePasswordI; // TODO rozszerzać
    };
    success: {
        value: any; // TODO
        redirectUrl?: AppRoutes;
        successNotification: string;
        errorNotifications: {
            [key: string]: string // TODO key
        };
    }
};