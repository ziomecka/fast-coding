import { createStyles } from '@material-ui/core/styles';

const styles = createStyles( theme => {
    const {
        palette: { secondary: { main: hintColor } },
        spacing: { unit: spacingUnit }
    } = theme;

    return {
        lessonPaper: {
            position: 'relative',
        },
        lessonInvite: {
            padding: 0,
            margin: 0,
            fontSize: '1.5em'
        },
        lessonTime: {
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
