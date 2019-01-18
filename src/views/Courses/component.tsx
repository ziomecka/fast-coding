import * as React from 'react';

import { LessonsViewProps } from './container';
import Courses from '@components/Courses';

/** Materials */
import Paper from '@material-ui/core/Paper';
import Progress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { Translate } from 'react-localize-redux';

const LessonsViewComponent: React.StatelessComponent<LessonsViewProps> = props => {
    const { loading, classes: { progressClass } } = props;

    const loader = (
        <Paper>
            {/*
            // @ts-ignore */}
            <Grid
                container
                component={ Typography }
                // @ts-ignore
                variant="h3"
                alignItems="center"
            >
                <Translate id="coursesAreLoading" />
                <Progress
                    color="secondary"
                    size={ 40 }
                    thickness={ 4 }
                    className={ progressClass }
                />
            </Grid>
        </Paper>
    );

    if ( loading ) return loader;
    return <Courses />;
};

export default withStyles( styles )( LessonsViewComponent );
