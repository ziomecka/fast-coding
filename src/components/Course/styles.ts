import { createStyles } from '@material-ui/core/styles';
import {
    SPACING_BEETWEEN_LESSONS,
    TRANSITION_DURATION,
    SVG_SIZE_MD,
    COURSE_BACKGROUND_GREY,
    GRID,
    SUMMARY_DESCRIPTION_PADDING_TOP
} from './constants.styles';

import {
    PAPER_PADDING_LG,
    PAPER_PADDING_MD,
    PAPER_PADDING_XS,
    FONT_SIZE
} from '@constantsStyles';

const { FONT_SIZE_h3, FONT_SIZE_h4 } = FONT_SIZE;

import { MediaEnum } from '@app/Media';
const { xs, md, lg, sm } = MediaEnum;

const styles = createStyles( theme => {
    const {
        typography: {
            fontWeightMedium,
            h3: { fontSize: h3FontSize, lineHeight: h3LineHeight },
            h4: { fontSize: labelFontSize, lineHeight: h4LineHeight }
        },
        spacing: { unit: spacingUnit },
        palette: {
            action: { hover },
            background: { paper: lessonCardBackground },
            grey: { [ COURSE_BACKGROUND_GREY ]: courseBackgroundColor }
        }
    } = theme;

    let duration = theme.transitions.duration[ TRANSITION_DURATION ];

    let cols = 1;

    const spacingBetweenLessons = spacingUnit * SPACING_BEETWEEN_LESSONS;

    const { rows: xsRows, cellHeight: xsCellHeight } = GRID.get( xs );
    const { rows: smRows, cellHeight: smCellHeight } = GRID.get( sm );
    const { rows: mdRows, cellHeight: mdCellHeight } = GRID.get( md );
    const { rows: lgRows, cellHeight: lgCellHeight } = GRID.get( lg );

    const paddingsXS = `${ PAPER_PADDING_XS } + ${ PAPER_PADDING_XS }`;
    const paddingsMD = `${ PAPER_PADDING_MD } + ${ PAPER_PADDING_MD }`;
    const paddingsLG = `${ PAPER_PADDING_LG } + ${ PAPER_PADDING_LG }`;
    const paddingTopH4 = `${ SUMMARY_DESCRIPTION_PADDING_TOP } * ${ FONT_SIZE_h4 }`;
    const h3Height = `${ h3LineHeight } * ${ FONT_SIZE_h3 * 2 }`; // 2 lines assumed
    const h4Height = `${ h4LineHeight } * ${ FONT_SIZE_h4 * 2 }`; // 2 lines assumed

    return {
        panelClass: {
            overflowX: 'hidden',
            alignItems: 'flex-start',
            backgroundColor: courseBackgroundColor,
            maxWidth: '100%'
        },
        collapsedContainerClass: {
            overflow: 'hidden',
            position: 'relative', // for scrolling offsetParent
            padding: 0,
            width: '100%'
        },
        collapsedEnteredClass: {
            overflowX: 'hidden',
            margin: `${ PAPER_PADDING_LG } 0`,
            padding: `0 ${ PAPER_PADDING_LG }`
        },
        collapsedWrapperClass: {
            overflow: 'hidden',
            width: 'inherit'
        },
        summaryContentClass: {
            padding: `${ PAPER_PADDING_XS }`,
            [ theme.breakpoints.up( 'sm' ) ]: {
                padding: `${ PAPER_PADDING_MD }`,
            },
            [ theme.breakpoints.up( 'lg' ) ]: {
                padding: `${ PAPER_PADDING_LG }`,
            },
            margin: '0',
            flexGrow: 0
        },
        summaryExpandedClass: {
            width: 'auto',
            '&:hover': {
                cursor: 'pointer !important' // Material design uses important for auto
            }
        },
        summaryRootClass: {
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            width: '100%',
            paddingRight: 0,
            position: 'relative', // for Stepper,
            /** Include:
             *  + paddings top and bottom
             *  + paddings above h4
             *  + two lines of h3
             *  + two lines of h4
             * */
            minHeight: `calc( ${ paddingsXS } + ${ paddingTopH4 } + ${ h3Height } + ${ h4Height } )`,
            [ theme.breakpoints.up( 'sm' ) ]: {
                minHeight: `calc( ${ paddingsMD } + ${ paddingTopH4 } + ${ h3Height } + ${ h4Height } )`,
            },
            [ theme.breakpoints.up( 'lg' ) ]: {
                minHeight: `calc( ${ paddingsLG } + ${ paddingTopH4 } + ${ h3Height } + ${ h4Height } )`,
            }
        },
        summaryHeadingClass: {
            fontWeight: fontWeightMedium
        },
        summaryDescriptionClass: {
            paddingTop: SUMMARY_DESCRIPTION_PADDING_TOP,
        },
        detailsLessonsClass: {
            overflowY: 'scroll',
            paddingTop: 0,
            paddingBottom: 0,
            padding: 0,
            margin: 0,
            '&::-webkit-scrollbar': {
                display: 'none'
            }
        },
        lessonsContainerClass: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '100%',
            flex: '1 1 100%',
            margin: '0 !important',
            maxHeight: xsCellHeight * xsRows + spacingBetweenLessons * ( xsRows - 1 ),
            [ theme.breakpoints.up( 'sm' ) ]: {
                maxHeight: smCellHeight * smRows + spacingBetweenLessons * ( smRows - 1 ),
            },
            [ theme.breakpoints.up( 'md' ) ]: {
                maxHeight: mdCellHeight * mdRows + spacingBetweenLessons * ( mdRows - 1 ),
            },
            [ theme.breakpoints.up( 'lg' ) ]: {
                maxHeight: lgCellHeight * lgRows + spacingBetweenLessons * ( lgRows - 1 ),
            },
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
                display: 'none'
            }
        },
        lessonTileContainerClass: {
            height: '100%',
            width: '100%'
        },
        lessonTileClass: {
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
        },
        expansionButtonClass: {
            flexGrow: 0,
            transition: theme.transitions.create( 'transform', { duration } ),
            '& svg': {
                width: SVG_SIZE_MD,
                height: SVG_SIZE_MD,
            },
            [ theme.breakpoints.down( 'lg' ) ]: {
                bottom: '1rem',
                right: '1rem',
                top: 'auto',
            },
            [ theme.breakpoints.up( 'lg' ) ]: {
                right: '2rem',
                // "& svg": {
                //     width: SVG_SIZE_LG,
                //     height: SVG_SIZE_LG,
                // },
            },
            padding: 0
        },
        lessonCardContentClass: {
            padding: 0,
            width: '100%',
            height: '100%',
            '&:last-child': {
                paddingBottom: 0 // to ovveride material design
            }
        },
        lessonCardButtonClass: {
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
            width: '100%',
            height: '100%',
            backgroundColor: lessonCardBackground,
            fontSize: '1rem'
        },
        lessonCardButtonLabelClass: {
            display: 'flex-box',
            flexWrap: 'wrap',
            height: '100%',
            width: `calc(100% - ${ PAPER_PADDING_LG })`,
            fontSize: labelFontSize,
            boxSizing: 'border-box',
        },
        lessonCardLinkTextClass: {
            display: 'inline-block',
            width: '100%',
            '&:nth-child(1)': {
                fontWeight: fontWeightMedium,
                alignSelf: 'flex-start',
                top: 0
            },
            [ theme.breakpoints.only( 'xs' ) ]: {
                width: 'auto',
                '&:nth-child(1)': {
                    fontWeight: fontWeightMedium,
                    alignSelf: 'flex-start',
                    top: 0,
                    '&:after': {
                        /* eslint-disable quotes */
                        content: "' '",
                        /* eslint-enable quotes */
                        display: 'inline',
                        whiteSpace: 'pre-wrap'
                    }
                }
            }
        },
        gridListTileRootClass: {
            padding: `${ spacingUnit * SPACING_BEETWEEN_LESSONS }px`,
            height: 'initial',
            transition: theme.transitions.create( 'width', { duration } )
        },
        gridListTileRootCollapsedClass: {
            width: `${ 100 / cols++ }%`,
            [ theme.breakpoints.only( 'sm' ) ]: {
                width: `${ 100 / cols++ }%`,
            },
            [ theme.breakpoints.only( 'md' ) ]: {
                width: `${ 100 / cols }%`,
            },
            [ theme.breakpoints.only( 'lg' ) ]: {
                width: `${ 100 / cols }%`,
            },
            [ theme.breakpoints.only( 'xl' ) ]: {
                width: `${ 100 / cols }%`,
            },
            height: 'inherit',
        },
        gridListTileRootExpandedClass: {
            width: `${ 100 / 1 }%`,
            maxWidth: '100%'
        },
        gridListTileTileClass: {
            height: 'initial',
            width: 'initial',
        },
        iconClass: {
            position: 'absolute',
            top: '50%',
            right: '1rem',
            transform: 'translateY( -50% )'
        }
    };
} );

export default styles;
