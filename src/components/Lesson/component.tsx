
import * as React from 'react';
import { LessonProps } from './container';
import Comparator from './Comparator/';

/** Materials */
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

const LessonComponent: React.StatelessComponent<LessonProps> = props => {
    const { title, currentSignIndex } = props;

    const invite = () => <p> You can start typing :-) </p>;
    const showStats = () => (
        <>
            <Divider />
            <Paper>
                stats
            </Paper>
        </>
    );

    return (
        <Paper>
            <h2>Lesson: "{title? title.toLowerCase() : ''}"</h2>
            { currentSignIndex === 0 && invite() }
            <Comparator />
            { currentSignIndex !== 0 && showStats() }
        </Paper>
    );
}

export default LessonComponent;