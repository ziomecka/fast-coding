import * as React from 'react';

import { StepperProps } from './container';

/** Materials core */
import IconButton from '@material-ui/core/IconButton';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import { Translate } from 'react-localize-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import withTheme from '@material-ui/core/styles/withTheme';
import styles from './styles';

import { LessonData } from '../Lesson/_duck/reducers';

class StepperComponent extends React.Component<StepperProps> {
    numberOfLessonsDisplayed: number
    constructor (props) {
        super(props);
        this.numberOfLessonsDisplayed = 6;
    }

    componentDidMount() {
        const { props: { activeLessonId }} = this;

        if ( activeLessonId ) {
            this.scroll( this.openedCourse.lessons.filter(lesson => lesson._id === activeLessonId)[0].no);
        }
    }

    get openedCourse () : { lessons: LessonData[] } {
        const { props: { openedCourseId }} = this;

        if ( openedCourseId ) {
            return this.props.lessons.filter(lesson => lesson._id === openedCourseId)[0];
        } else {
            return { lessons: [ { _id: null } as LessonData ] };
        }
    }

    scroll (no: number) {
        const {
            props: { openedCourseId, theme: { spacing: { unit } }},
            numberOfLessonsDisplayed
        } = this;

        document.getElementById(`details-${ openedCourseId }`).scrollTop =
            document.getElementById(`card-${ no }`).offsetTop - unit * numberOfLessonsDisplayed;
        document.getElementById(`card-${ no }`).focus({ preventScroll: true });
    }

    render () {
        const {
            props: { openedCourseId, classes: { stepper } },
            numberOfLessonsDisplayed
        } = this;

        /** Render only if any course is opened */
        return (openedCourseId &&
            <Stepper
                orientation="vertical"
                classes={{
                    root: stepper
                }}
            >
                <Translate id="stepperGoTo" />
                { this.openedCourse.lessons.reduce(( acc, cv ) => {
                    const { no } = cv;
                    /** Display only every X lesson
                     *  where x === numberOfLessonsDisplayed
                    */
                    if ( no % numberOfLessonsDisplayed === 0 ) {
                        acc.push(
                            <Step key={ no }>
                                <StepLabel
                                    icon={
                                        <IconButton onClick={ () => this.scroll(no) }>
                                            <StepLabel>
                                                <Translate id="lessonsLesson" />
                                                &nbsp;
                                                { no + 1 }
                                            </StepLabel>
                                        </IconButton>
                                    }
                                >
                                </StepLabel>
                            </Step>
                        )
                    }

                    return acc;
                }, [])}
            </Stepper>
        );
    }
}

export default withStyles(styles)(withTheme()(StepperComponent));
