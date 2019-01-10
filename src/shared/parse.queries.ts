import { QueriesI } from '@app/api/';

const parseQueries = (str: string): QueriesI => {

    const result = {};

    const findQuery = (s: string): number => {
        let i = s.indexOf('?');
        if (i !== -1 ) return i;
        return s.indexOf('&');
    };

    const findEqual = (s: string): number => s.indexOf('=');

    const parse = (value: string): QueriesI => {
        if (value) {
            let queryIndex = findQuery(value);

            if (queryIndex !== -1) {

                let equalIndex = findEqual(value);
                let queryName = value.substr(queryIndex + 1, equalIndex - 1);
                let newValue = value.slice(equalIndex + 1);

                let nextQueryIndex = findQuery(newValue);

                if ( nextQueryIndex !== -1) {
                    result[queryName] = newValue.slice(0, nextQueryIndex);
                } else {
                    result[queryName] = newValue.slice(0, newValue.length + 1);
                }

                return parse( newValue.substr( nextQueryIndex ) );

            } else {
                return result;
            }
        } else {
            return result;
        }
    };

    return parse(str);
};

export default parseQueries;