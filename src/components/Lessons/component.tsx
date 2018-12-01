import * as React from 'react';
import { Link } from 'react-router-dom';

import { LessonsProps } from './container';
import { LessonData } from  '../Lesson/_duck/reducers';

import { AppRoutes } from '../../_common/';
import styles from './styles';

/** Materials */
import withStyles from '@material-ui/core/styles/withStyles';

/** Materials core */
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

/** Materials icons */
import ExpandMore from '@material-ui/icons/ExpandMore';

import { getActiveLanguage, Translate } from 'react-localize-redux';

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
        expansionButton,
        expansionPanelDetails,
        lessonCard,
        lessonCardContent,
        lessonCardLink,
        lessonCardLinkText,
        expansionPanelSummaryHeading,
        divider
    } = classes;

    const elevation = 3;
    const randomLesson = false;

    const lessonsRoute = AppRoutes.lessons;

    const handleOnClick = (lesson: LessonData): void => {
        if (randomLesson) {
            handleOpenRandomLesson(lesson);
        } else {
            handleOpenLesson(lesson);
        }
    };

    const langCode = getActiveLanguage(props.localize).code;

    const getLessons = () => (lessons.map((lesson, ind) => {
        const { title, description } = lesson;

        return (
            <ExpansionPanel
                key={`lesson-${title}-${ind}`}
                className={expansionPanel}
                expanded={true}
            >
                <ExpansionPanelSummary
                    // expandIcon={ <ExpandMore /> }
                    classes={{content: expansionPanelSummary}}
                    expanded={true}
                    // IconButtonProps={{ className: expansionButton }}
                >
                    <Typography variant="h3">
                        {title[langCode]}
                    </Typography>

                    <Typography variant="h4" className={expansionPanelSummaryHeading}>
                        { description[langCode] }
                    </Typography>
                </ExpansionPanelSummary>

                <Divider className={divider}/>

                <ExpansionPanelDetails classes={{root: expansionPanelDetails}}>
                    { listLessons(lesson.lessons) }
                </ExpansionPanelDetails>
            </ExpansionPanel>
         );
    }));

    const listLessons = (lessons: LessonData[]) => (
        lessons.map((lesson: LessonData, ind) => {
            const { _id, title } = lesson;

            return (
                <Card
                    key={_id}
                    id={`card-${_id}`}
                    {...{ elevation }}
                    className={lessonCard}
                >
                    <CardContent classes={{ root: lessonCardContent }} >
                        <Typography variant="h5" className={lessonCardLink}>
                            <Link
                                id={`link-${_id}`}
                                to={`${lessonsRoute}/${_id}`}
                                onClick={() => handleOnClick(lesson)}
                                title={title[langCode]}
                            >
                                <span className={lessonCardLinkText}> <Translate id="lessonsLesson" /> {`${ind + 1}`}</span>
                                <span className={lessonCardLinkText}>{title[langCode]}</span>

                         </Link>
                        </Typography>
                    </CardContent>
                </Card>
            );
        })
    );

    if (lessons && lessons.length) {
        return (
            <Paper id="lessons">
                { getLessons() }
            </Paper>
        );
    }

    /** If lessons are unavailable. */
    return null;
};

export default withStyles(styles)(LessonsComponent);
