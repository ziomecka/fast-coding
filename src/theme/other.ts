import {
    NAV_HEIGHT,
    NAV_LEFT,
    NAV_TOP
} from '../constants';

export default {
    typography: {
        useNextVariants: true
    },
    props: {
        MuiAppBar: {
            height: NAV_HEIGHT,
            elevation: 0
        },
        MuiPaper: {
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
        MuiPaper: {
            root: {
                padding: "4em",
                boxSizing: 'border-box'
            }
        },
        MuiAppBar: {
            /** props: display, position, top, left, width are not needed, but
             *  included in case changes in material design
             *  */
            root: {
                boxSizing: "border-box",
                padding: "1em",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "flex-end",
                position: "fixed",
                top: NAV_TOP,
                left: NAV_LEFT,
                height: `${NAV_HEIGHT}px`,
                maxHeight: `${NAV_HEIGHT}px`,
                width: "100%"
            }
        },
        MuiDialogContent: {
            root: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }
        },
        MuiDialogContentText: {
            root: {
                width: "100%"
            }
        },
        MuiDialogActions: {
            root: {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end"
            }
        },
        MuiSvgIcon: {
            root: {
                fontSize: 'inherit'
            }
        }
    }
};