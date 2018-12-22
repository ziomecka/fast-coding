import {
    NAV_HEIGHT,
    NAV_LEFT,
    NAV_TOP,
    PAPER_PADDING,
    PAPER_PADDING_MAX,
    ELEVATION
} from '@constants';

import {
    flexColumn,
    flexColumnJustifyFlexStartAlignCenter,
    flexColumnJustifySpaceBetween,
    flexRowJustifyCenterAlignCenter,
    flexRowJustifyFlexEnd,
    flexRowJustifyFlexEndAlignCenter
} from './flexes';

const { palette: { error : { main : errorColor } } } = require('./palette').default;

export default {
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
        },
        MuiMenu: {
            elevation: ELEVATION
        },
        MuiButtonBase: {
            disableRipple: false,
            disableTouchRipple: true,
            focusRipple: true,
        },
    },
    overrides: {
        MuiButton: {
            /** Lesson card buttons */
            text: {
                '&:hover': {
                    backgroundColor: 'transparent'
                },
                textTransform: 'none'
            }
        },
        MuiTooltip: {
            tooltip: {
                fontSize: '1rem',
                padding: '.5rem'
            }
        },
        MuiMenu: {
            paper: {
                padding: PAPER_PADDING
            }
        },
        MuiExpansionPanelSummary: {
            root: { ...flexColumn },
            expanded: {
                ...flexColumn,
                width: '100%',
                '&:hover': {
                    cursor: 'auto !important'
                }
            }
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
                padding: `0 ${PAPER_PADDING_MAX}`,
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
        MuiDialog: {
            container: {
                width: "100%"
            },
            paper: {
                padding: PAPER_PADDING
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
        },
        MuiTableCell: {
            body: {
                fontSize: '1.5em'
            }
        },
        MuiFormControl: {
            root: {
                margin: '1rem 0'
            }
        },
        MuiFormHelperText: {
            root: {
                color: errorColor
            }
        }
    }
};