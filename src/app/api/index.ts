import 'isomorphic-fetch';

const PROD_ENV = process && process.env.NODE_ENV
    ? process.env.NODE_ENV.trim() === 'production'
    : false;

const PORT = process && process.env.PORT
  ? process.env.PORT
  : process.env.PORT_DEV;

const ROOT_URL = !PROD_ENV
  ? `http://localhost:${PORT}`
  : 'https://fast-coding.herokuapp.com';

async function sendRequest(path: string, options = {}): Promise<any> {
  const headers = {
    'Content-type': 'application/json; charset=UTF-8',
  };

  let response = await fetch(
    `${ROOT_URL}${path}`,
    Object.assign(
      { method: 'POST', credentials: 'include' },
      { headers },
      options
    )
  );

  let data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

export default (url: string) => sendRequest(url, { method: 'GET' });
