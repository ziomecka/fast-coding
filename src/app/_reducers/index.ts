import { Reducer } from 'redux';

import { DialogTypes } from '../Dialog/_duck/types';
import { NotificationTypes } from '../Notification/_duck/types';
import { NewUserFormTypes } from '../NewUserForm/_duck/types';
import { SubMenuTypes } from '../SubMenu/_duck/types';
import { WelcomeTypes } from '../Welcome/_duck/types';
import { ContentTypes } from '../Content/_duck/types';
import { LoginTypes } from '../Login/_duck/types';
import { PasswordTypes } from '../Password/_duck/types';
import { SetPasswordAction } from '../Password/_duck/actions';
import { UserTypes } from '../User/_duck/types';
import { FormHelperTextTypes } from '../FormHelperText/_duck/types';
import { LoginFormTypes } from '../LoginForm/_duck/types';

import {
    INITIAL_STATE as LOGINFORM_INITIAL_STATE,
    LoginFormState,
    loginFormReducer
} from '../LoginForm/_duck/reducers';

import {
    INITIAL_STATE as DIALOG_INITIAL_STATE,
    DialogState,
    dialogReducer
} from '../Dialog/_duck/reducers';

import {
    INITIAL_STATE as NOTIFICATION_INITIAL_STATE,
    NotificationState,
    notificationReducer
} from '../Notification/_duck/reducers';

import {
    INITIAL_STATE as NEWUSERFORM_INITIAL_STATE,
    newUserFormReducer,
    NewUserFormState
} from '../NewUserForm/_duck/reducers';

import {
    INITIAL_STATE as MENU_INITIAL_STATE,
    menuReducer,
    MenuState
} from '../AppMenu/_duck/reducers';

import {
    INITIAL_STATE as WELCOME_INITIAL_STATE,
    welcomeReducer,
    WelcomeState
} from '../Welcome/_duck/reducers';

import {
    INITIAL_STATE as CONTENT_INITIAL_STATE,
    contentReducer,
    ContentState
} from '../Content/_duck/reducers';

import {
    INITIAL_STATE as USER_INITIAL_STATE,
    userReducer,
    UserState
} from '../User/_duck/reducers';

import { AppContainers } from '../_common/';
import { AppActions, actions } from '../_actions/';

import {
    INITIAL_STATE as FORM_HELPER_TEXT_INITIAL_STATE,
    formHelperTextReducer,
    FormHelperTextState
} from '../FormHelperText/_duck/reducers';

const {
    loginForm,
    dialog,
    notification,
    newUserForm,
    appMenu,
    welcome,
    content,
    user,
    formHelperText,
} = AppContainers;

export const INITIAL_STATE = {
    [loginForm]: LOGINFORM_INITIAL_STATE,
    [dialog]: DIALOG_INITIAL_STATE,
    [notification]: NOTIFICATION_INITIAL_STATE,
    [newUserForm]: NEWUSERFORM_INITIAL_STATE,
    [appMenu]: MENU_INITIAL_STATE,
    [welcome]: WELCOME_INITIAL_STATE,
    [content]: CONTENT_INITIAL_STATE,
    [user]: USER_INITIAL_STATE,
    [formHelperText]: FORM_HELPER_TEXT_INITIAL_STATE
};

const { APP_DIALOG_CLOSE, APP_DIALOG_OPEN } = DialogTypes;

const {
    APP_PASSWORD_SET_PASSWORD_CONFIRM,
    APP_PASSWORD_SET_PASSWORD_CURRENT,
    APP_PASSWORD_SET_PASSWORD_NEW
} = PasswordTypes;

const { APP_WELCOME_CHANGE_LOCATION } = WelcomeTypes;
const {
    APP_CONTENT_CHANGE_LOCATION,
    APP_CONTENT_ONDROP_REGISTER,
    APP_CONTENT_ONDROP_DEREGISTER,
    APP_CONTENT_TITLE_CHANGE
} = ContentTypes;
const {
    APP_NOTIFICATION_CLOSE,
    APP_NOTIFICATION_OPEN,
    APP_NOTIFICATION_RESET,
    APP_NOTIFICATION_SET_TIME
 } = NotificationTypes;
const { APP_SUBMENU_SET_ANCHOREL } = SubMenuTypes;
const { APP_USER_AUTHORIZE_USER, APP_USER_UNAUTHORIZE } = UserTypes;


const { APP_FORM_HELPER_TEXT_SET } = FormHelperTextTypes;

const {
    APP_LOGINFORM_SET_LOGIN,
    APP_LOGINFORM_RESET
} = LoginFormTypes;

const reducer: Reducer<AppState, AppActions> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_DIALOG_CLOSE:
        case APP_DIALOG_OPEN: {
            return {
                ...state,
                [dialog]: dialogReducer(state[dialog], action),
            };
        }

        case APP_LOGINFORM_RESET:
        case APP_LOGINFORM_SET_LOGIN: {
            return {
                ...state,
                // @ts-ignore
                [loginForm]: loginFormReducer(state[loginForm], action)
            };
        }

        case APP_PASSWORD_SET_PASSWORD_CONFIRM:
        case APP_PASSWORD_SET_PASSWORD_CURRENT:
        case APP_PASSWORD_SET_PASSWORD_NEW: {
            switch ((action as SetPasswordAction).container) {
                case loginForm: {
                    return {
                        ...state,
                        // @ts-ignore
                        [loginForm]: loginFormReducer(state[loginForm], action)
                    };
                }

                case newUserForm: {
                    return {
                        ...state,
                        [newUserForm]: newUserFormReducer(state[newUserForm], action),
                    };
                }

                default: {
                    return { ...state };
                }
            }
        }


        case APP_FORM_HELPER_TEXT_SET: {
            return {
                ...state,
                [formHelperText]: formHelperTextReducer(state[formHelperText], action)
            }
        }

        case APP_WELCOME_CHANGE_LOCATION: {
            return {
                ...state,
                // @ts-ignore
                [welcome]: welcomeReducer(state[welcome], action)
            };
        }

        case APP_CONTENT_ONDROP_REGISTER:
        case APP_CONTENT_ONDROP_DEREGISTER:
        case APP_CONTENT_TITLE_CHANGE:
        case APP_CONTENT_CHANGE_LOCATION: {
            return {
                ...state,
                [content]: contentReducer(state[content], action)
            };
        }

        case APP_NOTIFICATION_CLOSE:
        case APP_NOTIFICATION_OPEN:
        case APP_NOTIFICATION_RESET:
        case APP_NOTIFICATION_SET_TIME: {
            return {
                ...state,
                [notification]: notificationReducer(state[notification], action)
            };
        }

        case APP_SUBMENU_SET_ANCHOREL: {
            return {
                ...state,
                // @ts-ignore
                [appMenu]: menuReducer(state[appMenu], action)
            };
        }

        case APP_USER_AUTHORIZE_USER:
        case APP_USER_UNAUTHORIZE: {
            return {
                ...state,
                [user]: userReducer(state[user], action)
            };
        }

        default: {
            return { ...state };
        }
    }
};

export { reducer as appReducer };

export interface AppState {
    [loginForm]: LoginFormState;
    [dialog]: DialogState;
    [notification]: NotificationState;
    [newUserForm]: NewUserFormState;
    [appMenu]: MenuState;
    [welcome]: WelcomeState;
    [content]: ContentState;
    [user]: UserState;
    [formHelperText]: FormHelperTextState;
};