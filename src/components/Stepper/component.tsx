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

import { MEDIA_DESKTOP_LG, MEDIA_DESKTOP_MD, COLS_LG, COLS_MD } from '@constantsStyles';

import Media from 'react-media';

/**
 * Needed for media query.
 */
interface IStepperState {
    mediaLarge: boolean;
}

class StepperComponent extends React.Component<StepperProps, IStepperState> {
    numberOfRowsDisplayed: number
    constructor (props) {
        super(props);
        this.numberOfRowsDisplayed = 2;

        this.state = {
            mediaLarge: window.matchMedia(`(min-width: ${ MEDIA_DESKTOP_LG }px`).matches
        };

        this.onMediaQueryChange = this.onMediaQueryChange.bind(this);
    }

    componentDidMount() {
        let { activeLesson } = this;

        if ( activeLesson ) {
            this.scroll( activeLesson.no, false );
            activeLesson = null // GC
        }

        this.setState({
            mediaLarge: window.matchMedia(`(min-width: ${ MEDIA_DESKTOP_LG }px`).matches
        });
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

    scroll (no: number, smooth = false) {
        const {
            props: { openedCourseId, theme: { spacing: { unit }} },
        } = this;

        document.getElementById(`details-${ openedCourseId }`).scroll({
            top: document.getElementById(`card-${ no }`).offsetTop,
            behavior: smooth ? 'smooth' : 'auto'
        });
        document.getElementById(`card-${ no }`).focus({ preventScroll: true });
    }

    get numberOfLessonsDisplayed () {
        if ( this.state.mediaLarge ) {
            return COLS_LG * this.numberOfRowsDisplayed;
        }
        return COLS_MD * this.numberOfRowsDisplayed;
    }

    onMediaQueryChange(matches: boolean) {
        this.setState({
            mediaLarge: matches
        });
    }

    render () {
        const {
            props: { openedCourseId, classes: { stepper, iconContainer, goTo, label } },
            numberOfLessonsDisplayed
        } = this;

        /** Render only if any course is opened */
        return (openedCourseId &&
            <Media query={`(min-width: ${ MEDIA_DESKTOP_LG }px)`} onChange={ this.onMediaQueryChange }>{ () => (

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
            )}</Media>
        );
    }
}

export default withStyles(styles)(withTheme()(StepperComponent));
