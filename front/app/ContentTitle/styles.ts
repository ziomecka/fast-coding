import { createStyles } from '@material-ui/core/styles';

import {
    WELCOME_HEADING_OTHER_XS,
    PAPER_PADDING_LG,
    PAPER_PADDING_MD,
    PAPER_PADDING_XS
} from '@constantsStyles';

const styles = createStyles( theme => {
    const {
        typography: {
            h2: { fontSize: WELCOME_HEADING_OTHER }
        }
    } = theme;

    return {
        contentTitle: {
            fontSize: WELCOME_HEADING_OTHER_XS,
            [ theme.breakpoints.up( 'sm' ) ]: {
                fontSize: WELCOME_HEADING_OTHER,
            },
            position: 'relative',
            display: 'block',
            width: '100%',
            left: 0,
            margin: '1em 0',
            whiteSpace: 'pre-line',
            lineHeight: '1.1em'
        },
        contentTitleLesson: {
            marginTop: PAPER_PADDING_XS,
            [ theme.breakpoints.up( 'sm' ) ]: {
                marginTop: PAPER_PADDING_MD
            },
            [ theme.breakpoints.up( 'lg' ) ]: {
                marginTop: PAPER_PADDING_LG
            }
        }
    };
} );

export default styles;
