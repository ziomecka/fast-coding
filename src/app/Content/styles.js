import { CONTENT_PADDING_TOP, PAPER_PADDING_MAX } from '../../constants';

const styles = theme => {
    const {
        palette: {
                background: { default: defaultBackground }
        },
        typography: {
            h4: { fontSize: titleFontSize }
        }
    } = theme;

    return {
        contentBox: {
            position: 'relative',
            width: '100%',
            maxWidth: '100%', // do not allow to increase size if draggable moved outside
            padding: `${CONTENT_PADDING_TOP} ${PAPER_PADDING_MAX}`,
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
        },
        contentTitle: {
            position: 'relative',
            display: 'block',
            width: '100%',
            left: 0,
            fontSize: titleFontSize,
            margin: `1em 0`
        }
    };
};

export default styles;