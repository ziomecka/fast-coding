import { createStyles } from '@material-ui/core/styles';

import {
    NAV_HEIGHT_MD,
    NAV_HEIGHT_LG,
    PAPER_PADDING_MAX_MD,
    PAPER_PADDING_MAX_LG,
    PAPER_PADDING_MD,
    PAPER_PADDING_LG,
    LINE_HEIGHT,
    FOOTER_HEIGHT_LG,
    FOOTER_HEIGHT_MD
} from '@constantsStyles';

const styles = createStyles(theme => {
    const {
        palette: {
                background: { default: defaultBackground },
                primary: { main: mainBackground }
        },
        typography: {
            h2: { fontSize: WELCOME_HEADING_OTHER }
        }
    } = theme;

    return {
        contentBox: {
            position: 'relative',
            width: '100%',
            maxWidth: '100%', // do not allow to increase size if draggable moved outside
            padding: `${ NAV_HEIGHT_MD } ${ PAPER_PADDING_MAX_MD }`,
            paddingBottom: FOOTER_HEIGHT_MD,
            backgroundColor: mainBackground,
            height: '100vh',
            [ theme.breakpoints.up('md') ]: {
                height: 'auto',
                backgroundColor: defaultBackground,
                overflow: 'hidden'
            },
            [ theme.breakpoints.up('lg') ]: {
                padding: `${ NAV_HEIGHT_LG } ${ PAPER_PADDING_MAX_LG }`,
                paddingBottom: FOOTER_HEIGHT_LG
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
            fontSize: WELCOME_HEADING_OTHER_XS,
            [theme.breakpoints.up('sm')]: {
                fontSize: WELCOME_HEADING_OTHER,
            },
            position: 'relative',
            display: 'block',
            width: '100%',
            left: 0,
            margin: `1em 0`,
            whiteSpace: 'pre-line'
        }
    };
});

export default styles;