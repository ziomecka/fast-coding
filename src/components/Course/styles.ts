import { createStyles } from '@material-ui/core/styles';
import {
    COURSE_HEIGHT,
    COLUMNS,
    SPACING_BEETWEEN_LESSONS,
    TRANSITION_DURATION
} from './constants.styles';

import {
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
        palette: {
            secondary: { dark: reviewColor },
            action: { hover },
            background: { paper: lessonCardBackground }
        }
    } = theme;

    let duration = theme.transitions.duration[ TRANSITION_DURATION ];

    return {
        panel: {
            overflowX: 'hidden',
            alignItems: 'flex-start',
            backgroundColor: '#f5f5f5',
            maxWidth: '100%'
        },
        collapsedContainer: {
            overflow: 'hidden',
            position: 'relative', // for Stepper
            padding: 0,
            width: '100%'
        },
        collapsedEntered: {
            overflowX: 'hidden',
            margin: `${ PAPER_PADDING_LG } 0`,
            padding: `0 ${ PAPER_PADDING_LG }`
        },
        collapsedWrapper: {
            overflow: 'hidden',
            width: 'inherit'
        },
        summaryContent: {
            padding: `${ PAPER_PADDING_LG }`,
            margin: '0',
            flexGrow: 0
        },
        summaryExpanded: {
            width: 'auto',
            '&:hover': {
                cursor: 'pointer !important' // Material design uses important for auto
            }
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
            paddingTop: 0,
            paddingBottom: 0
        },
        lessonsContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '100%',
            /** 2 tiles, 4 spacings visible */
            maxHeight: `calc(${ COURSE_HEIGHT * 2 + spacingUnit * SPACING_BEETWEEN_LESSONS * 6 + 2 }px)`,
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
            margin: `${ spacingUnit  * SPACING_BEETWEEN_LESSONS }px 0`,
            padding: 0,
            '&:focus': {
                outline: 'none',
            },
            '&:focus button': {
                backgroundColor: hover
            }
        },
        lessonTileReview: {
            '& h5:after': {
                display: 'inline-block',
                width: '100%',
                content: "attr(info)",
                fontSize: '.7em',
                marginTop: '.7em',
                textTransform: 'lowercase',
                color: reviewColor
            }
        },
        expansionButton: {
            width: '100px',
            height: '100px',
            fontWeight: fontWeightMedium,
            flexGrow: 0,
            transition: theme.transitions.create('transform', { duration })
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
            backgroundColor: lessonCardBackground
        },
        lessonCardButtonLabel: {
            display: 'flex-box',
            flexWrap: 'wrap',
            height: '100%',
            width: `calc(100% - ${ PAPER_PADDING_LG })`,
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
            padding: `${ spacingUnit * SPACING_BEETWEEN_LESSONS }px`,
            height: 'initial',
            transition: theme.transitions.create('width', { duration })
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