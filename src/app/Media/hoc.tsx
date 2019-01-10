import * as React from 'react';
import context, { IWithMedia } from './context';

const { Consumer } = context;

export const withMedia = ( Component: React.ComponentClass | React.FunctionComponent ) => ( props ) => (
    <Consumer>
        { ( value: IWithMedia ) => (
            <Component { ...props } media={ value.media } />
        )}
    </Consumer>
);