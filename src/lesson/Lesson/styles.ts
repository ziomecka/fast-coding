import { createStyles } from '@material-ui/core/styles';

const styles = createStyles( theme => {
    const {
        palette: { secondary: { main: hintColor } },
        spacing: { unit: spacingUnit }
    } = theme;

    return {
        paperClass: {
            position: 'relative',
        },
        inviteClass: {
            padding: 0,
            margin: 0,
            fontSize: '1.5em'
        },
        timeClass: {
            position: 'relative',
            '&:after': {
                content: 'attr(aftertext)',
                color: hintColor,
                marginLeft: spacingUnit
            }
        }
    };
} );

export default styles;
