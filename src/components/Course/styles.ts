import { createStyles } from '@material-ui/core/styles';
import {
    COURSE_HEIGHT_MD,
    COURSE_HEIGHT_LG,
    COLUMNS,
    SPACING_BEETWEEN_LESSONS,
    TRANSITION_DURATION,
    SVG_SIZE_MD,
    SVG_SIZE_LG,
    COURSE_NUMBER_OF_ROWS_DISPLAYED,
    COURSE_BACKGROUND_GREY
} from './constants.styles';

import {
    PAPER_PADDING_LG,
    PAPER_PADDING_MD,
    PAPER_PADDING_XS
} from '@constantsStyles';

const styles = createStyles(theme => {
    const {
        typography: {
            fontWeightMedium
        },
        spacing: { unit: spacingUnit },
        palette: {
            secondary: { dark: reviewColor },
            action: { hover },
            background: { paper: lessonCardBackground },
            grey: { [ COURSE_BACKGROUND_GREY ]: courseBackgroundColor }
        }
    } = theme;

    let duration = theme.transitions.duration[ TRANSITION_DURATION ];

    let cols = 1;

    // 1.5em Mui-Button fontSize
    const labelFontSize = 2 / 1.5;

    return {
        panel: {
            overflowX: 'hidden',
            alignItems: 'flex-start',
            backgroundColor: courseBackgroundColor,
            maxWidth: '100%'
        },
        collapsedContainer: {
            overflow: 'hidden',
            position: 'relative', // for scrolling offsetParent
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
            padding: `${ PAPER_PADDING_XS }`,
            [theme.breakpoints.up('sm')]: {
                padding: `${ PAPER_PADDING_MD }`,
            },
            [theme.breakpoints.up('lg')]: {
                padding: `${ PAPER_PADDING_LG }`,
            },
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
            paddingRight: 0,
            position: 'relative' // for Stepper
        },
        summaryHeading: {
            paddingTop: '1em',
            fontWeight: fontWeightMedium
        },
        summaryDescription: {
            paddingTop: '1em',
        },
        detailsLessons: {
            overflowY: 'scroll',
            paddingTop: 0,
            paddingBottom: 0,
            '&::-webkit-scrollbar': {
                display: 'none'
            }
        },
        lessonsContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '100%',
            flex: '1 1 100%',
            margin: '0 !important',
            // TODO simplify
            maxHeight: COURSE_HEIGHT_MD * COURSE_NUMBER_OF_ROWS_DISPLAYED + spacingUnit * SPACING_BEETWEEN_LESSONS * COURSE_NUMBER_OF_ROWS_DISPLAYED * 2 + 1,
            [theme.breakpoints.up('lg')]: {
                maxHeight: COURSE_HEIGHT_LG * COURSE_NUMBER_OF_ROWS_DISPLAYED + spacingUnit * SPACING_BEETWEEN_LESSONS * COURSE_NUMBER_OF_ROWS_DISPLAYED * 2 + 1
            },
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
                display: 'none'
            }
        },
        lessonTileContainer: {
            height: '100%',
            width: '100%'
        },
        lessonTile: {
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
            '&:focus': {
                outline: 'none',
            },
            '&:focus button': {
                backgroundColor: hover
            },
            height: COURSE_HEIGHT_MD,
            [ theme.breakpoints.up('lg') ]:{
                height: COURSE_HEIGHT_LG
            }
        },
        lessonTileReview: {
            '& h5:after': {
                display: 'inline-block',
                width: '100%',
                content: 'attr(info)',
                fontSize: '.7em',
                marginTop: '.7em',
                textTransform: 'lowercase',
                color: reviewColor
            }
        },
        expansionButton: {
            flexGrow: 0,
            transition: theme.transitions.create('transform', { duration }),
            '& svg': {
                width: SVG_SIZE_MD,
                height: SVG_SIZE_MD,
            },
            [ theme.breakpoints.down('lg') ]: {
                bottom: '1rem',
                right: '1rem',
                top: 'auto',
            },
            [ theme.breakpoints.up('lg') ]: {
                right: '2rem',
                // "& svg": {
                //     width: SVG_SIZE_LG,
                //     height: SVG_SIZE_LG,
                // },
            },
            padding: 0
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
            height: '100%',
            backgroundColor: lessonCardBackground
        },
        lessonCardButtonLabel: {
            display: 'flex-box',
            flexWrap: 'wrap',
            height: '100%',
            width: `calc(100% - ${ PAPER_PADDING_LG })`,
            // fontSize: `${ labelFontSize }em`,
            boxSizing: 'border-box',
            '& h5': {
                fontSize: `${ labelFontSize }em`,
            }
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
            width: `${ 100 / cols++ }%`,
            [ theme.breakpoints.only('sm')]: {
                width: `${ 100 / cols++ }%`,
            },
            [ theme.breakpoints.only('md')]: {
                width: `${ 100 / cols }%`,
            },
            [ theme.breakpoints.only('lg')]: {
                width: `${ 100 / cols }%`,
            },
            [ theme.breakpoints.only('xl')]: {
                width: `${ 100 / cols }%`,
            },
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