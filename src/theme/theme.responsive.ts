import theme from './theme';

import {
    PAPER_PADDING_XS,
    PAPER_PADDING_MD,
    PAPER_PADDING_LG,
    PAPER_PADDING_MAX_XS,
    PAPER_PADDING_MAX_MD,
    PAPER_PADDING_MAX_LG,
    FONT_SIZE,
    NAV_HEIGHT_MD,
    NAV_HEIGHT_LG
} from './constants';

/** MuiMenu */
/** Make padding larger for lg and xlg */
theme.overrides.MuiMenu.paper = {
    ...theme.overrides.MuiMenu.paper,
    padding: PAPER_PADDING_XS,
    [theme.breakpoints.up('sm')]: {
        padding: PAPER_PADDING_MD,
    },
    [theme.breakpoints.up('lg')]: {
        padding: PAPER_PADDING_LG
    }
};

/** MuiAppBar */
theme.overrides.MuiAppBar.root = {
    ...theme.overrides.MuiAppBar.root,
    height: `${ NAV_HEIGHT_MD }px`,
    padding: `0 ${ PAPER_PADDING_MAX_XS }`,
    [ theme.breakpoints.up('sm') ]: {
        padding: `0 ${ PAPER_PADDING_MAX_MD }`,
    },
    [ theme.breakpoints.up('md') ]: {
        flexDirection: 'row'
    },
    [ theme.breakpoints.up('lg') ]: {
        padding: `0 ${ PAPER_PADDING_MAX_LG }`,
        height: `${ NAV_HEIGHT_LG }px`
    }
};

/** Dialog */
/** Make padding larger for lg and xlg */
theme.overrides.MuiDialog.paper = {
    ...theme.overrides.MuiDialog.paper,
    padding: PAPER_PADDING_XS,
    [theme.breakpoints.up('sm')]: {
        padding: PAPER_PADDING_MD,
    },
    [theme.breakpoints.up('lg')]: {
        padding: PAPER_PADDING_LG
    }
};

export default theme;
