import { AppRoutesServerEnum  } from '@appTypes';

export const buildParam = ( paramName: string, param: string ) => `?${paramName}=${param.toLowerCase()}`;

export const buildParamsFromArray = ( paramName:string, params: string[] ): string => {
    let result = '';
    params.forEach( param => result += buildParam( paramName, param ) );
    return result;
};

export const buildUrl = ( params: URLParamsI, url: string ): string => {
    Object.keys( params ).forEach( paramName => {
        let _params = params[paramName];

        if ( Array.isArray( _params ) ) {
            url += buildParamsFromArray( paramName, _params as string[] );
        } else {
            url += buildParam( paramName, _params );
        }

        _params = null; // GC?
    } );

    return url;
};

export interface URLParamsI {
    [paramName: string]: string | string[]
}
