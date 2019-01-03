import theme from './theme';

import {
    PAPER_PADDING_MD,
    PAPER_PADDING_LG,
    PAPER_PADDING_MAX_MD,
    PAPER_PADDING_MAX_LG,
    FONT_SIZE,
    NAV_HEIGHT_MD,
    NAV_HEIGHT_LG
} from './constants';

const getFontSizes = heading => (
    ['xs', 'sm', 'md'].reduce((acc, cv) => {
        acc[theme.breakpoints.only(cv)] = {
            fontSize: FONT_SIZE[`FONT_SIZE_${ heading }_${ cv }`],
            lineHeight: FONT_SIZE[`LINE_HEIGHT_${ heading }_${ cv }`]
        };
        return acc;
    }, {})
);

theme.overrides.MuiTypography = {
    h1: {
        ...getFontSizes('h1')
    },
    h2: {
        ...getFontSizes('h2')
    }
};

/** MuiMenu */
/** Make padding larger for lg and xlg */
theme.overrides.MuiMenu.paper = {
    ...theme.overrides.MuiMenu.paper,
    padding: PAPER_PADDING_MD,
    [theme.breakpoints.up('lg')]: {
        padding: PAPER_PADDING_LG
    }
};

/** MuiAppBar */
theme.overrides.MuiAppBar.root = {
    ...theme.overrides.MuiAppBar.root,
    maxHeight: `${ NAV_HEIGHT_MD }px`,
    padding: `0 ${ PAPER_PADDING_MAX_MD }`,
    [ theme.breakpoints.up('lg') ]: {
        padding: `0 ${ PAPER_PADDING_MAX_LG }`,
        height: `${ NAV_HEIGHT_LG }px`,
        maxHeight: `${ NAV_HEIGHT_LG }px`,
        flexDirection: 'row',
    }
};

/** Dialog */
/** Make padding larger for lg and xlg */
theme.overrides.MuiDialog.paper = {
    ...theme.overrides.MuiDialog.paper,
    padding: PAPER_PADDING_MD,
    [theme.breakpoints.up('lg')]: {
        padding: PAPER_PADDING_LG
    }
};

export default theme;
