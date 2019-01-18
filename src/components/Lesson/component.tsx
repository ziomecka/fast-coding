import * as React from 'react';

import { LESSON_TIME_INTERVAL } from './constants';
import LessonButtons from '@components/LessonButtons/';
import LessonComparator from '@components/LessonComparator/';
import { LessonProps } from './container';
import LessonStats from '@components/LessonStats/';
import Paper from '@material-ui/core/Paper';
import { Translate } from 'react-localize-redux';
import Typography from '@material-ui/core/Typography';

import { getSeconds } from '@shared/convert.time';
import getTranslation from '@shared/get.translation';
import styles from './styles';
import withStyles from '@material-ui/core/styles/withStyles';

/** Running time is calculate internally and kept in internal state.
 *  Could be got from LessonStats but it affects negatively the performance.
 */
interface LessonComponentState {
    time: string;
}

class LessonComponent extends React.Component<LessonProps, LessonComponentState> {
    style: React.CSSProperties;
    private interval: null | number | NodeJS.Timer;
    private _interval: number;
    getSeconds: ( time: number ) => string;
    constructor( props ) {
        super( props );
        this.onDrop = this.onDrop.bind( this );

        this.interval = 0;
        this._interval = LESSON_TIME_INTERVAL;
        this.getSeconds = getSeconds;

        this.state = { time: this.time() };

        this.backForwardButton = this.backForwardButton.bind( this );
        this.time = this.time.bind( this );
    }

    async componentDidMount() {
        this.props.registerOnDrop( this.onDrop );

        /** if new lesson loaded */
        if ( this.props.lessonText ) {
            this.props.keepState();
        } else {
            this.props.restoreState();
        }

        /** If back or forward button is pressed redirect the user to the same lesson */
        this.props.history.push( location.href );
        window.onpopstate = this.backForwardButton;
    }

    time() {
        const { props: { start, time, ended } } = this;

        /** Check start because it may have not bee set by lessonStats i.e. may equal 0 */
        let _time = !ended && start
            ? Date.now() - start + time
            : time;

        return this.getSeconds( _time );
    }

    backForwardButton( e: PopStateEvent ): any {
        this.props.history.go( 1 );
        this.props.startLeaving();
    }

    _setInterval() {
        const { _interval, time } = this;
        this.interval = setInterval( () => {
            this.setState( () => ( { time: time() } )
            );},
        _interval );
    }

    stopTime() {
        clearInterval( this.interval as number );
        this.setState( { time: this.time() } );
    }

    componentDidUpdate( prevProps ) {
        const { running, ended } = this.props;
        const { running: prevRunning, ended: prevEnded } = prevProps;

        /** Calculate time only if timer is running */
        if ( running !== prevRunning ) {
            if ( running ) {
                this._setInterval();
            } else {
                this.stopTime();
            }
        }

        /** Needed for refreshing page e.g. pressing F5 */
        if ( ended !== prevEnded ) {
            this.stopTime();
        }
    }

    componentWillUnmount() {
        /** no matter if running or not, cheaper than checking */
        this.props.reset();
        this.props.deregisterOnDrop( this.onDrop );

        /** stop internal interval for showing time */
        this.stopTime();

        window.onpopstate = null;
    }

    onDrop ( e: React.DragEvent<HTMLElement> ) {
        e.preventDefault();
        const { clientX, clientY } = e;
        this.props.onMoveLesonButtons( clientY, clientX );
    }

    /** Display after time:
     *  either a pseudoElement with content 'paused' or 'ended' or
     * nothing
     * Depneding on lessonStats state
     * */
    get timeAfterText() {
        /** LessonStats state */
        const { props: { ended, running } } = this;

        return (
            ended
                ? { aftertext: getTranslation( this.props.localize, 'lessonEnded' ) }
                : !running
                    ? { aftertext: getTranslation( this.props.localize, 'lessonPaused' ) }
                    : null
        );
    }

    render() {
        const {
            props: {
                started,
                classes: { paperClass, inviteClass, timeClass }
            },
            state: { time }
        } = this;

        return (
            <React.Fragment>
                <Paper className={paperClass}>
                    <Typography variant="h3" className={inviteClass}>
                        { !started
                            ? <Translate id="lessonInvite" />
                            : (
                                <span className={ timeClass } { ...this.timeAfterText } >
                                    <Translate id="lessonTime" /> { time }
                                </span>
                            )
                        }
                    </Typography>

                    <LessonComparator />
                </Paper>
                <LessonButtons />
                <LessonStats />
            </React.Fragment>
        );
    }
}

export default withStyles( styles )( LessonComponent );
