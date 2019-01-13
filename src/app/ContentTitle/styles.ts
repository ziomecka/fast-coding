import { createStyles } from '@material-ui/core/styles';

import {
    WELCOME_HEADING_OTHER_XS
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
        }
    };
} );

export default styles;
