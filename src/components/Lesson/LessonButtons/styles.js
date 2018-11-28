// TODO improve
const styles = theme => ({
    lessonButtonsMenu: {
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        minWidth: 'auto',
        minHeight: 'auto',
        height: 'auto',
        position: 'relative',
        justifyContent: 'space-around',
        padding: '3em',
        marginTop: '1em',
    },
    lessonButtonsMenuDragged: {
        position: 'absolute'
    },
    lessonButtonsButton: {
        maxHeight: '2em',
        maxWidth: '200px',
        margin: '1em'
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
});

export default styles;