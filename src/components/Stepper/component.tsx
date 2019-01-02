import * as React from 'react';

import { StepperProps } from './container';

/** Materials core */
import IconButton from '@material-ui/core/IconButton';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

import { Translate } from 'react-localize-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import withTheme from '@material-ui/core/styles/withTheme';
import styles from './styles';

import { LessonData } from '../Lesson/_duck/reducers';
import { SPACING_BEETWEEN_LESSONS } from '@constantsStyles';

class StepperComponent extends React.Component<StepperProps> {
    numberOfLessonsDisplayed: number
    constructor (props) {
        super(props);
        this.numberOfLessonsDisplayed = 10;
    }

    componentDidMount() {
        let { activeLesson } = this;

        if ( activeLesson ) {
            this.scroll( activeLesson.no );
            activeLesson = null // GC
        }
    }

    get activeLesson() {
        return this.openedCourse.lessons.filter(lesson => lesson._id === this.props.activeLessonId)[0];
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
            props: { openedCourseId, theme: { spacing: { unit }} },
        } = this;

        document.getElementById(`details-${ openedCourseId }`).scroll({
            /** Spacing between tiles is unit * 2 */
            top: document.getElementById(`card-${ no }`).offsetTop - unit * 4 * SPACING_BEETWEEN_LESSONS,
            behavior: 'smooth'
        });
        document.getElementById(`card-${ no }`).focus({ preventScroll: true });
    }

    render () {
        const {
            props: { openedCourseId, classes: { stepper, iconContainer, goTo, label } },
            numberOfLessonsDisplayed
        } = this;

        /** Render only if any course is opened */
        return (openedCourseId &&
            <Stepper
                orientation="vertical"
                classes={{
                    root: stepper
                }}
                connector={null}
            >
                {/* Fragment needed to avoid error: React does not recognize the `alternative Label` prop on a DOM element */}
                <>
                    <Typography variant="subtitle2" className={ `${ label } ${ goTo }` } >
                        <Translate id="stepperGoTo" />
                    </Typography>
                </>

                { this.openedCourse.lessons.reduce(( acc, cv ) => {
                    const { no } = cv;
                    /** Display only every X lesson
                     *  where x === numberOfLessonsDisplayed
                    */
                    if ( no % numberOfLessonsDisplayed === 0 ) {
                        acc.push(
                            <Step key={ no }>
                                <StepLabel
                                    classes={{
                                        iconContainer
                                    }}
                                    icon={
                                        <IconButton onClick={ () => this.scroll(no) }>
                                            <Typography variant="body1" className={ label } >
                                                { no + 1 }
                                            </Typography>
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
