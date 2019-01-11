import {
    FONT_SIZE,
    FONT_WEIGHT,
    FONT_WEIGHT_BOLD,
    FONT_WEIGHT_LIGHT,
    LINE_HEIGHT,
    LINE_HEIGHT_H,
    MEDIA_DESKTOP_LG,
    MEDIA_DESKTOP_MD,
    MEDIA_DESKTOP_SM,
    MEDIA_DESKTOP_XL,
    MEDIA_DESKTOP_XS,
} from './constants';

const {
    FONT_SIZE_h1,
    FONT_SIZE_h2,
    FONT_SIZE_h3,
    FONT_SIZE_h4,
    FONT_SIZE_h5,
    FONT_SIZE_h6
} = FONT_SIZE;

const palette = {
    'breakpoints': {
      'keys': ['xs', 'sm', 'md', 'lg', 'xl'],
      'values': {
          'xs': MEDIA_DESKTOP_XS,
          'lg': MEDIA_DESKTOP_LG,
          'sm': MEDIA_DESKTOP_SM,
          'xl': MEDIA_DESKTOP_XL,
          'md': MEDIA_DESKTOP_MD
        }
    },
    'mixins': {
      'toolbar': {
        'minHeight': 56,
        '@media (min-width:0px) and (orientation: landscape)': {
          'minHeight': 48
        },
        '@media (min-width:600px)': { 'minHeight': 64 }
      }
    },
    'shadows': [
      'none',
      '0px 1px 3px 0px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
      '0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
      '0px 1px 8px 0px rgba(0, 0, 0, 0.2),0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 3px 3px -2px rgba(0, 0, 0, 0.12)',
      '0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
      '0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0, 0, 0, 0.12)',
      '0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
      '0px 4px 5px -2px rgba(0, 0, 0, 0.2),0px 7px 10px 1px rgba(0, 0, 0, 0.14),0px 2px 16px 1px rgba(0, 0, 0, 0.12)',
      '0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
      '0px 5px 6px -3px rgba(0, 0, 0, 0.2),0px 9px 12px 1px rgba(0, 0, 0, 0.14),0px 3px 16px 2px rgba(0, 0, 0, 0.12)',
      '0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0, 0, 0, 0.12)',
      '0px 6px 7px -4px rgba(0, 0, 0, 0.2),0px 11px 15px 1px rgba(0, 0, 0, 0.14),0px 4px 20px 3px rgba(0, 0, 0, 0.12)',
      '0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0, 0, 0, 0.12)',
      '0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 13px 19px 2px rgba(0, 0, 0, 0.14),0px 5px 24px 4px rgba(0, 0, 0, 0.12)',
      '0px 7px 9px -4px rgba(0, 0, 0, 0.2),0px 14px 21px 2px rgba(0, 0, 0, 0.14),0px 5px 26px 4px rgba(0, 0, 0, 0.12)',
      '0px 8px 9px -5px rgba(0, 0, 0, 0.2),0px 15px 22px 2px rgba(0, 0, 0, 0.14),0px 6px 28px 5px rgba(0, 0, 0, 0.12)',
      '0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0, 0, 0, 0.12)',
      '0px 8px 11px -5px rgba(0, 0, 0, 0.2),0px 17px 26px 2px rgba(0, 0, 0, 0.14),0px 6px 32px 5px rgba(0, 0, 0, 0.12)',
      '0px 9px 11px -5px rgba(0, 0, 0, 0.2),0px 18px 28px 2px rgba(0, 0, 0, 0.14),0px 7px 34px 6px rgba(0, 0, 0, 0.12)',
      '0px 9px 12px -6px rgba(0, 0, 0, 0.2),0px 19px 29px 2px rgba(0, 0, 0, 0.14),0px 7px 36px 6px rgba(0, 0, 0, 0.12)',
      '0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 20px 31px 3px rgba(0, 0, 0, 0.14),0px 8px 38px 7px rgba(0, 0, 0, 0.12)',
      '0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 21px 33px 3px rgba(0, 0, 0, 0.14),0px 8px 40px 7px rgba(0, 0, 0, 0.12)',
      '0px 10px 14px -6px rgba(0, 0, 0, 0.2),0px 22px 35px 3px rgba(0, 0, 0, 0.14),0px 8px 42px 7px rgba(0, 0, 0, 0.12)',
      '0px 11px 14px -7px rgba(0, 0, 0, 0.2),0px 23px 36px 3px rgba(0, 0, 0, 0.14),0px 9px 44px 8px rgba(0, 0, 0, 0.12)',
      '0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0, 0, 0, 0.12)'
    ],
    'direction': 'ltr',
    'overrides': {},
    'transitions': {
      'easing': {
        'easeInOut': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'easeOut': 'cubic-bezier(0.0, 0, 0.2, 1)',
        'easeIn': 'cubic-bezier(0.4, 0, 1, 1)',
        'sharp': 'cubic-bezier(0.4, 0, 0.6, 1)'
      },
      'duration': {
        'standard': 300,
        'short': 250,
        'enteringScreen': 225,
        'shorter': 200,
        'leavingScreen': 195,
        'shortest': 150,
        'complex': 375
    }
},
'typography': {
    'useNextVariants': true,
    'fontSize': 18,
    'lineHeight': LINE_HEIGHT,
    'fontWeightMedium': FONT_WEIGHT_BOLD,
      'h1': {
        'fontSize': FONT_SIZE_h1,
        'lineHeight': LINE_HEIGHT_H,
        'letterSpacing': '-.02em'
      },
      'h2': {
        'fontSize': FONT_SIZE_h2,
        'lineHeight': LINE_HEIGHT_H,
        'letterSpacing': '-.02em',
      },
      'h3': {
        'fontSize': FONT_SIZE_h3,
        'lineHeight': LINE_HEIGHT_H,
        'letterSpacing': '-.02em',
      },
      'h4': {
        'fontSize': FONT_SIZE_h4,
        'lineHeight': LINE_HEIGHT,
        'fontWeight': FONT_WEIGHT,
        'letterSpacing': '-.02em',
    },
    'h5': {
        'fontSize': FONT_SIZE_h5,
        'lineHeight': LINE_HEIGHT,
        'letterSpacing': '-.02em'
    },
    'h6': {
        'fontSize': FONT_SIZE_h6,
        'lineHeight': LINE_HEIGHT,
        'fontWeight': FONT_WEIGHT
      },
      'headline': {
        'color': 'rgba(0, 0, 0, 0.87)',
        'fontFamily': '"Roboto", "Helvetica", "Arial", sans-serif',
        'lineHeight': LINE_HEIGHT,
        'fontSize': '1.5em',
        'fontWeight': FONT_WEIGHT_LIGHT
      },
      'display2': {
        'marginLeft': '-.02em',
        'color': 'rgba(0, 0, 0, 0.54)',
        'fontFamily': '"Roboto", "Helvetica", "Arial", sans-serif',
        'lineHeight': LINE_HEIGHT,
        'fontSize': '2.8125em',
        'fontWeight': FONT_WEIGHT_LIGHT
      },
      'fontWeightLight': 300,
      'display3': {
        'marginLeft': '-.02em',
        'color': 'rgba(0, 0, 0, 0.54)',
        'fontFamily': '"Roboto", "Helvetica", "Arial", sans-serif',
        'letterSpacing': '-.02em',
        'lineHeight': LINE_HEIGHT,
        'fontSize': '3.5em',
        'fontWeight': FONT_WEIGHT_LIGHT
      },
      'display4': {
        'marginLeft': '-.04em',
        'color': 'rgba(0, 0, 0, 0.54)',
        'fontFamily': '"Roboto", "Helvetica", "Arial", sans-serif',
        'letterSpacing': '-.04em',
        'lineHeight': LINE_HEIGHT,
        'fontSize': '7em',
        'fontWeight': 300
      },
      'fontWeightRegular': FONT_WEIGHT_LIGHT,
      'display1': {
        'color': 'rgba(0, 0, 0, 0.54)',
        'fontFamily': '"Roboto", "Helvetica", "Arial", sans-serif',
        'lineHeight': LINE_HEIGHT,
        'fontSize': '2.125em',
        'fontWeight': FONT_WEIGHT_LIGHT
      },
      'button': {
        'textTransform': 'none',
        'color': 'rgba(0, 0, 0, 0.87)',
        'fontFamily': '"Roboto", "Helvetica", "Arial", sans-serif',
        'fontSize': '1.1em',
        'lineHeight': '1.3em',
        'letterSpacing': '-.1px',
        'fontWeight': FONT_WEIGHT
      },
      'fontFamily': '"Roboto", "Helvetica", "Arial", sans-serif',
      'body2': {
        'color': 'rgba(0, 0, 0, 0.87)',
        'fontFamily': '"Roboto", "Helvetica", "Arial", sans-serif',
        'lineHeight': LINE_HEIGHT,
        'fontSize': '0.875em',
        'fontWeight': FONT_WEIGHT
      },
      'caption': {
        'color': 'rgba(0, 0, 0, 0.54)',
        'fontFamily': '"Roboto", "Helvetica", "Arial", sans-serif',
        'lineHeight': LINE_HEIGHT,
        'fontSize': '0.75em',
        'fontWeight': FONT_WEIGHT_LIGHT
      },
      'title': {
        'color': 'rgba(0, 0, 0, 0.87)',
        'fontFamily': '"Roboto", "Helvetica", "Arial", sans-serif',
        'lineHeight': LINE_HEIGHT,
        'fontSize': '1.3125em',
        'fontWeight': FONT_WEIGHT
      },
      'subheading': {
        'color': 'rgba(0, 0, 0, 0.87)',
        'fontFamily': '"Roboto", "Helvetica", "Arial", sans-serif',
        'lineHeight': LINE_HEIGHT,
        'fontSize': '1em',
        'fontWeight': FONT_WEIGHT_LIGHT
      },
      'body1': {
        'color': 'rgba(0, 0, 0, 0.87)',
        'fontFamily': '"Roboto", "Helvetica", "Arial", sans-serif',
        'lineHeight': LINE_HEIGHT,
        'fontSize': '0.875em',
        'fontWeight': FONT_WEIGHT_LIGHT
      }
    },
    'zIndex': {
      'modal': 1300,
      'snackbar': 1400,
      'drawer': 1200,
      'appBar': 1100,
      'mobileStepper': 1000,
      'tooltip': 1500
    },
    'shape': { 'borderRadius': 4 },
    'props': {},
    'spacing': { 'unit': 8 },
    'palette': {
      'tonalOffset': 0.2,
      'background': {
        'paper': '#fafafa',
        'default': '#fafafa'
      },
      'contrastThreshold': 3,
      'grey': {
        '50': '#fafafa',
        '100': '#f5f5f5',
        '200': '#eeeeee',
        '300': '#e0e0e0',
        '400': '#bdbdbd',
        '500': '#9e9e9e',
        '600': '#757575',
        '700': '#616161',
        '800': '#424242',
        '900': '#212121',
        'A700': '#616161',
        'A100': '#d5d5d5',
        'A400': '#303030',
        'A200': '#aaaaaa'
      },
      'text': {
        'primary': 'rgba(0, 0, 0, 0.87)',
        'secondary': 'rgba(0, 0, 0, 0.54)',
        'disabled': 'rgba(0, 0, 0, 0.38)',
        'hint': 'rgba(0, 0, 0, 0.38)'
      },
      'divider': 'rgba(0, 0, 0, 0.12)',
      'secondary': {
        'main': '#E65100',
        'veryLight': 'rgb(241, 160, 115)',
        'light': 'rgb(235, 115, 51)',
        'dark': 'rgb(161, 56, 0)',
        'contrastText': '#fafafa'
      },
      'common': { 'black': '#000', 'white': '#fff' },
      'error': {
        'light': '#e57373',
        'main': '#f44336',
        'dark': '#d32f2f',
        'contrastText': '#fff'
      },
      'type': 'light',
      'action': {
        'hoverOpacity': 0.08,
        'hover': 'rgba(0, 0, 0, 0.08)',
        'selected': 'rgba(0, 0, 0, 0.14)',
        'disabledBackground': 'rgba(0, 0, 0, 0.12)',
        'disabled': 'rgba(0, 0, 0, 0.26)',
        'active': 'rgba(0, 0, 0, 0.54)'
      },
      'primary': {
        'main': '#757575',
        'light': 'rgb(144, 144, 144)',
        'dark': 'rgb(81, 81, 81)',
        'contrastText': '#fafafa'
      }
    },
    'themeName': 'Boulder Trinidad Lion'
};

export default palette;
