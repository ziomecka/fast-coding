import * as React from 'react';

import { CourseProps } from './container';
import { LessonData } from  '../Lesson/_duck/reducers';
import Stepper from '../Stepper/';

import { AppRoutesEnum } from '@appTypes';
import styles from './styles';

/** Materials */
import withStyles from '@material-ui/core/styles/withStyles';
import withTheme from '@material-ui/core/styles/withTheme';

/** Materials core */
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

/** Materials icons */
import ExpandMore from '@material-ui/icons/ExpandMore';
import { getActiveLanguage, Translate } from 'react-localize-redux';

import { TRANSITION_DURATION, COURSE_HEIGHT_MD, COURSE_HEIGHT_LG, COLS_MD, COLS_LG, SPACING_BEETWEEN_LESSONS } from './constants.styles';
import { NAV_HEIGHT_LG, NAV_HEIGHT_MD, MEDIA_DESKTOP_LG } from '@constantsStyles';

import { LessonsTypesEnum } from './_duck/types';
const { review } = LessonsTypesEnum;

import getTranslation from '@shared/get.translation';

import Media from 'react-media';

require('./style.sass');

/**
 * Needed for renderig lessons and media query.
 * If course is not expanded then
 * lessons will be an empty array.
 * Otherwise lessons === this.props.lessons
 */
interface ICourseState {
    lessons: LessonData[];
    mediaLarge: boolean;
}

/**
 * Main assumption: lessons' property 'no' start always from 0
 */
class CourseComponent extends React.Component<CourseProps, ICourseState> {
    lessonsRoute: AppRoutesEnum;
    timeout: any
    constructor(props) {
        super(props);

        this.lessonsRoute = AppRoutesEnum.lessons;

        /** If course is expanded then lessons otherwise empty array */
        this.state = {
            lessons: this.isExpanded? this.props.lessons : [],
            mediaLarge: window.matchMedia(`(min-width: ${ MEDIA_DESKTOP_LG } )`).matches
        };

        this.handleOnClick = this.handleOnClick.bind(this);
        this.onMediaQueryChange = this.onMediaQueryChange.bind(this);
    }

    handleOnClick(lesson: LessonData): void {
        const { _id } = lesson;
        const randomLesson = false;
        if (randomLesson) {
            this.props.handleOpenRandomLesson(lesson);
        } else {
            this.props.handleOpenLesson(lesson);
        }

        this.props.history.push(`${this.lessonsRoute}/${_id}`);
    }

    get langCode () {
        return getActiveLanguage(this.props.localize).code;
    }

    get numberOfLessons () {
        return this.props.lessons.length;
    }

    get id () {
        return this.props._id;
    }

    get isExpanded() {
        return ( this.props.openedCourseId === this.id );
    }

    /** Scroll needed e.g. when lessons entered from lesson */
    componentWillMount() {
        this.scroll();
    }

    /**
     *  Scroll the body to the course
     */
    scroll(id = this.props.openedCourseId, smooth = true) {
        if (id) {
            const {
                props: {
                    theme: { transitions: { duration : { [ TRANSITION_DURATION ]: duration }}}
                },
                state: { mediaLarge }
            } = this;

            this.timeout = setTimeout(() => {
                let body = document.querySelector('body');

                /** Course's top relative to the viewport */
                const { top } = document.getElementById(id).getBoundingClientRect();
                /** Body is scrolled by */
                const { scrollTop } = body;
                const NAV_HEIGHT = mediaLarge ? NAV_HEIGHT_LG : NAV_HEIGHT_MD;

                body.scroll({
                    top: Math.min( Math.max( top + scrollTop - NAV_HEIGHT, 0, top - NAV_HEIGHT ), top + scrollTop ),
                    behavior: smooth ? 'smooth' : 'auto'
                });

                body = null; // GC
                clearTimeout(this.timeout); // GC
            }, duration);
        }
    }

    getLessonsGrid(cellHeight: number, cols: number) {
        const spacing = SPACING_BEETWEEN_LESSONS * this.props.theme.spacing.unit;

        return (
            <GridList
                classes={{ root: this.props.classes.lessonsContainer }}
                /** Id needed for scrolling within course window - stepper */
                id={ `details-${ this.id }` }
                { ...{ cellHeight, cols, spacing } }
            >
                { this.lessons }
            </GridList>
        );
    }

    onMediaQueryChange(matches: boolean) {
        this.setState({
            mediaLarge: matches
        });
    }

    get course () {
        let {
            id,
            langCode,
            props: {
                classes: {
                    panel,
                    collapsedContainer,
                    collapsedEntered,
                    collapsedWrapper,
                    summaryContent,
                    summaryExpanded,
                    expansionButton,
                    detailsLessons,
                    summaryHeading,
                    summaryDescription,
                    summaryRoot
                }
            },
            isExpanded
        } = this;

        const { props: {
            // @ts-ignore
            title: { [ langCode ]: title },
            // @ts-ignore
            description: { [ langCode ]: description },
        }} = this;

        return (
            <ExpansionPanel
                key={ id }
                className={ panel }
                expanded={ isExpanded }
                CollapseProps={{
                    classes: {
                        container: collapsedContainer,
                        entered: collapsedEntered,
                        wrapper: collapsedWrapper
                    }
                }}
                onChange={ async (event, expanded) => {
                    /** If course is expanded */
                    if ( expanded ) {
                        /** Inform other courses so that they can close */
                        let answer = await this.props.openCourse(id);

                        /** When Other courses are already collapsed
                         * Render lessons and after that
                         * scroll the body to the course that is opened
                         * */
                        if ( answer ) {
                            this.setState(() => ({
                                lessons: this.props.lessons
                            }), () => this.scroll() );
                        }
                    } else {
                        /** Do not render lessons */
                        this.setState({ lessons: [] });

                        /**
                         * Close the course.
                         */
                        let answer = await this.props.closeCourse(id);

                        /**
                         * If the course has been closed and
                         * no other course is opened then
                         * Scroll the body to this particular course
                         */
                        if ( answer && !this.props.openedCourseId ) {
                            this.scroll(id);
                        }
                    }
                }}
            >
                <ExpansionPanelSummary
                    {...{ id } }
                    tabIndex={ -1 }
                    expandIcon={ <ExpandMore /> }
                    classes={{
                        root: summaryRoot,
                        content: summaryContent,
                        expanded: summaryExpanded,
                        expandIcon: expansionButton
                    }}
                >
                    <div>
                        <Typography variant="h3" className={ summaryHeading }>
                            { title }
                        </Typography>

                        <Typography variant="h4" className={ summaryDescription }>
                            { description }
                        </Typography>
                    </div>
                </ExpansionPanelSummary>

                <Grid
                    container
                    justify="space-evenly"
                    spacing={ 40 }
                    classes={{ container: detailsLessons }}
                    component={ ExpansionPanelDetails }
                >
                    <Media query={`(min-width: ${ MEDIA_DESKTOP_LG }px)`} onChange={ this.onMediaQueryChange }>{
                        matches => {
                            return matches
                                ? this.getLessonsGrid( COURSE_HEIGHT_LG, COLS_LG )
                                : this.getLessonsGrid( COURSE_HEIGHT_MD, COLS_MD )
                        }
                    }</Media>

                    { isExpanded && <Stepper /> }
                </Grid>
            </ExpansionPanel>
        );
    }

    get reviewInfo() {
        return getTranslation(this.props.localize, 'lessonTypeReview');
    }

    get lessons () {
        let {
            props: {
                classes: {
                    lessonTileContainer,
                    lessonTile,
                    lessonTileReview,
                    lessonCardButton,
                    lessonCardButtonLabel,
                    lessonCardLinkText
                }
            },
            langCode,
            reviewInfo
        } = this;

        return this.state.lessons.map(( lesson: LessonData ) => {
            // @ts-ignore
            let { _id, title: { [ langCode ]: title }, no, type } = lesson;

            const isReview = type.indexOf(review) !== -1;
            const info = isReview? reviewInfo : '';

            return (
                <Grid
                    item
                    container
                    key={ _id }
                    classes={{
                        item: `${ lessonTile } ${ isReview ? lessonTileReview : '' }`
                    }}
                    id={ `card-${ no }` }
                    tabIndex={ -1 } // single lesson is focusable
                >
                    <GridListTile  className={ lessonTileContainer }>
                    <Button
                        onClick={ () => this.handleOnClick(lesson) }
                        classes={{ root: lessonCardButton, label: lessonCardButtonLabel }}
                        >
                        {/*
                            //@ts-ignore */}
                        <Typography
                            variant="h5"
                            // @ts-ignore
                            { ...{ info } }
                        >
                            <span className={ lessonCardLinkText }>
                                <Translate id="lessonsLesson" />
                                &nbsp;
                                { no + 1 }
                            </span>
                            <span className={ lessonCardLinkText }>
                                { title }
                            </span>
                        </Typography>
                    </Button>
                    </GridListTile>
                </Grid>
            );
        })
    }

    render () {
        const {
            isExpanded,
            props: { classes: {
                gridListTileTile,
                gridListTileRoot,
                gridListTileRootCollapsed,
                gridListTileRootExpanded,
            }}
        } = this;

        return (
            <GridListTile
                classes={{
                    root: `${ isExpanded
                        ? gridListTileRoot + ' ' + gridListTileRootExpanded
                        : gridListTileRoot + ' ' + gridListTileRootCollapsed
                    }`,
                    tile: gridListTileTile
                }}
            >
                { this.course }
            </GridListTile>
        );
    }
};

export default withStyles(styles)(withTheme()(CourseComponent));