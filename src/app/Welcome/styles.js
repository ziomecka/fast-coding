const TITLE_TRANSITION = 0.7;

const styles = (theme) => ({
    welcomePaper: {
        display: 'flex',
        flexDirection: 'c',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'fixed',
        top: '60px',
        width: '100%',
        backgroundColor: theme.palette.primary.main,
        transition: `height ${TITLE_TRANSITION}s ease-out, font-size ${TITLE_TRANSITION}s ease-out, color ${TITLE_TRANSITION / 4}s ease-out`,
    },
    welcomeHome: {
        height: '100%',
        fontSize: theme.typography.pxToRem(30)
    },
    welcomeOther: {
        height: '60px',
        fontSize: theme.typography.pxToRem(16),
        color: theme.palette.secondary.main
    },
    welcomeHeading: {

    },
    welcomeButton: {
        backgroundColor: theme.palette.secondary.main
    },
    fallingLetters: {
        position: 'relative',
        color: '#000000'
    }
})


export default styles;