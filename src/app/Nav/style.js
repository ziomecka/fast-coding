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
        },
        navLogin: {
            position: 'absolute',
            '&:after': {
                display: 'block',
                content: "attr(login)",
                fontSize: '1rem'
            }
        }
    }
};

export default style;