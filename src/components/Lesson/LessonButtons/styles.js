import { PAPER_PADDING, PAPER_PADDING_MAX, BORDER_THIN, LESSON_MAX_WIDTH } from '../../../constants';

const styles = theme => {
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
            padding: PAPER_PADDING,
            marginTop: PAPER_PADDING_MAX,
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
};

export default styles;