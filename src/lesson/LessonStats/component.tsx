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

class LessonStatsComponent extends React.Component<LessonStatsProps> {
    constructor ( props ) {
        super ( props );
    }

    get totalTime (): { hours: number, minutes: number, seconds: number } {
        return getTime( this.props.stop - this.props.start + this.props.time );
    }

    get accuracy (): number {
        return Math.round( 100 - 100 * ( this.props.errors.length / this.props.text.length ) );
    }


    get realAccuracy (): number {
        return Math.round( 100 - 100 * ( this.props.allErrors.length / this.props.text.length ) );
    }

    get WPM (): number {
        const { minutes, seconds } = this.totalTime;
        return Math.round( this.props.text.length / LESSON_STATS_AVERAGE_WORD_LENGTH / ( minutes + seconds / 60 ) );
    }

    renderTime ( time: number, id: string ): JSX.Element {
        return time > 0 && (
            <React.Fragment>
                { time }&nbsp;
                <Translate {...{ id }} />&nbsp;
            </React.Fragment>
        );
    }

    getUnitId ( time: number, unit: LessonStatsTimeUnitsEnum ) {
        return ( time === 1 )
            ? `lessonLessonStatsUnit${ unit }_1`
            : ( time < 5 )
                ? `lessonLessonStatsUnit${ unit }_4`
                : `lessonLessonStatsUnit${ unit }_more`;
    }

    render () {
        const {
            props: {
                classes: { paperClass, noteClass },
                createTable,
                ended,
            },
            totalTime: { hours, minutes, seconds },
            WPM
        } = this;


        return ended && (
            <Paper className={ paperClass } id="lessonLessonStats">
                <Typography variant="h4">
                    <Translate id="lessonLessonStatsHeading" />
                </Typography>

                {createTable( {
                    body: [
                        [
                            <span className={ noteClass }>
                                <Translate id="lessonLessonStatsTime" />
                            </span>,
                            <React.Fragment>
                                { this.renderTime( hours, this.getUnitId( hours, Hours ) ) }
                                { this.renderTime( minutes, this.getUnitId( minutes, Minutes ) ) }
                                { this.renderTime( seconds, this.getUnitId( seconds, Seconds ) ) }
                            </React.Fragment>,
                        ],
                        [
                            <Tooltip title={ getTranslation( this.props.localize, 'lessonLessonStatsAccuracyNote' ) }>
                                <span className={ noteClass }>
                                    <Translate id="lessonLessonStatsAccuracy" />
                                    <sup>*</sup>
                                </span>
                            </Tooltip>,
                            <React.Fragment>{ this.accuracy } %</React.Fragment>
                        ],
                        [
                            <Tooltip title={ getTranslation( this.props.localize, 'lessonLessonStatsRealAccuracyNote' ) }>
                                <span className={ noteClass }>
                                    <Translate id="lessonLessonStatsRealAccuracy" />
                                    <sup>*</sup>
                                </span>
                            </Tooltip>,
                            <React.Fragment>{ this.realAccuracy } %</React.Fragment>
                        ],
                        [
                            <Tooltip title={ getTranslation( this.props.localize, 'lessonLessonStatsWPMNote' ) }>
                                <span className={ noteClass }>
                                    <Translate id="lessonLessonStatsWPM" />
                                    <sup>*</sup>
                                </span>
                            </Tooltip>,
                            <React.Fragment>{ Number.isFinite( WPM ) ? WPM : '-' }</React.Fragment>
                        ]
                    ]
                } )}
            </Paper>
        );
    }
}

export default withStyles( styles )( withTable( LessonStatsComponent ) );
