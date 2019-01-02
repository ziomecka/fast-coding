import { createStyles } from '@material-ui/core/styles';
import {
    COURSE_HEIGHT,
    COLUMNS,
    SPACING,
    TRANSITION_DURATION
} from './constants.styles';

import {
    PAPER_PADDING_MAX_LG,
    PAPER_PADDING_LG
} from '@constantsStyles';

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
        duration: theme.transitions.duration[ TRANSITION_DURATION ],
    };

    return {
        panel: {
            overflowX: 'hidden',
            alignItems: 'flex-start',
            backgroundColor: '#f5f5f5',
            maxWidth: '100%'
        },
        collapsedContainer: {
            overflowY: 'hidden',
            position: 'relative',
            overflowX: 'hidden',
            padding: 0,
            width: '100%'
        },
        collapsedEntered: {
            overflowX: 'hidden',
            padding: `${ PAPER_PADDING_LG }`
        },
        collapsedWrapper: {
            overflowX: 'hidden',
            position: 'relative',
            width: 'inherit'
        },
        summaryContent: {
            padding: `${ PAPER_PADDING_LG }`,
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
            maxHeight: `calc(${ COURSE_HEIGHT } + ${ COURSE_HEIGHT } + ${ spacingUnit * SPACING + 2 }px)`,
        },
        lessonsContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '100%',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
                display: 'none'
            }
        },
        lessonTile: {
            flexBasis: '20%',
            maxWidth: '20%',
            justifyContent: 'center',
            alignItems: 'center',
            margin: `${ spacingUnit }px 0`,
            padding: PAPER_PADDING_LG,
            '&:focus': {
                outline: 'none',
            },
            '&:focus button': {
                backgroundColor: hover
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
            width: COURSE_HEIGHT,
            height: COURSE_HEIGHT,
            backgroundColor: '#ffffff',
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
        },
        gridListTileRoot: {
            padding: `${ spacingUnit * SPACING }px`,
            height: 'initial',
            transition: theme.transitions.create('width', transition)

        },
        gridListTileRootCollapsed: {
            width: `${ 100 / COLUMNS }%`,
            height: 'inherit',
        },
        gridListTileRootExpanded: {
            width: `${ 100 / 1 }%`,
            maxWidth: '100%'
        },
        gridListTileTile: {
            height: 'initial',
            width: 'initial',
        }
    };
});

export default styles;