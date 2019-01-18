import * as React from 'react';

import { LessonsViewProps } from './container';
import Courses from '@components/Courses';

/** Materials */
import Paper from '@material-ui/core/Paper';
import Progress from '@material-ui/core/CircularProgress';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

const LessonsViewComponent: React.StatelessComponent<LessonsViewProps> = props => {
    const { loading, classes } = props;

    const loader = (
        <Paper className={classes.paperClass}>
            <p>Courses are loading...</p>
            <Progress
                color="secondary"
                size={40}
                thickness={4}
                className={classes.progressClass}
            />
        </Paper>
    );

    if ( loading ) return loader;
    return <Courses />;
};

export default withStyles( styles )( LessonsViewComponent );
