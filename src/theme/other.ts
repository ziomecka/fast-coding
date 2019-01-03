import {
    NAV_LEFT,
    NAV_TOP,
    PAPER_PADDING_MD,
    PAPER_PADDING_MAX_MD,
    ELEVATION
} from '@constantsStyles';

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
            padding: 0,
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
            text: {
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
                padding: PAPER_PADDING_MD
            }
        },
        MuiExpansionPanelSummary: {
            root: {
                ...flexColumn
            },
            expanded: {
                ...flexColumn,
                width: '100%',
                '&:hover': {
                    cursor: 'auto !important'
                },
            },
            content: {
                marginTop: 0,
                '&$expanded': {
                    marginTop: 0
                }
            }
        },
        MuiExpansionPanelDetails: {
            root: { flexWrap: 'wrap', justifyContent: 'flex-start' }
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
                padding: `0 ${ PAPER_PADDING_MAX_MD }`,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                ...flexRowJustifyFlexEndAlignCenter,
                position: "fixed",
                top: NAV_TOP,
                left: NAV_LEFT,
                height: '100%',
                width: "100%",
            }
        },
        MuiDialog: {
            container: {
                width: "100%"
            },
            paper: {
                padding: PAPER_PADDING_MD
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