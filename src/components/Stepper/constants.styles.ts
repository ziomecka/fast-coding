export {
    COURSE_NUMBER_OF_ROWS_DISPLAYED,
    COURSE_BACKGROUND_GREY
} from '@constantsStyles';

// margins have to be zero - so the hidden step is not visible below the icon
export const STEP_XS = 40;
export const STEP_SM = 90;
export const STEP_PADDING = 10;

// 4 icons + 0 range labels = 4
export const STEPPER_WIDTH_XS = STEP_XS * 4;
// 4 icons + 1 range labels = 5
export const STEPPER_WIDTH_SM = STEP_SM * 1 + STEP_SM * 4;

/** I do not do breakpoints because no range label displayed on xs
 *  CAREFUL!
 */
export const MOVE = STEP_SM;
export const LEFT = MOVE;
// export const LEFT = ICON_WIDTH - ( STEP_WIDTH - ICON_WIDTH );

export const ANIMATION_DURATION = 200;

export const STEPPER_HEIGHT = 40;