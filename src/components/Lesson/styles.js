import { COLOR_HINTS } from '../../constants';

const styles = () => ({
    lessonPaper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        boxSizing: 'border-box'
    },
    lessonInvite: {
        whiteSpace: 'pre',
        color: COLOR_HINTS,
        fontWeight: 600,
        padding: 0,
        margin: 0
    }
});

export default styles;