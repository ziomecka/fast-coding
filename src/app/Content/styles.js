import { CONTENT_PADDING_TOP } from '../../constants';

const styles = () => ({
    contentBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        paddingTop: CONTENT_PADDING_TOP
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