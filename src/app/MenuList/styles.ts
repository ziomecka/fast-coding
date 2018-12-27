import { createStyles } from '@material-ui/core/styles';
import { NAV_HEIGHT, NAV_MAXWIDTH } from '@constantsStyles';
import menuIconClass from '../AppMenu/menu.icon.class';

const style = createStyles(theme => {
    const {
        palette: { grey: { 200: menuBackgroundColor }},
        typography: {
            h6: { fontSize: fontSizeMenuItem }
        }
    } = theme;

    return {
        menuClass: {
            position: 'absolute',
            top: `calc(${NAV_HEIGHT}px - 1rem) !important`,
            left: 'auto !important',
            right: '6rem !important',
            maxWidth: `${NAV_MAXWIDTH}px`,
            backgroundColor: menuBackgroundColor
        },
        ...menuIconClass(theme),
        menuItemClass: {
            boxSizing: 'border-box',
            width: '100%',
            fontSize: fontSizeMenuItem,
            letterSpacing: '0.1em',
            padding: '1.5rem',
        }
    };
});

export default style;