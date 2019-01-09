import { createStyles } from '@material-ui/core/styles';
import { NAV_MAXWIDTH, PAPER_PADDING_MAX_MD } from '@constantsStyles';
import menuIconClass from '../AppMenu/menu.icon.class';

const style = createStyles(theme => {
    const {
        palette: { grey: { 200: menuBackgroundColor }},
        typography: {
            h4: { fontSize: fontSizeMenuItem }
        }
    } = theme;

    return {
        menuClass: {
            maxWidth: `${ NAV_MAXWIDTH }px`,
            backgroundColor: menuBackgroundColor
        },
        menuItemClass: {
            boxSizing: 'border-box',
            width: '100%',
            fontSize: fontSizeMenuItem,
            letterSpacing: '0.1em',
            padding: PAPER_PADDING_MAX_MD
        }
    };
});

export default style;