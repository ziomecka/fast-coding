import * as React from 'react';

import { StepperProps } from './container';

/** Materials core */
import IconButton from '@material-ui/core/IconButton';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

import IconPrevious from '@material-ui/icons/ChevronLeft';
import IconNext from '@material-ui/icons/ChevronRight';

import withStyles from '@material-ui/core/styles/withStyles';
import withTheme from '@material-ui/core/styles/withTheme';
import styles from './styles';

import { LessonData } from '../Lesson/_duck/reducers';

import { MEDIA_DESKTOP_LG, COLS_LG, COLS_MD } from '@constantsStyles';

import Media from 'react-media';

import { ComponentsContainersEnum } from '@componentsTypes';
const { lessonStepper } = ComponentsContainersEnum;

/**
 * mediaLarge: needed for media query.
 * selectedLesson: needed for managing 'focus'
 */
interface IStepperState {
    mediaLarge: boolean;
    selectedLesson: number;
}

class StepperComponent extends React.Component<StepperProps, IStepperState> {
    numberOfRowsDisplayed: number;
    step: number;
    listenerId: any;
    container: ComponentsContainersEnum.lessonStepper;
    constructor (props) {
        super(props);
        this.numberOfRowsDisplayed = 2;
        this.step = 2; // numbers of rows by which scrolled
        this.container = lessonStepper;

        this.state = {
            mediaLarge: window.matchMedia(`(min-width: ${ MEDIA_DESKTOP_LG }px`).matches,
            selectedLesson: 0
            // selectedLesson: this.activeLessonNo
        };

        this.onMediaQueryChange = this.onMediaQueryChange.bind(this);
        this.goToNext = this.goToNext.bind(this);
        this.goToPrevious = this.goToPrevious.bind(this);
        this.listener = this.listener.bind(this);
    }

    focusLesson(no: number = this.state.selectedLesson, modifier: number = 0, preventScroll: boolean = false) {
        const {
            props: { classes: { selectedLesson: selectedLessonClass }},
            state: { selectedLesson }
        } = this;

        let number = no + modifier;

        if (modifier === -1) {
            number = Math.max( number, 0 );
        }

        if (modifier === 1) {
            number = Math.min( number, this.numberOfLessons - 1 );
        }

        try {
            this.getLessonHTML(number).classList.add(selectedLessonClass);
            if (number !== selectedLesson ){
                this.getLessonHTML(selectedLesson).classList.remove(selectedLessonClass);
            }
        }
        finally {
            this.setState({ selectedLesson: number });
        }
    }

    getLessonHTML(no) {
        return document.getElementById( `card-${ no }` );
    }

    /** Click the lesson or focus the next / previous */
    listener(e: KeyboardEvent): boolean {
        // 13 - return
        if ( e.keyCode === 13 ) {
            try {
                this.getLessonHTML( this.state.selectedLesson ).querySelector('button').click();
            } finally {
                return true;
            }
        }

        // 37 - arrow left
        if ( e.keyCode === 37 ) {
            this.scroll(this.state.selectedLesson, true, -1)
            return true;
        }

        // 39 - arrow right
        if ( e.keyCode === 39 ) {
            this.scroll(this.state.selectedLesson, true, 1)
            return true;
        }

        // 38 - arrow up
        if( e.keyCode === 38) {
            e.preventDefault();
            this.scroll(this.state.selectedLesson, true, this.colsNumber * -1)
            return true;

        }

        // 40 - arrow down
        if ( e.keyCode === 40) {
            e.preventDefault();
            this.scroll(this.state.selectedLesson, true, this.colsNumber)
            return true;

        }
    }

    async componentDidMount() {
        // TODO - karta mozę być jeszcze nie wyrendorowana więc nie zadziała
        this.scroll( this.state.selectedLesson, false );

        this.listenerId = await this.props.addListener({ container: this.container, listener: [ 'keydown', this.listener ] });
    }

    componentWillUnmount() {
        this.props.removeListener({ container: this.container, listenerId: this.listenerId });
    }

    /** TODO cards with lesson id */
    get activeLesson(): LessonData {
        return this.openedCourse.lessons.filter(lesson => lesson._id === this.props.activeLessonId)[0];
    }

    get activeLessonNo(): number {
        return this.activeLesson ? this.activeLesson.no : 0;
    }

    get openedCourse () : { lessons: LessonData[] } {
        const { props: { openedCourseId } } = this;

        if ( openedCourseId ) {
            return this.props.lessons.filter(lesson => lesson._id === openedCourseId)[0];
        } else {
            return { lessons: [ { _id: null } as LessonData ] };
        }
    }

    get colsNumber(): number {
        return (
            this.state.mediaLarge
                ? COLS_LG
                : COLS_MD
        );
    }

    scroll (no: number, smooth = false, modifier: number = 0): void {
        let lessonHTML = this.getLessonHTML(no + modifier);

        if ( lessonHTML ) {
            /** Scrolling could be avoided if there is no need i.e.
             * top already equals lessonHTML. E.g. when left right arrows are used
             * Not worth coding?
             */
            document.getElementById(`details-${ this.props.openedCourseId }`).scroll({
                top: lessonHTML.offsetTop,
                behavior: smooth ? 'smooth' : 'auto'
            });

            lessonHTML = null; // GC

            this.focusLesson(no, modifier, true);
        }
    }

    get numberOfLessonsDisplayed () {
        return this.colsNumber * this.numberOfRowsDisplayed;
    }

    get numberOfLessons() {
        return this.openedCourse.lessons.length;
    }

    onMediaQueryChange(matches: boolean) {
        this.setState({ mediaLarge: matches });
    }

    goToPrevious(e: React.MouseEvent<HTMLElement>, step: number = this.colsNumber * this.step): void {
        this.scroll( Math.max(this.state.selectedLesson - step, 0), true );
    }

    goToNext(e: React.MouseEvent<HTMLElement>, step: number = this.colsNumber * this.step): void {
        this.scroll( Math.min( this.state.selectedLesson + step, this.numberOfLessons - 1 ), true );
    }

    get iconPrevious(): JSX.Element {
        return (
            <IconButton
               onClick={ this.goToPrevious }
               disabled={ this.state.selectedLesson < this.colsNumber * this.step }
               className={ this.props.classes.iconDense }
            >
                <IconPrevious />
                <IconPrevious />
            </IconButton>
        );
    }

    get iconNext(): JSX.Element {
        return (
            <IconButton
               onClick={ this.goToNext }
               disabled= { this.state.selectedLesson > this.numberOfLessons - 1 - this.colsNumber * this.step }
               className={ this.props.classes.iconDense }
            >
                <IconNext />
                <IconNext />
            </IconButton>
        );
    }

    render () {
        const {
            props: { openedCourseId, classes: { stepper, iconContainer, label } },
            state: { selectedLesson },
            numberOfLessonsDisplayed
        } = this;

        /** Render only if any course is opened */
        return (openedCourseId &&
            <Media query={`(min-width: ${ MEDIA_DESKTOP_LG }px)`} onChange={ this.onMediaQueryChange }>{ () => (
                <>
                    <Stepper
                        classes={{
                            root: stepper
                        }}
                        connector={null}
                        /** To avoid closing expansion panel on click.
                         *  Needed because stepper is rendered within expansion panel
                         */
                        onClick={ e => e.stopPropagation() }
                    >
                        {/* Fragment needed to avoid error: React does not recognize the `alternative Label` prop on a DOM element */}
                        <>
                            { this.iconPrevious }
                        </>

                        { this.openedCourse.lessons.reduce(( acc, cv ) => {
                            const { no } = cv;
                            /** Display only every X lesson
                             *  where x === numberOfLessonsDisplayed
                            */
                            if ( no % numberOfLessonsDisplayed === 0 ) {
                                const min = no + 1;
                                const max = Math.min( no + this.colsNumber * this.step, this.numberOfLessons );

                                acc.push(
                                    <Step key={ no }>
                                        <StepLabel
                                            classes={{
                                                iconContainer
                                            }}
                                            icon={
                                                <IconButton
                                                    onClick={ (e) => this.scroll(no, true) }
                                                    disabled={ ( selectedLesson + 1 >= min ) && ( selectedLesson + 1 <= max ) }
                                                >
                                                    <Typography variant="body1" className={ label } >
                                                        { min }{ (max !== min) ? `-${ max }` : null }
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
                        <>
                            { this.iconNext }
                        </>
                    </Stepper>
                </>
            )}</Media>
        );
    }
}

export default withStyles(styles)(withTheme()(StepperComponent));