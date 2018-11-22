
import * as React from 'react';
import { LessonProps } from './container';
import Comparator from './Comparator/';

import Stats from './Stats';

/** Materials */
import Paper from '@material-ui/core/Paper';

const LessonComponent: React.StatelessComponent<LessonProps> = props => {
    const { title, currentSignIndex } = props;

    const invite = () => <p> You can start typing :-) </p>;

    const style = {
        maxWidth: '900px',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
    };

    return (
        // @ts-ignore
        <Paper {...{ style }}>
            <h2>Lesson: "{title? title.toLowerCase() : ''}"</h2>
            { currentSignIndex === -1 && invite() }
            <Comparator />
            { currentSignIndex !== -1 && <Stats /> }
        </Paper>
    );
}

export default LessonComponent;