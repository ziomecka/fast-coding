import {
    NAV_HEIGHT,
    NAV_LEFT,
    NAV_TOP
} from '../constants';

import {
    flexColumn,
    flexColumnJustifyFlexStartAlignCenter,
    flexColumnJustifySpaceBetween,
    flexRowJustifyCenterAlignCenter,
    flexRowJustifyFlexEnd,
    flexRowJustifyFlexEndAlignCenter
} from './flexes';

export default {
    typography: {
        useNextVariants: true
    },
    props: {
        MuiAppBar: {
            height: NAV_HEIGHT,
            elevation: 0
        },
        MuiPaper:{
            elevation: 0
        },
        MuiExpansionPanel: {
            elevation: 0
        },
        MuiExpansionPanelSummary: {
            elevation: 0
        }
    },
    overrides: {
        MuiExpansionPanelSummary: {
            ...flexColumn,
            expanded: { ...flexColumn }
        },
        MuiExpansionPanelDetails: {
            root: { flexWrap: 'wrap' }
        },
        MuiToolbar: {
            root: { ...flexRowJustifyFlexEnd }
        },
        MuiPaper: {
            root: {
                ...flexColumnJustifyFlexStartAlignCenter,
                padding: "4em",
                boxSizing: 'border-box'
            }
        },
        MuiSnackbarContent: {
            message: { ...flexRowJustifyCenterAlignCenter }
        },
        MuiAppBar: {
            /** props: display, position, top, left, width are not needed, but
             *  included in case changes in material design
             *  */
            root: {
                boxSizing: "border-box",
                flexDirection: "row", // needed to override column
                ...flexRowJustifyFlexEndAlignCenter,
                position: "fixed",
                top: NAV_TOP,
                left: NAV_LEFT,
                height: `${NAV_HEIGHT}px`,
                maxHeight: `${NAV_HEIGHT}px`,
                width: "100%"
            }
        },
        MuiDialogContent: {
            root: { ... flexColumnJustifySpaceBetween }
        },
        MuiDialogContentText: {
            root: {
                width: "100%"
            }
        },
        MuiDialogActions: {
            root: { ...flexRowJustifyFlexEndAlignCenter }
        },
        MuiSvgIcon: {
            root: {
                fontSize: 'inherit'
            }
        }
    }
};