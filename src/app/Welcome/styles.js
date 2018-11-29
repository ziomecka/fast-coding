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
        height: `${WELCOME_HEIGHT}px`,
        fontSize: theme.typography.pxToRem(16),
        color: theme.palette.text.primary,
        boxSizing: 'border-box',
        paddingBottom: 0,
        paddingTop: 0,
        paddingTop: 0
    },
    welcomeHeading: {
        whiteSpace: 'nowrap'
    },
    welcomeButton: {
        margin: `${theme.spacing.unit} ${theme.spacing.unit} ${theme.spacing.unit} 0`,
    },
    fallingLetters: {
        position: 'relative',
    },
    welcomeButtonMain: {
        backgroundColor: theme.palette.secondary.main
    },
    welcomeHeadingWrapper: {
        position: 'relative'
    },
    welcomeHomeSubMenu: {
        position: 'absolute',
        left: 0,
        display: 'inline-block',
        width: '430px',
        height: '100%',
        padding: 0,
        color: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: 'inherit'
        }
    }
});

export default styles;