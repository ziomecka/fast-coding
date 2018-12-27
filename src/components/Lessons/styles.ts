import { LESSONS_HEIGHT } from './constants.styles';

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
            margin: '0',
            marginBottom: '0 !important' // to ovveride material design.
        },
        expansionPanelSummaryHeading: {
            paddingTop: '2rem'
        },
        expansionPanelDetails: {
            flexWrap: 'wrap',
            paddingTop: 0,
            justifyContent: 'center'

        },
        lessonCard: {
            margin: spacingUnit,
            flex: '0 0 20%',
            padding: 0,
            height: LESSONS_HEIGHT,
            maxWidth: LESSONS_HEIGHT
        },
        expansionButton: {
            maxWidth: '4rem',
            maxHeight: '4rem'
        },
        lessonCardContent: {
            padding: 0,
            width: '100%',
            height: '100%',
            '&:last-child': {
                paddingBottom: 0 // to ovveride material design
            }
        },
        lessonCardButton: {
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
            height: LESSONS_HEIGHT,
            width: '100%'
        },
        lessonCardButtonLabel: {
            display: 'flex-box',
            flexWrap: 'wrap',
            height: LESSONS_HEIGHT,
            width: '100%',
            padding: '2em',
            fontSize: '1em',
            boxSizing: 'border-box',
        },
        lessonCardLinkText: {
            display: 'inline-block',
            width: '100%',
            '&:nth-child(1)': {
                fontWeight: fontWeightMedium,
                alignSelf: 'flex-start',
                top: 0
            }
        },
        divider: {
            margin: '2rem 0'
        }
    };
};

export default styles;