import * as React from 'react';

import { ComparatorProps } from './container';

import LessonText from '@components/LessonText/';

class ComparatorComponent extends React.Component<ComparatorProps> {
    constructor( props ) {
        super( props );
    }

    scroll( id: string ): void {
        let htmlElement = document.getElementById( id );
        if ( htmlElement ) {
            htmlElement.scrollIntoView( false );
            htmlElement = null; // GC
        }
    }

    componentDidMount() {
        this.props.listenKeys();
        this.props.restoreState();
    }

    componentWillUnmount() {
        this.props.stopListenKeys();
        this.props.keepState();
    }

    componentDidUpdate( prevProps: ComparatorProps ) {
        const { currentSignIndex, lessonText } = this.props;
        const prevCurrentSignIndex = prevProps.currentSignIndex;

        if ( currentSignIndex !== prevCurrentSignIndex ) {
            if ( currentSignIndex === 0 ) {
                this.props.startLesson();
                this.props.turnOnComparator();
            }

            if ( currentSignIndex >= lessonText.length - 1 ) {
                this.props.endingLesson();
            }

            this.scroll( `letter-${currentSignIndex + 3}` );
        }
    }

    render () {
        return (
            <LessonText />
        );
    }
}

export default ComparatorComponent;
