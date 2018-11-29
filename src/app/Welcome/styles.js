import {
    WELCOME_HEIGHT,
    NAV_HEIGHT
} from '../../constants';

const styles = theme => {
    let {
        palette: {
            primary: { main: mainPrimary },
            secondary: { main: mainSecondary, contrastText: contrastTextSecondary },
            text: { primary: textPrimary }
        },
        transitions: {
            duration: { complex, shorter },
            easing: { easeOut }
        },
        zIndex: { modal: zIndexModal },
        spacing: { unit: spacingUnit }
    } = theme;

    return {
        welcomePaper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            position: 'fixed',
            top: `${NAV_HEIGHT}px`,
            width: '100%',
            backgroundColor: mainPrimary,
            transition: `${theme.transitions.create(
                ['height', 'font-size' ], { duration: complex, easing: easeOut },
            )}, ${theme.transitions.create([ 'color' ], { duration: shorter, easing: easeOut })}`,
            zIndex: zIndexModal,
            borderRadius: 0
        },
        welcomeHome: {
            height: '100%',
            fontSize: theme.typography.pxToRem(30)
        },
        welcomeOther: {
            height: `${WELCOME_HEIGHT}px`,
            fontSize: theme.typography.pxToRem(16),
            color: textPrimary,
            boxSizing: 'border-box',
            paddingBottom: 0,
            paddingTop: 0,
            paddingTop: 0
        },
        welcomeHeading: {
            color: textPrimary,
            transition: theme.transitions.create(['color'], {duration: theme.transitions.duration.enteringScreen, easing: theme.transitions.easing.easeOut}),
        },
        welcomeHeadingOther: {
            whiteSpace: 'nowrap',
            fontSize: theme.typography.display2.fontSize,
            color: contrastTextSecondary
        },
        welcomeButton: {
            margin: `${spacingUnit} ${spacingUnit * 2} ${spacingUnit} 0`,
        },
        fallingLetters: {
            position: 'relative',
        },
        welcomeButtonMain: {
            backgroundColor: mainSecondary
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
            color: mainPrimary,
            '&:hover': {
                backgroundColor: 'inherit'
            }
        }
    };
};

export default styles;