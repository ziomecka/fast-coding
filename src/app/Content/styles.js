import { CONTENT_PADDING_TOP } from '../../constants';

const styles = theme => {
    const {  palette: { background: { default: defaultBackground }}} = theme;

    return {
        contentBox: {
            position: 'relative',
            width: '100%',
            maxWidth: '100%', // do not allow to increase size if draggable moved outside
            paddingTop: CONTENT_PADDING_TOP,
            overflow: 'hidden',
            backgroundColor: defaultBackground
        },
        contentBoxHome: {
            height: '0',
            padding: '0',
            overflow: 'hidden'
        },
        contentBoxOther: {
            minHeight: 'calc(100vh)'
        }
    };
};

export default styles;