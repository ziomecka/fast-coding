import { createStyles } from '@material-ui/core/styles';

import {
    NAV_HEIGHT_MD,
    NAV_HEIGHT_LG,
    PAPER_PADDING_MAX_MD,
    PAPER_PADDING_MAX_LG
} from '@constantsStyles';

const styles = createStyles(theme => {
    const {
        palette: {
                background: { default: defaultBackground },
                primary: { main: mainBackground }
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
            padding: `${ NAV_HEIGHT_MD } ${ PAPER_PADDING_MAX_MD }`,
            backgroundColor: mainBackground,
            height: '100vh',
            [ theme.breakpoints.up('md') ]: {
                height: 'auto',
                backgroundColor: defaultBackground,
                overflow: 'hidden'
            },
            [ theme.breakpoints.up('lg') ]: {
                padding: `${ NAV_HEIGHT_LG } ${ PAPER_PADDING_MAX_LG }`
            }
        },
        contentBoxHome: {
            [ theme.breakpoints.up('md') ]: {
                height: '0',
                padding: '0',
                overflow: 'hidden'
            }
        },
        contentBoxOther: {
            minHeight: 'calc(100vh)'
        },
        contentTitle: {
            [ theme.breakpoints.down('md') ]: {
                display: 'none'
            },
            position: 'relative',
            display: 'block',
            width: '100%',
            left: 0,
            fontSize: titleFontSize,
            margin: `1em 0`
        }
    };
});

export default styles;