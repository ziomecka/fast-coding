import { COLOR_SUCCESS, COLOR_CORRECTED } from '../../../../constants';

const styles = theme => ({
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