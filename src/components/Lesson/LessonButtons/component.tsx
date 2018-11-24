import * as React from 'react';

import { LessonButtonsProps } from './container';

/** Materials */
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const LessonButtonsComponent: React.StatelessComponent<LessonButtonsProps> = props => {
    const {
        ended,
        openDialog,
        closeDialog,
        started,
        restartLesson,
        history,
        resetLesson
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
            >
                Leave
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={restartLesson}
            >
                Restart
            </Button>
        </>
    );

    return (
        <Paper className="flex-row flex-row-center-h flex-row-center-v">
            { ( !started && !ended ) && buttonsWhenNotStarted }
            { ( started && !ended ) && buttonsWhenRunning }
            { ( started && ended ) && buttonsWhenEnded }
        </Paper>
    );
};

export default LessonButtonsComponent;
