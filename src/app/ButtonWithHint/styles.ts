import { createStyles } from '@material-ui/core/styles';

const styles = createStyles(theme => {
    const {
        typography: {
            caption: { fontSize: captionFontSize }
        }
    } = theme;

    return {
        buttonClass: {
            margin: '1em',
            flexDirection: 'column',
            '&:after': {
                display: 'block',
                content: "attr(aftertext)",
                width: '100%',
                fontSize: captionFontSize,
                textTransform: 'lowercase'
            }
        }
    }
});

export default styles;