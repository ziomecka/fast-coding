import * as React from 'react';
import { Link } from 'react-router-dom';

import { LessonsProps } from './container';
import { LessonData } from  '../Lesson/_duck/reducers';
import TextGenerator from '../TextGenerator/container';

import { AppRoutes } from '../../_common/';
import styles from './styles';

/** Materials */
import { withStyles } from '@material-ui/core';

/** Materials core */
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

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

    const getLessons = () => (lessons.map((lesson, ind) => {
        return (
            <ExpansionPanel key={`lesson-${lesson.title}-${ind}`}>
                <ExpansionPanelSummary expandIcon={ <ExpandMore /> }>
                    <Typography className={classes.heading}>
                        {lesson.title}
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                        {lesson.description}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    { listLessons(lesson.lessons) }
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }));

    const listLessons = (lessons: LessonData[]) => (lessons.map((lesson: LessonData) => {
        const { _id, title } = lesson;

        return (
            <Card
                key={_id}
                id={`card-${_id}`}
                {...{ elevation }}
            >
                <Link
                    id={`link-${_id}`}
                    to={`${lessonsRoute}/${_id}`}
                    onClick={() => handleOnClick(lesson)}
                >
                    {title}
                </Link>
            </Card>
        );
    }));

    if (lessons && lessons.length) {
        return (
            // {/* < TextGenerator /> */}
            <Paper id="lessons">
                { getLessons() }
            </Paper>
        );
    }

    /** If lessons are unavailable. */
    return null;
};

export default withStyles(styles)(LessonsComponent);
