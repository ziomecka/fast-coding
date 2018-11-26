import {
    COLOR_SUCCESS,
    COLOR_CORRECTED,
    LESSON_MAX_WIDTH,
    LESSON_FONT_SIZE_REM,
    LESSON_PARAGRAPH_SIZE_REM
} from '../../../../constants';

const styles = theme => ({
    comparatorTextAreaPaper: {
        maxWidth: `${LESSON_MAX_WIDTH}px`,
        overflow: 'hidden',
        paddingTop: '2em'
    },
    comparatorTextAreaPaperShort: {
        overflow: 'hidden',
        boxSizing: 'border-box',
        padding: `${LESSON_FONT_SIZE_REM}rem 0`,
        display: 'flex',
        maxHeight: '15rem',
        alignItems: 'center',
        margin: 0
    },
    comparatorTextAreaParagraph: {
        height: `${LESSON_PARAGRAPH_SIZE_REM}rem`,
        overflow: 'visible',
        margin: 0,
        padding: 0
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