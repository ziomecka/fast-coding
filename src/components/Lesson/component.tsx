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

        this.state = { time: '00 : 00' };

        this.interval = 0;
        this._interval = 500;
        this.getSeconds = getSeconds;
    }

    async componentDidMount() {
        this.props.registerOnDrop(this.onDrop);

        /** if new lesson loaded */
        if (this.props.lessonText) {
            this.props.keepState();
        } else {
            let answer = await this.props.restoreState();
            if (answer && this.props.running && !this.props.ended) {
                this._setInterval();
                answer = null;
            }
        }

    }

    _setInterval() {
        const { _interval, props: { start, time }} = this;

        this.interval = setInterval(() => {
            this.setState(() => ({ time: this.getSeconds(Date.now() - start + time) })
            )}, _interval);
        }

        _clearInterval() {
            clearInterval(this.interval as number);
        }

        stopTime() {
            this._clearInterval();
            this.setState({ time: '00 : 00' });
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