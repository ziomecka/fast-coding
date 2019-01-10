import { createStyles } from '@material-ui/core/styles';

import {
    NAV_HEIGHT_MD,
    NAV_HEIGHT_LG,
    PAPER_PADDING_MAX_XS,
    PAPER_PADDING_MAX_MD,
    PAPER_PADDING_MAX_LG,
    FOOTER_HEIGHT_LG,
    FOOTER_HEIGHT_MD,
    WELCOME_HEADING_OTHER_XS
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
            padding: `${ NAV_HEIGHT_MD } ${ PAPER_PADDING_MAX_XS }`,
            backgroundColor: defaultBackground,
            height: 'auto',
            overflow: 'hidden',
            [ theme.breakpoints.up('sm') ]: {
                padding: `${ NAV_HEIGHT_MD } ${ PAPER_PADDING_MAX_MD }`,
            },
            [ theme.breakpoints.up('lg') ]: {
                padding: `${ NAV_HEIGHT_LG } ${ PAPER_PADDING_MAX_LG }`,
            }
        },
        contentBoxHome: {
            backgroundColor: mainBackground,
            height: '100vh',
            paddingBottom: 0,
            [ theme.breakpoints.up('md') ]: {
                height: '0',
                padding: '0',
                overflow: 'hidden'
            }
        },
        contentBoxOther: {
            paddingBottom: FOOTER_HEIGHT_MD,
            minHeight: 'calc(100vh)',
            [ theme.breakpoints.up('lg') ]: {
                paddingBottom: FOOTER_HEIGHT_LG
            }
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