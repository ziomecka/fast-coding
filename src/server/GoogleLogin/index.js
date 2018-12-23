// https://github.com/googleapis/google-api-nodejs-client
// https://github.com/googleapis/google-auth-library-nodejs
require('dotenv').config();
const firebase = require('./firebase');
const fetch = require('node-fetch');
const parseQueries = require('../parse.queries');
const { google } = require('googleapis');
const querystring = require('querystring');
const http = require('http');
const opn = require('opn');

const {
    OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET,
    OAUTH_CLIENT_URL,
 } = process.env;

const googleOAuth = () => {

    const oAuthClient = new google.auth.OAuth2(
        OAUTH_CLIENT_ID,
        OAUTH_CLIENT_SECRET,
        'http://localhost:3000/lessons'
    );

    const scopes = [
        // 'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/cloud-platform'
        // 'https://www.googleapis.com/auth/calendar'
    ];

    const url = oAuthClient.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
    });
    
    
    const logIn = async () => {
        const provider = firebase.auth().GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
        // let server = await http.createServer(async (req, res) => {
        //     if (req.url.indexOf('/oauth2callback') > -1) {
        //         // acquire the code from the querystring, and close the web server.
        //         const qs = querystring.parse(url.parse(req.url).query);
        //         console.log(`Code is ${qs.code}`);
        //         res.end('Authentication successful! Please return to the console.');
        //         server.close();
                
        //         // Now that we have the code, use that to acquire tokens.
        //         const r = await oAuth2Client.getToken(qs.code)
        //         // Make sure to set the credentials on the OAuth2 client.
                
        //         oAuth2Client.setCredentials(r.tokens);
        //         console.info('Tokens acquired.');
        //         resolve(oAuth2Client);
        //     }
        // }).listen(8000, () => {
        //     // open the authorize url to start the workflow
        //     // const a = http.fetch(url)
        //     opn(url);
        //     // console.log("a")
        //     // // console.log(a)
        //     // http.request(url, res => {
        //     //     console.log(res)
        //     // })
        // });
    };

    return {
        url,
        logIn
    };
};

const appGoogle = googleOAuth();

module.exports = appGoogle;
