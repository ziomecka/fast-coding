import { CONTENT_PADDING_TOP } from '../../constants';

const styles = () => ({
    contentBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        maxWidth: '100%', // do not allow to increase size if draggable moved outside
        paddingTop: CONTENT_PADDING_TOP,
        overflow: 'hidden'
    },
    contentBoxHome: {
        height: '0',
        padding: '0',
        overflow: 'hidden'
    },
    contentBoxOther: {
        boxSizing: 'border-box',
        display: 'flex',
        minHeight: 'calc(100vh)'
    }
});

export default styles;