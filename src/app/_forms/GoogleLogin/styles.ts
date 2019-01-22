import { createStyles } from '@material-ui/core/styles/';

const styles = theme => {
    const {
        palette: {
            primary: {
                main: buttonBackgroundColor,
                contrastText: color
            }
        },
        shape: { borderRadius },
        typography: {
            button: {
                textTransform,
                fontFamily,
                fontSize,
                fontWeight,
                letterSpacing,
                lineHeight,
            }
        },
    } = theme;

    const buttonShadow = theme.shadows[ 3 ];

    return createStyles( {
        firebaseClass: {
            '& ul.firebaseui-idp-list': {
                listStyle: 'none',
                padding: 0
            },
            '& .firebaseui-idp-button': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color,
                fontSize,
                fontWeight,
                fontFamily,
                letterSpacing,
                textTransform,
                lineHeight,
                backgroundColor: buttonBackgroundColor,
                boxShadow: buttonShadow,
                border: 0,
                borderRadius: `${ borderRadius }px`,
                width: '100%',
                padding: '.5rem 1rem',
                position: 'relative',
                margin: '1rem auto',
                maxHeight: '3rem',
                boxSizing: 'border-box',
                overflow: 'hidden'
            },
            '& .firebaseui-idp-icon-wrapper': {
                display: 'inline-block',
                marginRight: 5
            },
            '& .firebaseui-idp-list': {
                display: 'flex',
                justifyContent: 'space-between'
            },
            '& .firebaseui-idp-icon': {
                marginRight: '10px ',
                height: '100%',
                width: 'auto'
            },
            [ theme.breakpoints.only( 'xs' ) ]: {
                '& .firebaseui-idp-button': {
                    width: 'calc(100% - 1rem)', // -1rem for left /right margin
                },
                '& .firebaseui-idp-text-short': {
                    display: 'block',
                },
                '& .firebaseui-idp-text-long': {
                    display: 'none',
                },
                '& .firebaseui-list-item': {
                    width: '50%',
                    '&:nth-child(1)': {
                        '& button': {
                            marginLeft: 0
                        }
                    },
                    '&:nth-child(2)': {
                        '& button': {
                            marginRight: 0
                        }
                    },
                },
                '& .firebaseui-idp-icon-wrapper': {
                    height: '1em', // needed for Firefox, in Chrome 32px by user.agent,
                },
            },
            [ theme.breakpoints.up( 'sm' ) ]: {
                '& .firebaseui-idp-button': {
                    width: '100%',
                },
                '& .firebaseui-idp-text-short': {
                    display: 'none',
                },
                '& .firebaseui-idp-text-long': {
                    display: 'block',
                },
                '& .firebaseui-idp-list': {
                    flexDirection: 'column',
                    justifyContent: 'flex-start'
                },
                '& .firebaseui-list-item': {
                    width: '100%'
                },
                '& .firebaseui-idp-icon-wrapper': {
                    height: '1.5em' // needed for Firefox, in Chrome 32px by user.agent
                },
            },
            // Terms of service and privacy policy information
            '& .firebaseui-tos': {
                color: buttonBackgroundColor,
                fontSize: '.9em',
                font: 'inherit',
                textAlign: 'center'
            },
            '& .firebaseui-link, .firebaseui-tos-link, .firebaseui-pp-link': {
                textDecoration: 'underline'
            }
        }
    } );
};

export default styles;
