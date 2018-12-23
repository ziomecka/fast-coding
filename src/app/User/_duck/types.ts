export enum UserActionsEnum {
    APP_USER_AUTHORIZE_USER = '@@app_user/AUTHORIZE_USER',
    APP_USER_UNAUTHORIZE = '@@app_user/UNAUTHORIZE'
}

export enum UserRolesEnum {
    admin = 'ADMIN',
    free = 'FREE',
    individual = 'INDIVIDUAL',
    teacher = 'TEACHER',
    pupil = 'PUPIL'
};

export interface UserAuthorizeI {
    displayName?: string;
    email?: string;
    photoURL?: string;
    refreshToken?: string;
    authorizationMethod: UserAuthorizationMethodEnum
};

/** Left side === providerId in firebase authResult */
export enum UserAuthorizationMethodEnum {
    'google.com'  = 'GOOGLE',
    'facebook.com' = 'FACEBOOK',
    'fastcoding' = 'FAST_CODING'
};