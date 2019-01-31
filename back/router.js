const {
    ROUTES: {
        CHANGE_PASSWORD,
        IS_AUTHORIZED,
        LESSONS_GET,
        LOGIN_FIREBASE,
        LOGIN_LOG,
        LOGOUT,
        NEW_PASSWORD,
        NEW_USER_SET,
        REMIND_PASSWORD,
        TRANSLATIONS_GET,
    },
} = require('./constants');

const router = require('express').Router();

const serverChangePassword = require('./server.change.password');
const serverFavicon = require('./server.favicon');
const serverIsAuthorized = require('./server.is.authorized.get');
const serverJavascript = require('./server.javascript');
const serverLessonsGet = require('./server.lessons.get');
const serverLoginFirebase = require('./server.login.firebase.post');
const serverLoginLog = require('./server.login.log');
const serverLogoutGet = require('./server.logout.get');
const serverNewPassword = require('./server.new.password');
const serverNewUserSet = require('./server.newuser.set');
const serverRemindPassword = require('./server.remind.password');
const serverSideRendering = require('./server.side.rendering');
const serverTranslationsGet = require('./server.translations.get');

router.get( '/favicon.ico', serverFavicon );
router.get( IS_AUTHORIZED, serverIsAuthorized );
router.get( LESSONS_GET, serverLessonsGet );
router.get ( LOGOUT, serverLogoutGet );
router.get( TRANSLATIONS_GET, serverTranslationsGet );
router.get( '/*.js', serverJavascript );
router.get( '*', serverSideRendering );

router.post( CHANGE_PASSWORD, serverChangePassword );
router.post ( LOGIN_FIREBASE, serverLoginFirebase );
router.post( LOGIN_LOG, serverLoginLog );
router.post( NEW_PASSWORD, serverNewPassword );
router.post( NEW_USER_SET, serverNewUserSet );
router.post( REMIND_PASSWORD, serverRemindPassword );

module.exports = router;