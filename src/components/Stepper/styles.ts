import { createStyles } from '@material-ui/core/styles';
import { MIN_HEIGHT } from './constants.styles';

const styles = createStyles(theme => {
    const {
        shadows: { [ 10 ]: boxShadow },
        shape: { borderRadius },
        palette: {
            primary: {
                dark: backgroundColor,
                contrastText: color
            },
        },
        spacing: { unit: padding },
        typography: { subtitle1: { fontSize, lineHeight } }
    } = theme

    return {
        stepper: {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            right: `${ padding * 2 }`,
            backgroundColor,
            boxShadow,
            padding: `${ padding * 2} ${ padding }`,
            width: padding * 8,
            minHeight: MIN_HEIGHT,
            justifyContent: 'center',
            color,
            borderRadius
        },
        iconContainer: {
            padding:`${ padding * 2 } 0 ${ padding * 2 }`,
            color
        },
        label: {
            fontSize,
            lineHeight,
            color,
            textAlign: 'center',
        },
        goTo: {
            lineHeight: '.9em',
            padding:`${ padding * 2 } 0 ${ padding * 2 }`,
        }
    };
});

export default styles;