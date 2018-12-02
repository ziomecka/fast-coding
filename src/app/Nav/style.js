import {
    NAV_HEIGHT,
    NAV_WELCOME_GO_UP
} from '../../constants';

const style = theme => {
    const {
        transitions: {
            duration: { complex },
            easing: { easeOut }
        },
    } = theme;

    return {
        navClass: {
            transition: `${theme.transitions.create(
                ['top' ], { duration: complex * NAV_WELCOME_GO_UP, easing: easeOut})}`
        },
        navLessonClass: {
            top: `-${NAV_HEIGHT}px`
        }
    }
};

export default style;