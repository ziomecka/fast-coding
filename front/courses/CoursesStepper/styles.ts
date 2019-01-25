import { createStyles } from '@material-ui/core/styles';

import {
    STEP_XS,
    STEP_SM,
    STEP_PADDING,
    LEFT,
    MOVE,
    STEPPER_WIDTH_XS,
    STEPPER_WIDTH_SM,
    ANIMATION_DURATION,
    STEPPER_HEIGHT,
    COURSE_BACKGROUND_GREY
} from './constants.styles';

const styles = createStyles( theme => {
    const {
        palette: {
            action: { hover },
            text: { disabled },
            grey: {
                [ COURSE_BACKGROUND_GREY ]: coursesStepperBackgroundColor,
                [ 800 ]: rangeLabel
            },
            common: { black }
        },
        typography: {
            h3: { fontSize }
        },
        zIndex: { tooltip: zIndex }
    } = theme;

    return {
        coursesStepperPaper: {
            position: 'absolute',
            left: '50%',
            height: STEPPER_HEIGHT,
            bottom: 0,
            transform: 'translate(-50%, 50%)',
            backgroundColor: 'transparent',
            padding: 0,
            paddingRight: '0 !important', // paddingRight to override material design
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            width: '100%'
        },
        coursesStepper: {
            position: 'relative',
            width: STEPPER_WIDTH_XS,
            [ theme.breakpoints.up( 'sm' ) ]: {
                width: STEPPER_WIDTH_SM
            },
            padding: 0,
            overflow: 'hidden'
        },
        step: {
            display: 'inline-block',
            width: STEP_XS,
            [ theme.breakpoints.up( 'sm' ) ]: {
                width: STEP_SM
            },
            margin: 0,
            height: '100%',
            boxSizing: 'border-box',
            padding: `0 ${ STEP_PADDING }`,
            cursor: 'default',
            '& span': {
                boxSizing: 'border-box',
                display: 'inline-block',
                textAlign: 'center',
                padding: 0,
                lineHeight: `${ STEPPER_HEIGHT }px`,
                height: '100%',
                width: '100%',
                color: rangeLabel,
            }
        },
        iconDense: {
            fontSize,
            boxSizing: 'border-box',
            padding: `0 ${ STEP_PADDING }`,
            margin: 0,
            height: '100%',
            width: STEP_XS,
            [ theme.breakpoints.up( 'sm' ) ]: {
                width: STEP_SM,
                transform: 'initial',
            },
            backgroundColor: coursesStepperBackgroundColor,
            borderBottomLeftRadius: 0, // radius - overriden material design
            borderBottomRightRadius: 0, // radius - overriden material design
            borderTopRightRadius: 0, // radius - overriden material design
            borderTopLeftRadius: 0, // radius - overriden material design
            position: 'relative',
            zIndex,
            color: black,
            transform: 'rotate(90deg)',
            '& svg': {
                marginLeft: '-.4em',
                marginRight: '-.4em'
            },
            '&:hover': {
                backgroundColor: coursesStepperBackgroundColor,
            }
        },
        buttonDisabled: {
            color: disabled,
            cursor: 'default'
        },
        selectedLessonClass: {
            '& button': {
                backgroundColor: hover
            }
        },
        coursesStepperWraper: {
            display: 'flex',
            alignItems: 'flex-start',
            position: 'absolute',
            top: 0,
            transition: `left ${ ANIMATION_DURATION / 1000 }s`,
            left: LEFT,
            height: '100%'
        },
        moveRight: {
            left: MOVE * 2, // CAREFUL! see constants.styles comment
        },
        takeOffTransition: {
            transition: 'left 0s',
        },
        moveLeft: {
            left: 0
        }
    };
} );

export default styles;
