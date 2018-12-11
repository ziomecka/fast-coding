import * as React from 'react';
import { LessonProps } from './container';

import Comparator from './Comparator/container';
import LessonButtons from './LessonButtons/container';
import Stats from './Stats/container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { Translate } from 'react-localize-redux';
import getTranslation from '../../shared/get.translation';

import { getSeconds } from '../../shared/convert.time';

import { LESSON_TIME_INTERVAL } from '../../constants';

/** Running time is calculate internally and kept in internal state.
 *  Could be got from Stats but it affects negatively the performance.
 */
interface LessonComponentState {
    time: string;
};

class LessonComponent extends React.Component<LessonProps, LessonComponentState> {
    style: React.CSSProperties;
    private interval: null | number | NodeJS.Timer;
    private _interval: number;
    getSeconds: (time: number) => string;
    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);

        this.interval = 0;
        this._interval = LESSON_TIME_INTERVAL;
        this.getSeconds = getSeconds;

        this.state = { time: this.time() };

        this.backForwardButton = this.backForwardButton.bind(this);
        this.time = this.time.bind(this);
    }

    async componentDidMount() {
        this.props.registerOnDrop(this.onDrop);

        /** if new lesson loaded */
        if (this.props.lessonText) {
            this.props.keepState();
        } else {
            this.props.restoreState();
        }

        /** If back or forward button is pressed redirect the user to the same lesson */
        this.props.history.push(location.href);
        window.onpopstate = this.backForwardButton;
    }

    time() {
        const { props: { start, time, ended }} = this;

        /** Check start because it may have not bee set by stats i.e. may equal 0 */
        let _time = !ended && start
            ? Date.now() - start + time
            : time;

        return this.getSeconds(_time);
    }

    backForwardButton(e: PopStateEvent): any {
        this.props.history.go(1);
        this.props.startLeaving();
    }

    _setInterval() {
        const { _interval, time } = this;
        this.interval = setInterval(() => {
            this.setState(() => ({ time: time() })
            )},
        _interval);
    }

    stopTime() {
        clearInterval(this.interval as number);
        this.setState({ time: this.time() });
    }

    componentDidUpdate(prevProps) {
        const { running, ended } = this.props;
        const { running: prevRunning } = prevProps;

        /** Calculate time only if timer is running */
        if (running !== prevRunning ) {
            if (running) {
                this._setInterval();
            } else {
                if (!ended) {
                    this._clearInterval();
                } else {
                    this.stopTime();
                }
            }
        }
    }

    componentWillUnmount() {
        /** no matter if running or not, cheaper than checking */
        this.props.reset();
        this.props.deregisterOnDrop(this.onDrop);

        /** stop internal interval for showing time */
        this.stopTime();
    }

    onDrop (e: React.DragEvent<HTMLElement>) {
        e.preventDefault();
        const { clientX, clientY } = e;
        this.props.onMoveLesonButtons(clientY, clientX);
    }

    /** Display after time:
     *  either a pseudoElement with content 'paused' or 'ended' or
     * nothing
     * Depneding on stats state
     * */
    get timeAfterText() {
        /** Stats state */
        const { props: { ended, running } } = this;

        return (
            ended
                ? { aftertext: getTranslation(this.props.localize, 'lessonEnded') }
                : !running
                    ? { aftertext: getTranslation(this.props.localize, 'lessonPaused') }
                    : null
        );
    }

    render() {
        const {
            props: {
                ended,
                started,
                classes: { lessonPaper, lessonInvite, lessonTime }
            },
            state: { time }
        } = this;

        return (
            <>
                <Paper className={lessonPaper}>
                    <Typography variant="h3" className={lessonInvite}>
                        { !started
                            ? <Translate id="lessonInvite" />
                            : (
                                <span className={ lessonTime } { ...this.timeAfterText } >
                                    <Translate id="lessonTime" /> { time }
                                </span>
                            )
                        }
                    </Typography>

                    <Comparator />
                </Paper>

                <LessonButtons />

                { ended && <Stats /> }
            </>
        );
    }
}

export default withStyles(styles)(LessonComponent);