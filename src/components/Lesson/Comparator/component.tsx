import * as React from 'react';

import { ComparatorProps } from './container';

import OriginalTextarea from './OriginalTextarea/';

class ComparatorComponent extends React.Component<ComparatorProps> {
    constructor(props) {
        super(props);
    }

    scroll(id: string): void {
        try {
            document.getElementById(id).scrollIntoView(false);
        } catch (err) {
        }
    };

    componentDidMount() {
        this.props.addEventListener();
        this.props.restoreState();
    }

    componentWillUnmount() {
        this.props.removeEventListener();
        this.props.keepState();
    }

    componentDidUpdate(prevProps: ComparatorProps) {
        const { currentSignIndex, lessonText } = this.props;
        const prevCurrentSignIndex= prevProps.currentSignIndex;

        if (currentSignIndex !== prevCurrentSignIndex) {
            if (currentSignIndex === 0) {
                this.props.startLesson();
                this.props.turnOnComparator();
            }

            if (currentSignIndex >= lessonText.length - 1) {
                this.props.endingLesson();
            }

            this.scroll(`letter-${currentSignIndex + 3}`);
        }
    }

    render () {
        return (
            <OriginalTextarea />
        );
    }
};

export default ComparatorComponent;
