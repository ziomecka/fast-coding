import { createStyles } from '@material-ui/core/styles';
import {
    PAPER_PADDING_MD,
    PAPER_PADDING_MAX_MD,
    PAPER_PADDING_LG,
    PAPER_PADDING_MAX_LG,
    BORDER_THIN,
    LESSON_MAX_WIDTH
} from '@constantsStyles';

const styles = createStyles(theme => {
    const {
        palette: {
            primary: { main: borderColor }
        }
    } = theme;

    return {
        lessonButtonsButton: {
        },
        lessonButtonsMenu: {
            minWidth: 'auto',
            minHeight: 'auto',
            maxWidth: `${LESSON_MAX_WIDTH}px`,
            height: 'auto',
            width: '100%',
            position: 'relative',
            justifyContent: 'space-around',
            padding: PAPER_PADDING_MD,
            marginTop: PAPER_PADDING_MAX_MD,
            [theme.breakpoints.up('lg')]: {
                padding: PAPER_PADDING_LG,
                marginTop: PAPER_PADDING_MAX_LG,
            },
            border: `${BORDER_THIN} solid ${borderColor}`
        },
        lessonButtonsMenuDragged: {
            position: 'absolute'
        },
        lessonButtonsDragHandle: {
            position: 'absolute',
            top: '.1em',
            left: '.1em',
            color: theme.palette.primary.light,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between'
        }
    }
});

export default styles;