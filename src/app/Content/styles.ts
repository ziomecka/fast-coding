import { createStyles } from '@material-ui/core/styles';

import {
    NAV_HEIGHT_MD,
    NAV_HEIGHT_LG,
    PAPER_PADDING_MAX_XS,
    PAPER_PADDING_MAX_MD,
    PAPER_PADDING_MAX_LG,
    FOOTER_HEIGHT_LG,
    FOOTER_HEIGHT_MD
} from '@constantsStyles';

const styles = createStyles( theme => {
    const {
        palette: {
            background: { default: defaultBackground },
            primary: { main: mainBackground }
        }
    } = theme;

    return {
        boxClass: {
            position: 'relative',
            width: '100%',
            maxWidth: '100%', // do not allow to increase size if draggable moved outside
            padding: `${ NAV_HEIGHT_MD } ${ PAPER_PADDING_MAX_XS }`,
            backgroundColor: defaultBackground,
            height: 'auto',
            overflow: 'hidden',
            [ theme.breakpoints.up( 'sm' ) ]: {
                padding: `${ NAV_HEIGHT_MD } ${ PAPER_PADDING_MAX_MD }`,
            },
            [ theme.breakpoints.up( 'lg' ) ]: {
                padding: `${ NAV_HEIGHT_LG } ${ PAPER_PADDING_MAX_LG }`,
            }
        },
        boxHomeClass: {
            backgroundColor: mainBackground,
            height: '100vh',
            paddingBottom: 0,
            [ theme.breakpoints.up( 'md' ) ]: {
                height: '0',
                padding: '0',
                overflow: 'hidden'
            }
        },
        boxLessonClass: {
            paddingTop: PAPER_PADDING_MAX_XS,
            [ theme.breakpoints.up( 'sm' ) ]: {
                paddingTop: `${ PAPER_PADDING_MAX_MD }`,
            },
            [ theme.breakpoints.up( 'lg' ) ]: {
                paddingTop: `${ PAPER_PADDING_MAX_LG }`,
            }
        },
        boxOtherClass: {
            paddingBottom: FOOTER_HEIGHT_MD,
            minHeight: 'calc(100vh)',
            paddingTop: NAV_HEIGHT_MD,
            [ theme.breakpoints.up( 'lg' ) ]: {
                paddingTop: NAV_HEIGHT_LG,
                paddingBottom: FOOTER_HEIGHT_LG
            }
        }
    };
} );

export default styles;
