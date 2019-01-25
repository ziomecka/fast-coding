import * as React from 'react';
import locationContext from './context';
import { AppLocationEnum, ILocationProviderState } from './_duck/';
import { ILocationProviderProps } from './container';

import { AppRoutesEnum } from '@appTypes';
const { Provider } = locationContext;

class LocationProvider extends React.Component<ILocationProviderProps, ILocationProviderState> {
    isHome: AppLocationEnum;
    isLesson: AppLocationEnum;
    isOther: AppLocationEnum;
    home: AppRoutesEnum;
    constructor( props ) {
        super( props );

        Object.assign( this, AppLocationEnum );

        this.home = AppRoutesEnum.home;

        this.state = {
            appLocation: this.getLocation( this.pathname )
        };
    }

    get pathname() {
        return this.props.location.pathname;
    }

    checkLesson( pathname: string ): boolean {
        return RegExp( '.*\lesson-.*' ).test( pathname );
    }

    checkHome ( pathname: string ): boolean {
        return pathname === this.home;
    }

    getLocation( pathname: string ): AppLocationEnum {
        switch ( true ) {
            case ( this.checkHome( pathname ) ): {
                return this.isHome;
            }
            case ( this.checkLesson( pathname ) ): {
                return this.isLesson;
            }
            default: {
                return this.isOther;
            }
        }
    }

    shouldComponentUpdate( nextProps: ILocationProviderProps ): boolean {
        const { pathname } = this;
        const nextPathname = nextProps.location.pathname;

        if ( pathname !== nextPathname ) {
            this.setState( { appLocation: this.getLocation( nextPathname ) } );
        }

        return true;
    }

    render() {
        return (
            <Provider value={ this.state.appLocation }>
                { this.props.children }
            </Provider>
        );
    }
}

export default LocationProvider;
