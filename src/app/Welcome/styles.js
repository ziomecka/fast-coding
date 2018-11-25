import {
    WELCOME_HEIGHT,
    NAV_HEIGHT,
    TITLE_TRANSITION,
    WELCOME_ZINDEX
} from '../../constants';

const styles = theme => ({
    welcomePaper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'fixed',
        top: `${NAV_HEIGHT}px`,
        width: '100%',
        backgroundColor: theme.palette.primary.main,
        transition: `height ${TITLE_TRANSITION}s ease-out, font-size ${TITLE_TRANSITION}s ease-out, color ${TITLE_TRANSITION / 4}s ease-out`,
        zIndex: WELCOME_ZINDEX,
        borderRadius: 0
    },
    welcomeHome: {
        height: '100%',
        fontSize: theme.typography.pxToRem(30)
    },
    welcomeOther: {
        // minHeight: `${NAV_HEIGHT * 3}px`,
        height: `${WELCOME_HEIGHT}px`,
        fontSize: theme.typography.pxToRem(16),
        color: theme.palette.secondary.main,
        boxSizing: 'border-box',
        paddingBottom: 0,
        paddingTop: 0,
        paddingTop: 0
    },
    welcomeButton: {
        backgroundColor: theme.palette.secondary.main
    },
    fallingLetters: {
        position: 'relative',
    }
})


export default styles;