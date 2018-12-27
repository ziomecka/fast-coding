import theme from './theme';

import { PAPER_PADDING_NOT_DESKTOP, PAPER_PADDING_MAX_NOT_DESKTOP } from '../constants';

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
/** Make padding smaller for 'not desktop' */
theme.overrides.MuiMenu.paper = {
    ...theme.overrides.MuiMenu.paper,
    [theme.breakpoints.down('md')]: {
        padding: PAPER_PADDING_NOT_DESKTOP
    }
};

/** MuiAppBar */
/** Make padding smaller for 'not desktop' */
theme.overrides.MuiAppBar.root = {
    ...theme.overrides.MuiAppBar.root,
    [theme.breakpoints.down('md')]: {
        padding: PAPER_PADDING_MAX_NOT_DESKTOP
    }
};

/** Dialog */
/** Make padding smaller for 'not desktop' */
theme.overrides.MuiDialog.paper = {
    ...theme.overrides.MuiDialog.paper,
    [theme.breakpoints.down('md')]: {
        padding: PAPER_PADDING_NOT_DESKTOP
    }
};

export default theme;
