import { createStyles } from '@material-ui/core/styles';
import { COURSE_HEIGHT } from './constants.styles';
import { PAPER_PADDING_MAX_LG } from '@constantsStyles';

const styles = createStyles(theme => {
    const {
        typography: {
            fontWeightMedium,
            h4: { fontSize: headingFontSize },
            h5: { fontSize: descriptionFontSize }
        },
        spacing: { unit: spacingUnit },
        palette: { action: { hover }}
    } = theme;
    const transition = {
        duration: theme.transitions.duration.shortest,
      };

    return {
        panel: {
            overflowX: 'hidden',
            alignItems: 'flex-start',
            // width: `calc(100% - 100px)`,
            padding: `${ PAPER_PADDING_MAX_LG }`,
            backgroundColor: '#f5f5f5',
            margin: '20px'
        },
        collapsedContainer: {
            overflowY: 'hidden',
            // width: '100%',
            position: 'relative',
            overflowX: 'hidden',
            margin: '20px 0',
            padding: 0
        },
        collapsedEntered: {
            // width: '100%',
            overflowX: 'hidden',
            padding: '20px 0'
        },
        collapsedWrapper: {
            // width: 'calc(100% - 5rem)',
            overflowX: 'hidden',
            margin: '20px 0',
            padding: '20px 0',
            position: 'relative'
        },
        summaryContent: {
            margin: '0',
            flexGrow: 0
        },
        summaryExpanded: {
            width: 'auto'
        },
        summaryRoot: {
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            width: '100%',
            paddingRight: 0
        },
        summaryHeading: {
            paddingTop: '1em',
            fontSize: headingFontSize,
            fontWeight: fontWeightMedium
        },
        summaryDescription: {
            paddingTop: '1em',
            fontSize: descriptionFontSize
        },
        detailsLessons: {
            overflowY: 'scroll',
            maxHeight: `calc(${ COURSE_HEIGHT } + ${ COURSE_HEIGHT } + ${ spacingUnit * 4 + 2 }px)`,
            justifyContent: 'flex-start',
        },
        lessonCard: {
            margin: `${ spacingUnit }px`,
            height: COURSE_HEIGHT,
            '&:focus': {
                outline: 'none',
                backgroundColor: hover //TODO
            }
        },
        expansionButton: {
            width: '100px',
            height: '100px',
            fontWeight: fontWeightMedium,
            flexGrow: 0,
            transition: theme.transitions.create('transform', transition),
            '&$expanded': {
                transform: 'translateY(-50%) rotateZ(180deg)'
            }
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
            width: '100%',
            height: '100%'
        },
        lessonCardButtonLabel: {
            display: 'flex-box',
            flexWrap: 'wrap',
            height: '100%',
            width: '100%',
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
        }
    };
});

export default styles;