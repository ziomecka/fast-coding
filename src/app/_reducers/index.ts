import { Reducer, combineReducers } from 'redux';

import { PasswordActionsEnum } from '@app/Password/_duck/types';
import { SetPasswordAction } from '@app/Password/_duck/actions';

import {
    INITIAL_STATE as LOGINFORM_INITIAL_STATE,
    LoginFormState,
    loginFormReducer
} from '@app/LoginForm/_duck/reducers';

import {
    INITIAL_STATE as DIALOG_INITIAL_STATE,
    DialogState,
    dialogReducer
} from '@app/Dialog/_duck/reducers';

import {
    INITIAL_STATE as NOTIFICATION_INITIAL_STATE,
    NotificationState,
    notificationReducer
} from '@app/Notification/_duck/reducers';

import {
    INITIAL_STATE as NEWUSERFORM_INITIAL_STATE,
    newUserFormReducer,
    NewUserFormState
} from '@app/NewUserForm/_duck/reducers';

import {
    INITIAL_STATE as MENU_INITIAL_STATE,
    menuReducer,
    MenuState
} from '@app/AppMenu/_duck/reducers';

import {
    INITIAL_STATE as WELCOME_INITIAL_STATE,
    welcomeReducer,
    WelcomeState
} from '@app/Welcome/_duck/reducers';

import {
    INITIAL_STATE as CONTENT_INITIAL_STATE,
    contentReducer,
    ContentState
} from '@app/Content/_duck/reducers';

import {
    INITIAL_STATE as USER_INITIAL_STATE,
    userReducer,
    UserState
} from '@app/User/_duck/reducers';

import { AppContainersEnum } from '@appTypes';
import { AppActions } from '@app/_actions/';

import {
    INITIAL_STATE as FORM_HELPER_TEXT_INITIAL_STATE,
    formHelperTextReducer,
    FormHelperTextState
} from '@app/FormHelperText/_duck/reducers';

import {
    INITIAL_STATE as CHANGEPASSWORDFORM_INITIAL_STATE,
    changePasswordFormReducer,
    ChangePasswordFormState
} from '@app/ChangePasswordForm/_duck/reducers';

import {
    INITIAL_STATE as KEYBOARD_LISTENER_INITIAL_STATE,
    keyboardListenerReducer,
    KeyboardListenerState
} from '@app/KeyboardListener/_duck/reducers';

import {
    INITIAL_STATE as REMIND_PASSWORD_INITIAL_STATE,
    remindPasswordReducer,
    RemindPasswordState
} from '@app/RemindPasswordForm/_duck/reducers';

import {
    INITIAL_STATE as NEW_PASSWORD_INITIAL_STATE,
    newPasswordFormReducer,
    NewPasswordFormState
} from '@app/NewPasswordForm/_duck/reducers';

import {
    INITIAL_STATE as GOOGLE_LOGIN_INITIAL_STATE,
    googleLoginReducer,
    GoogleLoginState
} from '@app/GoogleLogin/_duck/reducers';

import {
    INITIAL_STATE as TRANSLATIONS_LOADER_INITIAL_STATE,
    translationsLoaderReducer,
    TranslationsLoaderState
} from '@app/TranslationsLoader/_duck/reducers';

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
    changePasswordForm,
    keyboardListener,
    remindPasswordForm,
    newPasswordForm,
    googleLogin,
    translationsLoader
} = AppContainersEnum;

export const INITIAL_STATE = {
    [loginForm]: LOGINFORM_INITIAL_STATE,
    [dialog]: DIALOG_INITIAL_STATE,
    [notification]: NOTIFICATION_INITIAL_STATE,
    [newUserForm]: NEWUSERFORM_INITIAL_STATE,
    [appMenu]: MENU_INITIAL_STATE,
    [welcome]: WELCOME_INITIAL_STATE,
    [content]: CONTENT_INITIAL_STATE,
    [user]: USER_INITIAL_STATE,
    [formHelperText]: FORM_HELPER_TEXT_INITIAL_STATE,
    [changePasswordForm]: CHANGEPASSWORDFORM_INITIAL_STATE,
    [keyboardListener]: KEYBOARD_LISTENER_INITIAL_STATE,
    [remindPasswordForm]: REMIND_PASSWORD_INITIAL_STATE,
    [newPasswordForm]: NEW_PASSWORD_INITIAL_STATE,
    [googleLogin]: GOOGLE_LOGIN_INITIAL_STATE,
    [translationsLoader]: TRANSLATIONS_LOADER_INITIAL_STATE
};

const {
    APP_PASSWORD_SET_PASSWORD_CONFIRM,
    APP_PASSWORD_SET_PASSWORD_CURRENT,
    APP_PASSWORD_SET_PASSWORD_NEW,
    APP_PASSWORD_SET_PASSWORD,
    APP_PASSWORD_VALIDATE_NEW,
    APP_PASSWORD_VALIDATE_CONFIRM,
    APP_PASSWORD_VALIDATE_CURRENT,
    APP_PASSWORD_VALIDATE
} = PasswordActionsEnum;

const combinedReducers = combineReducers( {
    [dialog]: dialogReducer,
    [loginForm]: loginFormReducer,
    [newUserForm]: newUserFormReducer,
    [formHelperText]: formHelperTextReducer,
    [welcome]: welcomeReducer,
    [content]: contentReducer,
    [notification]: notificationReducer,
    [appMenu]: menuReducer,
    [user]: userReducer,
    [changePasswordForm]: changePasswordFormReducer,
    [keyboardListener]: keyboardListenerReducer,
    [remindPasswordForm]: remindPasswordReducer,
    [newPasswordForm]: newPasswordFormReducer,
    [googleLogin]: googleLoginReducer,
    [translationsLoader]: translationsLoaderReducer
} );

const reducer: Reducer<AppState, AppActions> = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case APP_PASSWORD_VALIDATE_NEW:
        case APP_PASSWORD_VALIDATE_CONFIRM:
        case APP_PASSWORD_VALIDATE_CURRENT:
        case APP_PASSWORD_VALIDATE:
        case APP_PASSWORD_SET_PASSWORD:
        case APP_PASSWORD_SET_PASSWORD_CONFIRM:
        case APP_PASSWORD_SET_PASSWORD_CURRENT:
        case APP_PASSWORD_SET_PASSWORD_NEW: {
            switch ( ( action as SetPasswordAction ).container ) {
                case loginForm: {
                    return {
                        ...state,
                        [loginForm]: loginFormReducer( state[loginForm], action )
                    };
                }

                case newUserForm: {
                    return {
                        ...state,
                        [newUserForm]: newUserFormReducer( state[newUserForm], action ),
                    };
                }

                case changePasswordForm: {
                    return {
                        ...state,
                        [changePasswordForm]: changePasswordFormReducer( state[changePasswordForm], action )
                    };
                }

                case newPasswordForm: {
                    return {
                        ...state,
                        [newPasswordForm]: newPasswordFormReducer( state[newPasswordForm], action )
                    };
                }

                default: {
                    return { ...state };
                }
            }
        }

        default: {
            return {
                ...combinedReducers( state, action )
            };
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
    [changePasswordForm]: ChangePasswordFormState;
    [keyboardListener]: KeyboardListenerState;
    [remindPasswordForm]: RemindPasswordState;
    [newPasswordForm]: NewPasswordFormState;
    [googleLogin]: GoogleLoginState;
    [translationsLoader]: TranslationsLoaderState;
}
