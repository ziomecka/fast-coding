import fetch from 'node-fetch';
import { AppRoutesServerEnum } from '@appTypes';
import store from '@appStore';
import { authorizeUser, unauthorizeUser } from '@app/User/';

const PROD_ENV = process && process.env.NODE_ENV
    ? process.env.NODE_ENV.trim() === 'production'
    : false;

const PORT = process && process.env.PORT
    ? process.env.PORT
    : process.env.PORT_DEV;

const ROOT_URL = !PROD_ENV
    ? `http://localhost:${PORT}`
    : 'https://fast-coding.herokuapp.com';

const parseQueries = ( queries: QueriesI ) => {
    return Object.keys( queries ).reduce( ( acc, cv ) => {
        if ( acc.length ) {
            acc += `&${cv}=${queries[ cv ]}`;
        } else {
            acc += `?${cv}=${queries[ cv ]}`;
        }
        return acc;
    }, '' ) || '';
};

async function sendRequest( options: SendRequestRequestType, method: 'POST' | 'GET' ): Promise<SendRequestResponseType> {
    let headers = new Headers();
    headers.append( 'Content-Type', 'application/json; charset=UTF-8' );

    let response = await fetch(
        `${ ROOT_URL }${ options.path }${ options.queries ? parseQueries( options.queries ) : '' }`,
        method === 'POST'
            ? { method, credentials: 'include', headers, body: JSON.stringify( ( options as PostRequestI ).body ) }
            : { method, credentials: 'include', headers }
    );

    headers = null; // GC

    const res = await response.json();

    const { authorized, login, authorizationMethod, displayName } = res;
    const { authorized: userAuthorized } = store.getState().app.user;

    if ( authorized && !userAuthorized ) {
        store.dispatch( authorizeUser( { login, displayName, authorizationMethod } ) );
    } else if ( authorized === false && userAuthorized ) {
        store.dispatch( unauthorizeUser() );
    }

    // TODO, does not have be promise?
    return Promise.resolve(res);
}

export const post = async ( options: PostRequestI ): Promise<PostResponseI> => await sendRequest( options, 'POST' );

export const get = async ( options: GetRequestI ): Promise<GetResponseI> => await sendRequest( options, 'GET' );

export default { post, get };

export interface QueriesI {
    [key: string]: string
}

export interface RequestI {
    path: string;
    queries?: QueriesI;
}

export interface GetRequestI extends RequestI {}

export interface GetResponseI {
    result: number;
}

export interface PostRequestI extends RequestI {
    body: Object;
}

export interface PostResponseI {
    result: number;
}

type SendRequestRequestType = GetRequestI | PostRequestI;
type SendRequestResponseType = GetResponseI | PostResponseI;
