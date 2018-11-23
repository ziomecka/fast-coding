import * as React from 'react';
import { LessonProps } from './container';

import Comparator from './Comparator/container';

import Stats from './Stats';

/** Materials */
import Paper from '@material-ui/core/Paper';

class LessonComponent extends React.Component<LessonProps> {
    style: React.CSSProperties;
    constructor(props) {
        super(props);
        this.style = {
            maxWidth: '900px',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
        };
    }

    componentWillUnmount() {
        /** no matter if running or not, cheaper than checking */
        this.props.reset();
    }

    get invite (): JSX.Element {
        return (
            <p> You can start typing :-) </p>
        );
    }

    render() {
        const { title, ended, started } = this.props;

        return (
            // @ts-ignore
            <>
                <Paper {...{ style: this.style }}>
                    <h2>Lesson: "{title? title.toLowerCase() : ''}"</h2>
                    { !started && this.invite }
                    <Comparator />
                    { ended && <Stats /> }
                </Paper>
            </>
        );
    }
}

export default LessonComponent;