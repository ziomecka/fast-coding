import * as React from 'react';

import { LocationChangeProps } from './container';

class LocationChange extends React.Component<LocationChangeProps> {
    constructor( props ) {
        super( props );
    }

    get pathname() {
        return this.props.location.pathname;
    }

    componentDidMount() {
        /** "Welcome" and "Content" components get info about the initial location */
        this.propagateLocation( this.pathname );
    }

    propagateLocation( nextPathname: string ) {
        this.props.containers.forEach( container => {
            this.props.handleChangeLocation( nextPathname, container );
        } );
    }

    shouldComponentUpdate( nextProps: LocationChangeProps ): boolean {
        const nextPathname = nextProps.location.pathname;
        const { pathname } = this;

        if ( pathname !== nextPathname ) {
            this.propagateLocation( nextPathname );
            return true;
        }

        return false;
    }

    render() {
        return null;
    }
}

export default LocationChange;
