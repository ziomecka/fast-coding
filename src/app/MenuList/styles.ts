import { createStyles } from '@material-ui/core/styles';
import menuIconClass from '@app/AppMenu/menu.icon.class';

import {
    NAV_MAXWIDTH,
    PAPER_PADDING_LG,
    PAPER_PADDING_MAX_MD
} from '@constantsStyles';

const style = createStyles( theme => {
    const {
        palette: { grey: { 200: menuBackgroundColor }},
        typography: {
            h4: { fontSize: fontSizeMenuItem }
        }
    } = theme;

    return {
        ...menuIconClass( theme ),
        menuClass: {
            maxWidth: `${ NAV_MAXWIDTH }px`,
            backgroundColor: menuBackgroundColor
        },
        menuItemClass: {
            boxSizing: 'border-box',
            width: '100%',
            fontSize: fontSizeMenuItem,
            letterSpacing: '0.1em',
            padding: PAPER_PADDING_LG,
            [ theme.breakpoints.up( 'sm' ) ]: {
                padding: PAPER_PADDING_MAX_MD
            }
        }
    };
} );

export default style;
