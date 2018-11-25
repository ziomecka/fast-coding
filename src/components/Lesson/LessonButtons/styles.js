// TODO improve
const styles = theme => ({
    lessonButtonsMenu: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '200px',
        maxWidth: '200px',
        position: 'absolute',
    },
    lessonButtonsButton: {
        maxHeight: '2em'
    },
    lessonButtonsDragHandle: {
        position: 'absolute',
        top: '.1em',
        right: '.1em',
        color: theme.palette.primary.light
    }

});

export default styles;