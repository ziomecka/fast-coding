import * as React from 'react';

import { StatsProps } from './container';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { Translate } from 'react-localize-redux';
import withTable from '../../../app/Table';

import { getTime } from '../../../shared/convert.time';
import { StatsTimeUnitsEnum } from '../../_common/';

const { Hours, Minutes, Seconds } = StatsTimeUnitsEnum;

const StatsComponent: React.StatelessComponent<StatsProps> = (props)  => {
    const { start, stop, time, allErrors, text,
            classes: { statsPaper },
            createTable,
            endedLesson
    } = props;

    const totalTime = getTime(stop - start + time);

    const { hours, minutes, seconds } = totalTime;
    const accuracy = Math.round(100 - 100 * (allErrors.length / text.length));

    const renderTime = (time: number, id: string): JSX.Element => (
        time > 0 && (
            <>
                { time }
                &nbsp;
                <Translate {...{ id }} />
                &nbsp;
            </>
        )
    );

    const getUnitId = (time: number, unit: StatsTimeUnitsEnum) => (
        (time === 1)
            ? `lessonStatsUnit${unit}_1`
            : ( time < 5 )
                ? `lessonStatsUnit${unit}_4`
                : `lessonStatsUnit${unit}_more`
    );

    return endedLesson && (
        <Paper className={statsPaper} id="lessonStats">
            <Typography variant="h4">
                <Translate id="lessonStatsHeading" />
            </Typography>

            {createTable({
                body: [
                    [
                        <Translate id="lessonStatsTime" />,
                        <>
                            { renderTime(hours, getUnitId(hours, Hours) ) }
                            { renderTime(minutes, getUnitId(minutes, Minutes) ) }
                            { renderTime(seconds, getUnitId(seconds, Seconds) ) }
                        </>,
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
