import * as React from 'react';

import { LessonButtonsProps } from './container';

import { INITIAL_STATE } from './_duck/reducers';
import { AppRoutesEnum } from '@appTypes';

import ButtonWithHint from '@app/ButtonWithHint/';

/** Materials */
import Button, { ButtonProps } from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import DragHandle from '@material-ui/icons/DragHandle';
import Clear from '@material-ui/icons/Clear';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import getTranslation from '@shared/get.translation';

const LessonButtonsComponent: React.StatelessComponent<LessonButtonsProps> = props => {
    const {
        ended,
        dialogOpened,
        started,
        paused,
        restartLesson,
        history,
        classes,
        top,
        left,
        draggable,
        turnOnDraggable,
        turnOffDraggable,
        resetLessonButtons,
        startLeaving,
        pauseLesson,
        unpauseLesson
    } = props;

    const { lessons } = AppRoutesEnum;

    const {
        buttonClass,
        dragHandleClass,
        menuClass,
        menuDraggedClass
    } = classes;

    const INITIAL_TOP = INITIAL_STATE.top;
    const INITIAL_LEFT = INITIAL_STATE.left;
    const INITIAL_WIDTH = '100%';

    const isMoved = ( top !== INITIAL_TOP || left !== INITIAL_LEFT );

    const leaveLesson = () => history.push( lessons );


    const justType = getTranslation( props.localize, 'lessonButtonsJustType' );
    const press = getTranslation( props.localize, 'buttonsPress' );

    const commonProps = {
        variant: 'contained',
        color: 'primary',
    } as ButtonProps;

    const buttonStartLeaving = (
        <ButtonWithHint
            buttonProps={{
                ...commonProps,
                onClick: startLeaving,
                className: buttonClass
            }}
            // @ts-ignore
            aftertext={`${press} ESC`}
            translationId="lessonButtonsLeave"
        />
    );

    const buttonPause = (
        <ButtonWithHint
            buttonProps={{
                ...commonProps,
                onClick: pauseLesson,
                className: buttonClass
            }}
            translationId="lessonButtonsPause"
        />
    );

    const buttonUnpause = (
        <ButtonWithHint
            buttonProps={{
                ...commonProps,
                onClick: unpauseLesson,
                className: buttonClass,
            }}
            // @ts-ignore
            aftertext={justType}
            translationId="lessonButtonsUnpause"
        />
    );

    const buttonLeave = (
        <ButtonWithHint
            buttonProps={{
                ...commonProps,
                onClick: leaveLesson,
                className: buttonClass,
            }}
            // @ts-ignore
            aftertext={`${press} ESC`}
            translationId="lessonButtonsLeave"
        />
    );

    const buttonRestart = (
        <ButtonWithHint
            buttonProps={{
                ...commonProps,
                onClick: restartLesson,
                className: buttonClass
            }}
            // @ts-ignore
            aftertext={`${press} Enter`}
            translationId="lessonButtonsRestart"
        />
    );

    /**
     * button cancel placed to the left - to encourage to press
     */
    const buttonsWhenRunning = (
        <React.Fragment> { buttonStartLeaving } { buttonPause } </React.Fragment>
    );

    const buttonsWhenNotStarted = (
        <React.Fragment> { buttonLeave } </React.Fragment>
    );

    const buttonsWhenPaused = (
        <React.Fragment> { buttonStartLeaving } { buttonUnpause } </React.Fragment>
    );

    const buttonsWhenEnded = (
        <React.Fragment> { buttonLeave } { buttonRestart } </React.Fragment>
    );

    const getButtons = (): JSX.Element => {
        if ( !started && !ended ) {
            return buttonsWhenNotStarted;
        }

        if ( started && ended ) {
            return buttonsWhenEnded;
        }

        if ( !paused ) {
            return buttonsWhenRunning;
        }

        return buttonsWhenPaused;

    };

    /** Render only if dialog is not opened */
    return ( !dialogOpened &&
        <Paper
            className={`${menuClass} ${isMoved ? menuDraggedClass : '' }`}
            draggable={draggable}
            style={ {
                top,
                left,
                width: isMoved ? 'auto' : INITIAL_WIDTH,
                flexDirection: isMoved ? 'column' : 'row'
            }}
        >
            {/* Lesson's buttons */}
            <React.Fragment>
                { getButtons() }
            </React.Fragment>

            {/* Buttons for managing draggable menu */}
            {/* Available only if lesson is not started or has been ended */}
            {
                ( !started || ended ) && (
                    <div className={dragHandleClass}>
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
                )
            }
        </Paper>
    );
};

export default withStyles( styles )( LessonButtonsComponent );
