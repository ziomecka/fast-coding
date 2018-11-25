import * as React from 'react';

import { LessonButtonsProps } from './container';

/** Materials */
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import DragHandle from '@material-ui/icons/DragHandle';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

const LessonButtonsComponent: React.StatelessComponent<LessonButtonsProps> = props => {
    const {
        ended,
        openDialog,
        closeDialog,
        started,
        restartLesson,
        history,
        resetLesson,
        classes,
        top,
        left
    } = props;

    const dialogLeaveCallback = () => {
        closeDialog();
        leaveLesson();
        resetLesson();
    };

    const dialogCancelLeavingCallback = () => {
        closeDialog();
    };

    const leaveLesson = () => {
        history.push('/lessons');
    };

    const buttonsWhenNotStarted = (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={leaveLesson}
                className={classes.lessonButtonsButton}
            >
                Leave
            </Button>
        </>
    );

    /**
     * button cancel placed to the right - to encourage to press
     */
    const buttonsWhenRunning = (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={() => openDialog({
                    buttons: [
                        [ 'leave', dialogLeaveCallback ],
                        [ 'cancel', dialogCancelLeavingCallback, {color: "secondary"} ]
                    ],
                    title: "Do you want to leave lesson?",
                    message: "Are you sure?",
                    onClose: dialogCancelLeavingCallback
                })}
                className={classes.lessonButtonsButton}
            >
                Leave
            </Button>
        </>
    );

    const buttonsWhenEnded = (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={leaveLesson}
                className={classes.lessonButtonsButton}
            >
                Leave
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={restartLesson}
                className={classes.lessonButtonsButton}
            >
                Restart
            </Button>
        </>
    );

    return (
        <Paper
            className={classes.lessonButtonsMenu}
            draggable
            style={ { top, left }}
        >
            { ( !started && !ended ) && buttonsWhenNotStarted }
            { ( started && !ended ) && buttonsWhenRunning }
            { ( started && ended ) && buttonsWhenEnded }

            <span title="You can drag me">
                <DragHandle
                    className={classes.lessonButtonsDragHandle}
                />
            </span>
        </Paper>
    );
};

export default withStyles(styles)(LessonButtonsComponent);
