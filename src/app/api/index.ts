import fetch from 'node-fetch';

const PROD_ENV = process && process.env.NODE_ENV
    ? process.env.NODE_ENV.trim() === 'production'
    : false;

const PORT = process && process.env.PORT
  ? process.env.PORT
  : process.env.PORT_DEV;

const ROOT_URL = !PROD_ENV
  ? `http://localhost:${PORT}`
  : 'https://fast-coding.herokuapp.com';

async function sendRequest(options: SendRequestRequestType, method: 'POST' | 'GET'): Promise<SendRequestResponseType> {
  const headers = {
    'Content-type': 'application/json; charset=UTF-8',
  };

    let response = await fetch( `${ROOT_URL}${options.path}`,
        method === 'POST'
            ? { method, credentials: 'include', headers, body: JSON.stringify((options as PostRequestI).body) }
            : { method, credentials: 'include', headers }
    );

    return response.json();
};

export const post = async ( options: PostRequestI ): Promise<PostResponseI> => await sendRequest( options, 'POST' );

export const get = async ( options: GetRequestI ): Promise<GetResponseI> => await sendRequest( options, 'GET' );

export default { post, get };

export interface GetRequestI {
    path: string;
};

export interface GetResponseI {
    result: string;
};

export interface PostRequestI {
    path: string;
    body: Object
};

export interface PostResponseI {
    result: string;
};

type SendRequestRequestType = GetRequestI | PostRequestI;
type SendRequestResponseType = GetResponseI | PostResponseI;
