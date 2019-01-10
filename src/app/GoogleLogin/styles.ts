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

    const buttonShadow = theme.shadows[3];

    return createStyles({
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
                margin: '1rem 0',
                maxHeight: '3rem',
                boxSizing: 'border-box'
            },
            '& .firebaseui-idp-icon-wrapper': {
                display: 'inline-block',
                height: '1em', // needed for Firefox, in Chrome 32px by user.agent,
                marginRight: 5,
                [ theme.breakpoints.up('sm') ]: {
                    height: '1.5em' // needed for Firefox, in Chrome 32px by user.agent
                }
            },
            '& .firebaseui-idp-icon': {
                marginRight: '10px ',
                height: '100%',
                width: 'auto'
            },
            '& .firebaseui-idp-text-short': {
                display: 'none'
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
    });
};

export default styles;