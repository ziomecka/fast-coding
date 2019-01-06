import { createStyles } from '@material-ui/core/styles';
import {
    PAPER_PADDING_MD,
    PAPER_PADDING_LG,
    PAPER_PADDING_MAX_MD,
    PAPER_PADDING_MAX_LG
} from '@constantsStyles';

import {
    FOOTER_HEIGHT_MD,
    FOOTER_HEIGHT_LG,
} from './constants.styles';

const styles = createStyles( theme => {
    const {
        palette: {
            grey: { [ 100 ]: backgroundColor },
            primary: {
                // light: backgroundColor,
                textColor: endColor
            }
        },
        transitions: {
            duration: { complex },
        }
    } = theme;

    return {
        footerPaper: {
            position: 'fixed',
            bottom: 0,
            width: '100%',
            paddingTop: PAPER_PADDING_MD,
            height: FOOTER_HEIGHT_MD,
            [ theme.breakpoints.up('lg') ]: {
                height: FOOTER_HEIGHT_LG,
                paddingTop: PAPER_PADDING_LG
            },
        },
        footerGrid: {
            height: '100%',
            width: '100%',
            overflow: 'hidden',
            backgroundColor
        },
        footerColumnItem: {
            flex: '0 0 50%',
            height: '100%',
            backgroundColor: 'inherit'
        },
        footerColumnContainer: {
            height: '100%',
            padding: `${ PAPER_PADDING_MD } ${ PAPER_PADDING_MAX_MD }`,
            [ theme.breakpoints.up('lg') ]: {
                padding: `${ PAPER_PADDING_LG } ${ PAPER_PADDING_MAX_LG }`
            },
            backgroundColor: 'inherit'
        }
    };
});

export default styles;