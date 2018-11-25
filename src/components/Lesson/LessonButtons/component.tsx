import * as React from 'react';

import { LessonButtonsProps } from './container';

import { INITIAL_STATE } from './_duck/reducers';

/** Materials */
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import DragHandle from '@material-ui/icons/DragHandle';
import Clear from '@material-ui/icons/Clear';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';

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
        left,
        draggable,
        turnOnDraggable,
        turnOffDraggable,
        resetLessonButtons
    } = props;

    const INITIAL_TOP = INITIAL_STATE.top;
    const INITIAL_LEFT = INITIAL_STATE.left;
    const INITIAL_WIDTH = 'calc(100vw - 2em * 4)';

    const isMoved = (top !== INITIAL_TOP || left !== INITIAL_LEFT);

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
                value="Leave"
            >
                Leave
            </Button>
        </>
    );

    /**
     * button cancel placed to the left - to encourage to press
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
                value="Restart"
            >
                Restart
            </Button>
        </>
    );

    return (
        <Paper
            className={classes.lessonButtonsMenu}
            draggable={draggable}
            style={ {
                top,
                left,
                width: isMoved? 'auto' : INITIAL_WIDTH,
                flexDirection: isMoved? 'column' : 'row'
            }}
        >
            {/* Lesson's buttons */}
            { ( !started && !ended ) && buttonsWhenNotStarted }
            { ( started && !ended ) && buttonsWhenRunning }
            { ( started && ended ) && buttonsWhenEnded }

            {/* Buttons for managing draggable menu */}
            <div className={classes.lessonButtonsDragHandle}>
                <Button
                    title="You can drag me"
                    onMouseEnter={turnOnDraggable}
                    onMouseLeave={turnOffDraggable}
                >
                    <TouchRipple />
                    <DragHandle />
                </Button>

                {/* Display clear button only if the menu has been moved */}
                {isMoved && (
                    <Button
                        title="Reset menu"
                        onClick={resetLessonButtons}
                    >
                        <TouchRipple />
                        <Clear />
                    </Button>
                )}
            </div>
        </Paper>
    );
};

export default withStyles(styles)(LessonButtonsComponent);
