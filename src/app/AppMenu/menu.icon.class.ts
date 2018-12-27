import { FONT_SIZE_MD } from './constants.styles';

const style = theme => {
    const {
        typography: {
            h3: { fontSize: fontSizeMenuIcon },
        }
    } = theme;

    return {
        menuIconClass: {
            position: 'relative',
            [theme.breakpoints.down('lg')]: {
                fontSize: FONT_SIZE_MD
            },
            [theme.breakpoints.up('lg')]: {
                fontSize: fontSizeMenuIcon
            }
        }
    };
};

export default style;