import * as React from 'react';

import { LessonsProps } from './container';
import Course from '../Course/';

/** Materials core */
import Grid from '@material-ui/core/Grid';

const LessonsComponent: React.StatelessComponent<LessonsProps> = props => {
    return (
        <Grid
            container
            direction="row"
            wrap="wrap"
        >
            { props.lessons.map((lesson) => < Course { ...lesson } tabIndex={ -1 }/> )}

        </Grid>
    );
};

export default LessonsComponent;
