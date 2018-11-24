import { NAV_HEIGHT } from '../../constants';

const styles = () => ({
    contentBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        paddingTop: NAV_HEIGHT * 2
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