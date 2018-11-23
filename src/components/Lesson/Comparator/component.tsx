import * as React from 'react';

import { ComparatorProps } from './container';

import KeyboardListener from './KeyboardListener/container';
import OriginalTextarea from './OriginalTextarea/';

class ComparatorComponent extends React.Component<ComparatorProps> {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps: ComparatorProps) {
        const { currentSignIndex, text } = this.props
        const prevCurrentSignIndex= prevProps.currentSignIndex;

        if (currentSignIndex !== prevCurrentSignIndex) {
            if (currentSignIndex === 0) {
                this.props.startLesson();
                this.props.turnOnComparator();
            }

            if (currentSignIndex === text.length - 1) {
                this.props.endingLesson();
            }
        }
    }

    render () {
        return (
            <>
                <KeyboardListener />
                <OriginalTextarea />
            </>
        );
    }
};

export default ComparatorComponent;
