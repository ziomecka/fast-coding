import {
    COLOR_SUCCESS,
    COLOR_CORRECTED,
    LESSON_MAX_WIDTH,
    LESSON_FONT_SIZE_REM,
    LESSON_PARAGRAPH_SIZE_REM
} from '@constantsStyles';

const styles = theme => ({
    comparatorTextAreaPaper: {
        maxWidth: `${LESSON_MAX_WIDTH}px`,
        overflow: 'hidden',
        paddingTop: '2em'
    },
    comparatorTextAreaPaperShort: {
        overflow: 'hidden',
        padding: `${LESSON_FONT_SIZE_REM}rem 0`,
        maxHeight: '15rem',
        alignItems: 'center',
        margin: 0
    },
    comparatorTextAreaParagraph: {
        height: `${LESSON_PARAGRAPH_SIZE_REM}rem`,
        overflow: 'visible',
        margin: 0,
        padding: 0,
        textAlign: 'center'
    },
    comparatorTextAreaParagraphInvite: {
        '& > span:nth-child(1)': {
            position: 'relative',
        },
        '& > span:nth-child(1):before': {
            content: "' '",
            display: 'inline-block',
            width: '100%',
            position: 'absolute',
            bottom: '-2px',
            left: '0px',
            height: '1px',
            animation: `invite .4s infinite alternate`
        }
    },
    '@global': {
        '@keyframes invite': {
            '0%': {
                borderBottom: `1px solid ${theme.palette.primary.main}`
            },
            '100%': {
                borderBottom: `3px solid ${theme.palette.secondary.main}`
            }
        }
    },
    comparatorTextAreaFont: {
        boxSizing: 'border-box',
        display: 'inline-block',
        margin: '.1em',
        minWidth: '1em',
        fontSize:  theme.typography.display3.fontSize,
        whiteSpace: 'pre',
        textAlign: 'center',
        border: `1px solid ${theme.palette.primary.main}`
    },
    comparatorTextAreaFontCorrect: {
        backgroundColor: COLOR_SUCCESS
    },
    comparatorTextAreaFontError: {
        backgroundColor: theme.palette.secondary.veryLight
    },
    comparatorTextAreaFontCorrected: {
        backgroundColor: COLOR_CORRECTED
    },
});

export default styles;