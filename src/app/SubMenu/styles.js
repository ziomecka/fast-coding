import { NAV_HEIGHT, NAV_MAXWIDTH } from '@constants';

const style = theme => {
    const {
        palette: { grey: { 200: menuBackgroundColor }},
        typography: {
            h3: { fontSize: fontSizeMenuIcon },
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
        menuIconClass: {
            fontSize: fontSizeMenuIcon
        },
        menuItemClass: {
            boxSizing: 'border-box',
            width: '100%',
            fontSize: fontSizeMenuItem,
            letterSpacing: '0.1em',
            padding: '1.5rem',
        }
    };
};

export default style;