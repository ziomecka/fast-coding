import * as React from 'react';

import { LessonsProps } from './container';
import Course from '../Course/';

/** Materials core */
import Paper from '@material-ui/core/Paper';

require('./style.sass');

const LessonsComponent: React.StatelessComponent<LessonsProps> = props => {
    return (
        <Paper id="lessons">
            { props.lessons.map((lesson) => < Course { ...lesson } /> )}
        </Paper>
    );
};

export default LessonsComponent;
