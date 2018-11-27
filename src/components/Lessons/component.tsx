import * as React from 'react';
import { Link } from 'react-router-dom';

import { LessonsProps } from './container';
import { LessonData } from  '../Lesson/_duck/reducers';
// import TextGenerator from '../TextGenerator/container';

import letters from '../../shared/letters.svg';
import { AppRoutes } from '../../_common/';
import styles from './styles';

import { LESSONS_DEFAULT_TAG } from '../../constants';

/** Materials */
import { withStyles } from '@material-ui/core';

/** Materials core */
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import CardContent from '@material-ui/core/CardContent';

/** Materials icons */
import ExpandMore from '@material-ui/icons/ExpandMore';

require('./style.sass');

const LessonsComponent: React.StatelessComponent<LessonsProps> = props => {
    const {
        lessons,
        handleOpenLesson,
        handleOpenRandomLesson,
        classes
    } = props;

    const {
        expansionPanel,
        expansionPanelSummary,
        expansionPanelSummarySVG,
        expansionButton,
        expansionPanelDetails,
        lessonCard,
        lessonCardContent,
        lessonCardLinkSVG,
        lessonCardLinkText,
        expansionPanelSummaryHeading
    } = classes;

    const elevation = 3;
    const randomLesson = true;

    const lessonsRoute = AppRoutes.lessons;

    const handleOnClick = (lesson: LessonData): void => {
        if (randomLesson) {
            handleOpenRandomLesson(lesson);
        } else {
            handleOpenLesson(lesson);
        }
    };

    const getTag = (tag: string): (() => JSX.Element | null)[] => {
        return Array.from(tag).map(l => {
            return letters[l] || (() => null)
        });
    };

    const getLessons = () => (lessons.map((lesson, ind) => {
        const tag = getTag(lesson.tag || LESSONS_DEFAULT_TAG);

        return (
            <ExpansionPanel
                key={`lesson-${lesson.title}-${ind}`}
                className={expansionPanel}
            >
                <ExpansionPanelSummary
                    expandIcon={ <ExpandMore /> }
                    title={lesson.title}
                    classes={{content: expansionPanelSummary}}
                    IconButtonProps={{className: expansionButton}}
                >
                    <h2 className={expansionPanelSummarySVG}>
                        { tag.map((Item, ind) => <Item key={ind} />) }
                    </h2>

                    <Typography variant="h3" className={expansionPanelSummaryHeading}>
                        { lesson.description }
                    </Typography>

                </ExpansionPanelSummary>

                <ExpansionPanelDetails classes={{root: expansionPanelDetails}}>

                    { listLessons(lesson.lessons) }

                </ExpansionPanelDetails>
            </ExpansionPanel>
         );
    }));

    const listLessons = (lessons: LessonData[]) => (
        lessons.map((lesson: LessonData, ind) => {
            const { _id, title } = lesson;
            const tag = getTag(lesson.signs.join(' '));
            return (
                <Card
                    key={_id}
                    id={`card-${_id}`}
                    {...{ elevation }}
                    className={lessonCard}
                >
                    <CardContent classes={{ root: lessonCardContent }} >
                        <Typography variant="h4">
                            <Link
                                id={`link-${_id}`}
                                to={`${lessonsRoute}/${_id}`}
                                onClick={() => handleOnClick(lesson)}
                                title={title}
                            >
                            <span className={lessonCardLinkText}>
                                {`Lesson ${ind + 1}`}
                            </span>
                            {/* </Link> */}

                        <span
                            className={lessonCardLinkSVG}
                            >
                            { tag && tag.map((Item, ind) => (
                                <Item key={ind} />
                                )) }
                        </span>
                        </Link>
                        </Typography>
                    </CardContent>
                </Card>
            );
        })
    );

    if (lessons && lessons.length) {
        return (
            //  {/* < TextGenerator /> */}
            <Paper id="lessons" elevation={0}>
                { getLessons() }
            </Paper>
        );
    }

    /** If lessons are unavailable. */
    return null;
};

export default withStyles(styles)(LessonsComponent);
