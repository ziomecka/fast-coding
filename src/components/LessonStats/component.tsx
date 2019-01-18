import * as React from 'react';

import { LessonStatsProps } from './container';

/** Materials */
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { Translate } from 'react-localize-redux';
import withTable from '@app/Table';

import { getTime } from '@shared/convert.time';
import { LessonStatsTimeUnitsEnum } from './_duck/';
import { LESSON_STATS_AVERAGE_WORD_LENGTH } from './constants';

import getTranslation from '@shared/get.translation';
const { Hours, Minutes, Seconds } = LessonStatsTimeUnitsEnum;

const LessonStatsComponent: React.StatelessComponent<LessonStatsProps> = ( props ) => {
    const { start, stop, time, allErrors, text,
        classes: { paperClass, noteClass },
        createTable,
        endedLesson,
        errors
    } = props;

    const totalTime = getTime( stop - start + time );

    const { hours, minutes, seconds } = totalTime;

    const accuracy = Math.round( 100 - 100 * ( errors.length / text.length ) );
    const realAccuracy = Math.round( 100 - 100 * ( allErrors.length / text.length ) );
    const WPM = Math.round( text.length / LESSON_STATS_AVERAGE_WORD_LENGTH / ( minutes + seconds / 60 ) );

    const renderTime = ( time: number, id: string ): JSX.Element => (
        time > 0 && (
            <React.Fragment>
                { time }&nbsp;
                <Translate {...{ id }} />&nbsp;
            </React.Fragment>
        )
    );

    const getUnitId = ( time: number, unit: LessonStatsTimeUnitsEnum ) => (
        ( time === 1 )
            ? `lessonLessonStatsUnit${unit}_1`
            : ( time < 5 )
                ? `lessonLessonStatsUnit${unit}_4`
                : `lessonLessonStatsUnit${unit}_more`
    );

    return endedLesson && (
        <Paper className={paperClass} id="lessonLessonStats">
            <Typography variant="h4">
                <Translate id="lessonLessonStatsHeading" />
            </Typography>

            {createTable( {
                body: [
                    [
                        <span className={noteClass}>
                            <Translate id="lessonLessonStatsTime" />
                        </span>,
                        <React.Fragment>
                            { renderTime( hours, getUnitId( hours, Hours ) ) }
                            { renderTime( minutes, getUnitId( minutes, Minutes ) ) }
                            { renderTime( seconds, getUnitId( seconds, Seconds ) ) }
                        </React.Fragment>,
                    ],
                    [
                        <Tooltip title={getTranslation( props.localize, 'lessonLessonStatsAccuracyNote' )}>
                            <span className={noteClass}>
                                <Translate id="lessonLessonStatsAccuracy" />
                                <sup>*</sup>
                            </span>
                        </Tooltip>,
                        <React.Fragment>{ accuracy }</React.Fragment>
                    ],
                    [
                        <Tooltip title={getTranslation( props.localize, 'lessonLessonStatsRealAccuracyNote' )}>
                            <span className={noteClass}>
                                <Translate id="lessonLessonStatsRealAccuracy" />
                                <sup>*</sup>
                            </span>
                        </Tooltip>,
                        <React.Fragment>{ realAccuracy }</React.Fragment>
                    ],
                    [
                        <Tooltip title={getTranslation( props.localize, 'lessonLessonStatsWPMNote' )}>
                            <span className={noteClass}>
                                <Translate id="lessonLessonStatsWPM" />
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

export default withStyles( styles )( withTable( LessonStatsComponent ) );
