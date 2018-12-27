import theme from './theme';

import {
    PAPER_PADDING_LG,
    PAPER_PADDING_MAX_LG
} from './constants';

theme.overrides.MuiTypography = {
    h1: {
        [theme.breakpoints.down('md')]: {
            fontSize: '2rem'
        }
    },
    h2: {
        [theme.breakpoints.down('md')]: {
            fontSize: '1.75rem'
        }
    },
    h3: {
        [theme.breakpoints.down('md')]: {
            fontSize: '1.5rem'
        }
    },
    h4: {

        [theme.breakpoints.down('md')]: {
            fontSize: '1.25rem'
        }
    }
};

/** MuiMenu */
/** Make padding larger for lg and xlg */
theme.overrides.MuiMenu.paper = {
    ...theme.overrides.MuiMenu.paper,
    [theme.breakpoints.up('md')]: {
        padding: PAPER_PADDING_LG
    }
};

/** MuiAppBar */
/** Make padding larger for lg and xlg */
theme.overrides.MuiAppBar.root = {
    ...theme.overrides.MuiAppBar.root,
    [theme.breakpoints.up('md')]: {
        padding: PAPER_PADDING_MAX_LG
    }
};

/** Dialog */
/** Make padding larger for lg and xlg */
theme.overrides.MuiDialog.paper = {
    ...theme.overrides.MuiDialog.paper,
    [theme.breakpoints.up('md')]: {
        padding: PAPER_PADDING_LG
    }
};

export default theme;
