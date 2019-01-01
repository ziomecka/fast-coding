import * as React from 'react';

import { CourseProps } from './container';
import { LessonData } from  '../Lesson/_duck/reducers';
import Stepper from '../Stepper/';

import { AppRoutesEnum } from '@appTypes';
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
import Button from '@material-ui/core/Button';

/** Materials icons */
import ExpandMore from '@material-ui/icons/ExpandMore';

import { getActiveLanguage, Translate } from 'react-localize-redux';

require('./style.sass');

interface ICourseState {
}

class CourseComponent extends React.Component<CourseProps, ICourseState> {
    elevation: number;
    lessonsRoute: AppRoutesEnum;
    constructor(props) {
        super(props);
        this.elevation = 3;
        this.lessonsRoute = AppRoutesEnum.lessons;


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
    };

    get langCode () {
        return getActiveLanguage(this.props.localize).code;
    }

    get numberOfLessons () {
        return this.props.lessons.length;
    }

    }

    }

    get course () {
        let {
            props: {
                title,
                description,
                classes: {
                    expansionPanel,
                    expansionPanelSummary,
                    expansionButton,
                    expansionPanelDetails,
                    expansionPanelSummaryHeading,
                    divider
                }
            }
        } = this;

        const { langCode } = this;
        let _title = title[langCode];
        let _description = description[langCode];
        title = null; // GC
        description = null; // GC

        return (
            <ExpansionPanel
                key={`lesson-${_title}`}
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
                        { _title }
                    </Typography>

                    <Typography variant="h4" className={expansionPanelSummaryHeading}>
                        { _description }
                    </Typography>
                </ExpansionPanelSummary>

                <Divider className={divider}/>

                <ExpansionPanelDetails classes={{root: expansionPanelDetails}}>
                    { this.lessons }

                </ExpansionPanelDetails>
                    { isExpanded && <Stepper /> }
            </ExpansionPanel>
         );
    }

    get lessons () {
        let {
            props: {
                classes: {
                    lessonCard,
                    lessonCardContent,
                    lessonCardLinkText,
                    lessonCardButton,
                    lessonCardButtonLabel,
                }
            },
            langCode,
            elevation
        } = this;

        return this.props.lessons.map((lesson: LessonData, ind) => {
            let { _id, title } = lesson;
            const _title = title[langCode];
            title = null; // GC

            return (
                <Card
                    key={_id}
                    id={`card-${_id}`}
                    {...{ elevation }}
                    className={lessonCard}
                >
                    <CardContent classes={{ root: lessonCardContent }} >
                        <Typography variant="h5">
                            <Button
                                onClick={ () => this.handleOnClick(lesson) }
                                classes={{root: lessonCardButton, label: lessonCardButtonLabel }}
                                /** Variant text overriden in theme - no background on hover */
                                variant="text"
                            >
                                <span className={lessonCardLinkText}> <Translate id="lessonsLesson" /> {`${ind + 1}`}</span>
                                <span className={lessonCardLinkText}>{ _title }</span>
                            </Button>
                        </Typography>
                    </CardContent>
                </Card>
            );
        })
    };

    render () {
        return (
            <Paper id="lessons">
                { this.course }
            </Paper>
        );
    }
};

export default withStyles(styles)(CourseComponent);
