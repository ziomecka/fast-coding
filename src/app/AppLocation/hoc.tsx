import * as React from 'react';
import { Consumer } from './context';
import { AppLocationEnum } from './_duck/';

const AppLocation = ( Component: React.FunctionComponent | React.ComponentClass ) => ( props ) => {
    return (
        <Consumer>
            { value => (
                <Component { ...props } appLocation={ value } { ...AppLocationEnum } />
            ) }
        </Consumer>
    );
};

export default AppLocation;
