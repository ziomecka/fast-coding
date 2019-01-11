import * as React from 'react';

import { StatsProps } from './container';

/** Materials */
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { Translate } from 'react-localize-redux';
import withTable from '@app/Table';

import { getTime } from '@shared/convert.time';
import { StatsTimeUnitsEnum } from './_duck/types';
import { STATS_AVERAGE_WORD_LENGTH } from './constants';

import getTranslation from '@shared/get.translation';
const { Hours, Minutes, Seconds } = StatsTimeUnitsEnum;

const StatsComponent: React.StatelessComponent<StatsProps> = ( props ) => {
    const { start, stop, time, allErrors, text,
            classes: { statsPaper, statsNote },
            createTable,
            endedLesson,
            errors
    } = props;

    const totalTime = getTime( stop - start + time );

    const { hours, minutes, seconds } = totalTime;

    const accuracy = Math.round( 100 - 100 * ( errors.length / text.length ) );
    const realAccuracy = Math.round( 100 - 100 * ( allErrors.length / text.length ) );
    const WPM = Math.round( text.length / STATS_AVERAGE_WORD_LENGTH / ( minutes + seconds / 60 ) );

    const renderTime = ( time: number, id: string ): JSX.Element => (
        time > 0 && (
            <React.Fragment>
                { time }&nbsp;
                <Translate {...{ id }} />&nbsp;
            </React.Fragment>
        )
    );

    const getUnitId = ( time: number, unit: StatsTimeUnitsEnum ) => (
        ( time === 1 )
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

            {createTable( {
                body: [
                    [
                        <span className={statsNote}>
                            <Translate id="lessonStatsTime" />
                        </span>,
                        <React.Fragment>
                            { renderTime( hours, getUnitId( hours, Hours ) ) }
                            { renderTime( minutes, getUnitId( minutes, Minutes ) ) }
                            { renderTime( seconds, getUnitId( seconds, Seconds ) ) }
                        </React.Fragment>,
                    ],
                    [
                        <Tooltip title={getTranslation( props.localize, 'lessonStatsAccuracyNote' )}>
                            <span className={statsNote}>
                                <Translate id="lessonStatsAccuracy" />
                                <sup>*</sup>
                            </span>
                        </Tooltip>,
                        <React.Fragment>{ accuracy }</React.Fragment>
                    ],
                    [
                        <Tooltip title={getTranslation( props.localize, 'lessonStatsRealAccuracyNote' )}>
                            <span className={statsNote}>
                                <Translate id="lessonStatsRealAccuracy" />
                                <sup>*</sup>
                            </span>
                        </Tooltip>,
                        <React.Fragment>{ realAccuracy }</React.Fragment>
                    ],
                    [
                        <Tooltip title={getTranslation( props.localize, 'lessonStatsWPMNote' )}>
                            <span className={statsNote}>
                                <Translate id="lessonStatsWPM" />
                                <sup>*</sup>
                            </span>
                        </Tooltip>,
                        <React.Fragment>{ WPM }</React.Fragment>
                    ]
                ]
            } )}
        </Paper>
    );
};

export default withStyles( styles )( withTable( StatsComponent ) );
