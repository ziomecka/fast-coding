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

require('./style.sass');

/**
 * Needed for renderig lessons.
 * If course is not expanded then
 * lessons will be an empty array.
 * Otherwise lessons === this.props.lessons
 */
interface ICourseState {
    lessons: LessonData[];
}

/**
 * Main assumption: lessons' property 'no' start always from 0
 */
class CourseComponent extends React.Component<CourseProps, ICourseState> {
    elevation: number;
    cols: number;
    lessonsRoute: AppRoutesEnum;
    constructor(props) {
        super(props);
        this.elevation = 3;
        this.cols = 3;
        this.lessonsRoute = AppRoutesEnum.lessons;

        /** If course is expanded then lessons otherwise empty array */
        this.state = { lessons: this.isExpanded? this.props.lessons : [] };

        this.handleOnClick = this.handleOnClick.bind(this);
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

    /**
     *  Scroll the body to the course
     */
    scroll(id = this.props.openedCourseId) {
        setTimeout(() => {
            let body = document.querySelector('body');
            /** Course's top relative to the viewport */
            const { top } = document.getElementById(id).getBoundingClientRect();

            /** Body is scrolled by */
            const { scrollTop } = body;

            const absoluteTop = Math.min( Math.max( top + scrollTop - 160, 0, top  - 160 ), top + scrollTop );
            body.scrollTop = absoluteTop;
            body = null; // GC
        }, 150)
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
                    summaryRoot,
                    lessonsContainer
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
                    <GridList
                        classes={{ root: lessonsContainer }}
                        /** Id needed for scrolling within course window - stepper */
                        id={ `details-${ id }` }
                    >
                        { this.lessons }
                    </GridList>

                    { isExpanded && <Stepper /> }
                </Grid>
            </ExpansionPanel>
        );
    }

    get lessons () {
        let {
            props: {
                classes: {
                    lessonTile,
                    lessonCardButton,
                    lessonCardButtonLabel,
                    lessonCardLinkText
                }
            },
            langCode,
            elevation
        } = this;

        return this.state.lessons.map(( lesson: LessonData ) => {
            // @ts-ignore
            let { _id, title: { [ langCode ]: title }, no } = lesson;

            return (
                <Grid
                    item
                    container
                    key={ _id }
                    classes={{ item: lessonTile }}
                    component={ GridListTile }
                    id={ `card-${ no }` }
                    tabIndex={ -1 } // single lesson is focusable
                >
                    <Button
                        onClick={ () => this.handleOnClick(lesson) }
                        classes={{ root: lessonCardButton, label: lessonCardButtonLabel }}
                    >
                        <Typography variant="h5">
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