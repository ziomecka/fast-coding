import * as React from 'react';

import { Translate } from 'react-localize-redux';

/** Materials core */
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'

const LessonNotDesktopComponent: React.StatelessComponent = () => {
    return (
        <Paper>
            <Typography variant="h2">
                <Translate id="lessonNotDesktopScreen" />
            </Typography>
        </Paper>
    )
};

export default LessonNotDesktopComponent;
