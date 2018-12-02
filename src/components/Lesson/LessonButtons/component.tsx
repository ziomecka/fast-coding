import * as React from 'react';

import { LessonButtonsProps } from './container';

import { INITIAL_STATE } from './_duck/reducers';
import { AppRoutes } from '../../../_common/';

/** Materials */
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import DragHandle from '@material-ui/icons/DragHandle';
import Clear from '@material-ui/icons/Clear';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { withLocalize, Translate } from 'react-localize-redux';

const LessonButtonsComponent: React.StatelessComponent<LessonButtonsProps> = props => {
    const {
        ended,
        started,
        restartLesson,
        history,
        classes,
        top,
        left,
        draggable,
        turnOnDraggable,
        turnOffDraggable,
        resetLessonButtons,
        startLeaving
    } = props;

    const { lessons } = AppRoutes;

    const {
        lessonButtonsButton,
        lessonButtonsDragHandle,
        lessonButtonsMenu,
        lessonButtonsMenuDragged
    } = classes;

    const INITIAL_TOP = INITIAL_STATE.top;
    const INITIAL_LEFT = INITIAL_STATE.left;
    const INITIAL_WIDTH = '100%';

    const isMoved = (top !== INITIAL_TOP || left !== INITIAL_LEFT);

    const leaveLesson = () => history.push(lessons);

    const buttonsWhenNotStarted = (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={leaveLesson}
                className={lessonButtonsButton}
                value="Leave"
            >
                <Translate id="lessonButtonsLeave" />
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
                onClick={startLeaving}
                className={lessonButtonsButton}
            >
                <Translate id="lessonButtonsLeave" />
            </Button>
        </>
    );

    const buttonsWhenEnded = (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={leaveLesson}
                className={lessonButtonsButton}
            >
                <Translate id="lessonButtonsLeave" />
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={restartLesson}
                className={lessonButtonsButton}
                value="Restart"
            >
                <Translate id="lessonButtonsRestart" />
            </Button>
        </>
    );

    return (
        <Paper
            className={`${lessonButtonsMenu} ${isMoved ? lessonButtonsMenuDragged : '' }`}
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
            <div className={lessonButtonsDragHandle}>
                <Button
                    title="Drag the buttons menu"
                    onMouseEnter={turnOnDraggable}
                    onMouseLeave={turnOffDraggable}
                >
                    <TouchRipple />
                    <DragHandle />
                </Button>

                {/* Display clear button only if the menu has been moved */}
                {isMoved && (
                    <Button
                        title="Resize the buttons menu"
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

export default withStyles(styles)(withLocalize(LessonButtonsComponent));
