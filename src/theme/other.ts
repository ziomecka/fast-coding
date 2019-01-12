import {
    ELEVATION,
    FONT_SIZE,
    LINE_HEIGHT,
    LINE_HEIGHT_H,
    NAV_LEFT,
    NAV_TOP,
    PAPER_PADDING_MAX_XS,
    PAPER_PADDING_XS,
} from '@constantsStyles';

const {
    FONT_SIZE_h1,
    FONT_SIZE_h2,
    FONT_SIZE_h3,
    FONT_SIZE_h4,
    FONT_SIZE_h5,
    FONT_SIZE_h6
} = FONT_SIZE;

import {
    flexColumn,
    flexColumnJustifyFlexStartAlignCenter,
    flexColumnJustifySpaceBetween,
    flexRowJustifyCenterAlignCenter,
    flexRowJustifyFlexEnd,
    flexRowJustifyFlexEndAlignCenter
} from './flexes';

const { palette: {
    error : { main : errorColor },
    text: { disabled }
} } = require( './palette' ).default;

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
        MuiTypography: {
            h1: {
                fontSize: FONT_SIZE_h1,
                lineHeight: LINE_HEIGHT_H
            },
            h2: {
                fontSize: FONT_SIZE_h2,
                lineHeight: LINE_HEIGHT_H
            },
            h3: {
                fontSize: FONT_SIZE_h3,
                lineHeight: LINE_HEIGHT_H
            },
            h4: {
                fontSize: FONT_SIZE_h4,
                lineHeight: LINE_HEIGHT
            },
            h5: {
                fontSize: FONT_SIZE_h5,
                lineHeight: LINE_HEIGHT
            },
            h6: {
                fontSize: FONT_SIZE_h6,
                lineHeight: LINE_HEIGHT
            }
        },
        MuiTooltip: {
            tooltip: {
                fontSize: '1em',
                padding: '.5rem'
            }
        },
        MuiMenu: {
            paper: {
                padding: PAPER_PADDING_XS
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
                boxSizing: 'border-box',
                padding: `0 ${ PAPER_PADDING_MAX_XS }`,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                ...flexRowJustifyFlexEndAlignCenter,
                position: 'fixed',
                top: NAV_TOP,
                left: NAV_LEFT,
                height: '100%',
                width: '100%',
            }
        },
        MuiDialog: {
            container: {
                width: '100%'
            },
            paper: {
                padding: PAPER_PADDING_XS
            }
        },
        MuiDialogContent: {
            root: { ... flexColumnJustifySpaceBetween }
        },
        MuiDialogContentText: {
            root: {
                width: '100%'
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
        },
        MuiIconButton: {
            root: {
                '&$disabled': {
                    color: disabled // used in Stepper
                }
            }
        }
    }
};
