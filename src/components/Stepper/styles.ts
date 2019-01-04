import { createStyles } from '@material-ui/core/styles';

const styles = createStyles(theme => {
    const {
        palette: { action: { hover } },
        typography: { subtitle1: { fontSize, lineHeight } }
    } = theme

    return {
        stepper: {
            position: 'absolute',
            left: '50%',
            bottom: 0,
            transform: 'translate(-50%, 50%)',
            backgroundColor: 'transparent',
            padding: 0,
            justifyContent: 'center',
        },
        iconContainer: {
            padding: 0,
        },
        iconDense: {
            '& svg': {
                marginLeft: '-.4em',
                marginRight: '-.4em'
            }
        },
        label: {
            fontSize,
            lineHeight,
            color: 'inherit',
            textAlign: 'center',
        },
        selectedLesson: {
            '& button': {
                backgroundColor: hover
            }
        }
    };
});

export default styles;