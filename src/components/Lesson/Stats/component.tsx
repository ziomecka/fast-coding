import * as React from 'react';

import { StatsProps } from './container';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { Translate } from 'react-localize-redux';
import withTable from '../../../app/Table';

const StatsComponent: React.StatelessComponent<StatsProps> = (props)  => {
    const { start, stop, allErrors, text,
            classes: { statsPaper },
            createTable
    } = props;

    const time = Math.round((stop - start) / 10) / 100;
    const accuracy = Math.round(100 - 100 * (allErrors.length / text.length));

    return (
        <Paper className={statsPaper} id="lessonStats">
            <Typography variant="h4">
                <Translate id="lessonStatsHeading" />
            </Typography>

            {createTable({
                body: [
                    [
                        <Translate id="lessonStatsTime" />,
                        <>{ time } <Translate id="lessonStatsTimeUnit" /></>,
                    ],
                    [
                        <Translate id="lessonStatsAccuracy" />,
                        <>{ accuracy }%</>
                    ]
                ]
            })}
        </Paper>
    );
};

export default withStyles(styles)(withTable(StatsComponent));
