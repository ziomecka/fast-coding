export const htmlId = 'firebaseui-auth-container';

export const googleClass = 'firebaseui-idp-google';
export const facebookClass = 'firebaseui-idp-facebook';
export const textLongClass = 'firebaseui-idp-text-long';

export const googleScopes = [ 'https://www.googleapis.com/auth/plus.login' ];
export const facebookScopes = [
    'public_profile',
    'email',
];

/** tabIndex listeners */
export const GOOGLE_FORM = '#firebaseui-auth-container';
export const GOOGLE_BUTTON = 'button[data-provider-id="google.com"]';
export const FACEBOOK_BUTTON = 'button[data-provider-id="facebook.com"]';

export const RIPPLE_CLASS_PARENT = 'fcRipple';
export const RIPPLE_CLASS_CHILD = 'fcRipple-child';
export const RIPPLE_CLASS_PULSATE = 'fcRipple-pulsate';

export default {
    htmlId,
    googleClass,
    facebookClass,
    textLongClass,
    googleScopes,
    facebookScopes
};
