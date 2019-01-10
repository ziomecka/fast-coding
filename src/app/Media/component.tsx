import * as React from 'react';

import context from './context';
import { MediaEnum } from './_duck';

const { lg, md, sm, xl, xs } = MediaEnum;

import Media from 'react-media';
import { BREAKPOINTS } from './constants';

const { Provider } = context;

import { IMediaProviderState } from './containter';

class MediaProvider extends React.Component<{}, IMediaProviderState> {
    breakPoints: Map< MediaEnum, number >;
    constructor(props) {
        super(props);

        this.breakPoints = BREAKPOINTS;

        this.state = {
            media: this.detectMedia()
        };

        this.onMediaQueryChange = this.onMediaQueryChange.bind(this);
    }

    detectMedia(): MediaEnum {
        let iterator = this.breakPoints.entries();
        let start: [ MediaEnum, number ] = null;
        let breakpoint: MediaEnum = null;

        while ( !breakpoint ) {
            let entry = iterator.next().value;

            if ( entry ) {
                const windowMatches = (
                    window.matchMedia(`(min-width: ${ start? start[1] : 0 } px)`) &&
                    window.matchMedia(`(max-width: ${ entry[1] - 1 } px)`).matches
                );

                if ( windowMatches ) {
                    breakpoint = start ? start[0] : xs;
                }

                // @ts-ignore
                start = [ ...entry ];
                entry = null; //GC

            } else {
                return null;
            }
        }

        start = null;  //GC
        return breakpoint;
    }

    onMediaQueryChange(media: MediaEnum): void {
        this.setState({ media });
    }

    get mXs() {
        return this.breakPoints.get(xs);
    }

    get mSm() {
        return this.breakPoints.get(sm);
    }

    get mMd() {
        return this.breakPoints.get(md);
    }

    get mLg() {
        return this.breakPoints.get(lg);
    }

    get mXl() {
        return this.breakPoints.get(xl);
    }

    render() {
        const { mSm, mMd, mLg, mXl } = this;

        return (
            <>'               '<Media
                    query={`(max-width: ${ mSm - 1 }px)`}
                    onChange={ matches => matches ? this.onMediaQueryChange(xs) : null }
                />'
               '<Media
                    query={{ minWidth: `${ mSm }px`, maxWidth: `${ mMd - 1}px`}}
                    onChange={ matches => matches ? this.onMediaQueryChange(sm) : null }
                />'
               '<Media
                    query={{ minWidth: `${ mMd }px`, maxWidth: `${ mLg - 1}px`}}
                    onChange={ matches => matches ? this.onMediaQueryChange(md) : null }
                />'
               '<Media
                    query={{ minWidth: `${ mLg }px`, maxWidth: `${ mXl - 1}px`}}
                    onChange={ matches => matches ? this.onMediaQueryChange(lg) : null }
                />'
               '<Media
                    query={`(min-width: ${ mXl }px)`}
                    onChange={ matches => matches ? this.onMediaQueryChange(xl) : null }
                />'
               '<Provider value={{ media: this.state.media }}>
                    { this.props.children }
                </Provider>'           '</>
        );
    }
}

export default MediaProvider;