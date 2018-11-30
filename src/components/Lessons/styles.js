import { LESSONS_HEIGHT } from '../../constants';

const styles = theme => {
    const {
        typography: { fontWeightMedium },
        spacing: { unit: spacingUnit }
    } = theme;

    return {
        expansionPanel: {
            overflow: 'hidden'
        },
        expansionPanelSummary: {
            whiteSpace: 'nowrap'
        },
        expansionPanelSummaryHeading: {
            whiteSpace: 'nowrap'
        },
        expansionPanelDetails: {
            flexWrap: 'wrap'
        },
        lessonCard: {
            margin: spacingUnit,
            flex: '0 0 20%',
            padding: '2rem',
            height: LESSONS_HEIGHT,
            minWidth: LESSONS_HEIGHT,
        },
        expansionButton: {
            maxWidth: '4rem',
            maxHeight: '4rem'
        },
        lessonCardContent: {
            padding: '1rem',
            width: '100%',
            height: '100%'
        },
        lessonCardLink: {
            boxSizing: 'border-box',
            textAlign: 'center',
            height: '100%',
            '& > a': {
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                width: '100%'
            }
        },
        lessonCardLinkText: {
            display: 'flex-box',
            boxSizing: 'border-box',
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: 'center',
            '&:nth-child(1)': {
                fontWeight: fontWeightMedium,
                display: 'inline-block',
                padding: '1em 0'
            },
            '&:nth-child(2)': {
                display: 'inline-block',
                padding: '1em 0'
            }
        },
        divider: {
            margin: '2rem 0'
        }
    };
};

export default styles;