import {
    COLOR_SUCCESS,
    COLOR_CORRECTED,
    LESSON_MAX_WIDTH
} from '../../../../constants';

const styles = theme => ({
    comparatorTextAreaPaper: {
        maxWidth: `${LESSON_MAX_WIDTH}px`
    },
    comparatorTextAreaFont: {
        boxSizing: 'border-box',
        display: 'inline-block',
        margin: '.1em',
        minWidth: '1em',
        fontSize: '4em',
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