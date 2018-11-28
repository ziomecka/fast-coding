// TODO improve
const styles = theme => ({
    expansionPanel: {
        overflow: 'hidden'
    },
    expansionPanelSummary: {
        display: 'flex',
        flexDirection: 'column',
        whiteSpace: 'nowrap'
    },
    expansionPanelSummarySVG: {
        display: 'inline-block',
        height: '6rem',
        minWidth: '100%'
    },
    expansionPanelSummaryHeading: {
        whiteSpace: 'nowrap'
    },
    expansionPanelDetails: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    lessonCard: {
        boxSizing: 'border-box',
        margin: theme.spacing.unit,
        flex: '0 0 20%',
        padding: '0.5em',
        display: 'flex',
        flexDirection: 'column',
        // justifyItems: 'stretch',
        minHeight: '250px',
        minWidth: '250px',
        position: 'relative'
    },
    expansionButton: {
        maxWidth: '4rem',
        maxHeight: '4rem'
    },
    lessonCardContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '3rem',
        width: '100%',
    },
    lessonCardLinkText: {
        whiteSpace: 'nowrap'
    },
    lessonCardLinkSVG: {
        maxHeight: '4em',
        display: 'inline-flex',
        width: '60%',
        justifyContent: 'space-around',
        justifySelf: 'flex-end',
        position: 'absolute',
        bottom: '3rem',
        left: '50%',
        transform: 'translateX(-50%)'
    },
    divider: {
        margin: '2rem 0'
    }
});

export default styles;