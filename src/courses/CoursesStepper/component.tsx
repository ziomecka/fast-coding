import * as React from 'react';

import { CoursesStepperProps } from './container';
import { ICoursesStepperState } from './_duck/';

/** Materials core */
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import IconPrevious from '@material-ui/icons/ChevronLeft';
import IconNext from '@material-ui/icons/ChevronRight';
import Tooltip from '@material-ui/core/Tooltip';

import withStyles from '@material-ui/core/styles/withStyles';
import withTheme from '@material-ui/core/styles/withTheme';
import styles from './styles';

import { LessonData } from '@lesson/LessonComponent/';

import { CoursesContainersEnum } from '@coursesTypes';
const { coursesStepper } = CoursesContainersEnum;

import { withMedia, MediaEnum } from '@app/Media/';
import { GRID } from '@courses/Course/';

import {
    GRID as LESSONS_GRID,
    ANIMATION_DURATION,
    STEP_SM,
    STEP_XS,
    SPACING_BEETWEEN_LESSONS
} from './constants.styles';

const { xs } = MediaEnum;

class CoursesStepperComponent extends React.Component<CoursesStepperProps, ICoursesStepperState> {
    listenerId: any;
    container: CoursesContainersEnum.coursesStepper;
    timeout: any;
    animationDuration: number;
    spacingBetweenLessons: number;

    constructor ( props ) {
        super( props );

        this.container = coursesStepper;
        this.animationDuration = ANIMATION_DURATION;
        this.spacingBetweenLessons = props.theme.spacing.unit;

        this.state = {
            previous: null,
            selectedRange: null,
            next: null,
            selectedLesson: 0, // TODO
            numberOfLessonsDisplayed: this.numberOfLessonsDisplayed,
            numberOfRowsDisplayed: this.numberOfRowsDisplayed
        };

        this.goToNextLarge = this.goToNextLarge.bind( this );
        this.goToPreviousLarge = this.goToPreviousLarge.bind( this );
        this.goToNextSmall = this.goToNextSmall.bind( this );
        this.goToPreviousSmall = this.goToPreviousSmall.bind( this );

        this.listener = this.listener.bind( this );
    }

    get numberOfRowsDisplayed() {
        return LESSONS_GRID.get( this.props.media ).rows;
    }

    getNext ( modifier: number ): number {
        return Math.min( this.state.selectedLesson + modifier, this.numberOfLessons - 1 );
    }

    getPrevious( modifier: number ): number {
        return Math.max( this.state.selectedLesson - modifier, 0 );
    }

    focusLesson( no: number = this.state.selectedLesson, previousNo?: number ): void {
        const { props: { classes: { selectedLessonClass } } } = this;

        try {
            this.getLessonHTML( no ).classList.add( selectedLessonClass );

            if ( previousNo !== undefined && no !== previousNo ){
                this.getLessonHTML( previousNo ).classList.remove( selectedLessonClass );
            }
        // TODO code
        /* eslint-disable no-empty */
        } catch ( err ) {}
        /* eslint-enable no-empty */
    }

    getLessonHTML( no ): HTMLElement {
        return document.getElementById( `card-${ no }` );
    }

    /** Click the lesson or focus the next / previous */
    listener( e: KeyboardEvent ): void {
        // 13 - enter
        if ( e.keyCode === 13 ) {
            try {
                this.getLessonHTML( this.state.selectedRange ).querySelector( 'button' ).click();
            /* eslint-disable no-empty */
            } finally {}
            /* eslint-enable no-empty */
        }

        // 37 - arrow left
        if ( e.keyCode === 37 ) {
            return this.goToPreviousSmall();
        }

        // 39 - arrow right
        if ( e.keyCode === 39 ) {
            return this.goToNextSmall();
        }

        // 38 - arrow up
        if ( e.keyCode === 38 ) {
            e.preventDefault();
            return this.goToPrevious( this.colsNumber );
        }

        // 40 - arrow down
        if ( e.keyCode === 40 ) {
            e.preventDefault();
            return this.goToNext( this.colsNumber );
        }
    }

    async componentDidMount() {
        const { state: { selectedLesson } } = this;

        let answer = await this.getNewState();

        if ( answer || !answer ) {
            this.focusLesson( selectedLesson );
            this.scroll( selectedLesson );
        }

        this.listenerId = await this.props.addListener( { container: this.container, listener: [ 'keydown', this.listener ] } );
    }

    async componentDidUpdate( prevProps, prevState ) {
        const {
            props: { media },
            state: { numberOfLessonsDisplayed }
        } = this;

        if ( media !== prevProps.media ) {
            const answer = await this.getNewState();
            if ( answer || !answer ) {
                this.setState( {
                    numberOfLessonsDisplayed: this.numberOfLessonsDisplayed,
                    numberOfRowsDisplayed: this.numberOfRowsDisplayed
                } );
            }
        }

        if ( numberOfLessonsDisplayed !== prevState.numberOfLessonsDisplayed ) {
            const { state: { selectedLesson } } = this;
            this.focusLesson( selectedLesson );
            this.scroll( selectedLesson );
        }
    }

    get selectedRange(): number {
        const { state: { selectedLesson, numberOfLessonsDisplayed } } = this;
        return ( Math.ceil( ( selectedLesson + 1 ) / numberOfLessonsDisplayed ) - 1 ) * numberOfLessonsDisplayed;
    }

    async getNewState(): Promise<boolean> {
        const {
            props: { openedCourseId },
            areHidden
        } = this;

        if ( openedCourseId && areHidden ) {
            return new Promise<boolean>( res => {
                this.setState(
                    () => ( { selectedRange: this.selectedRange } ),
                    () => {
                        this.setState(
                            () => {
                                const { state: { numberOfLessonsDisplayed, selectedRange } } = this;

                                const newPrevious = Math.max( selectedRange - numberOfLessonsDisplayed, 0 );
                                const newNext = Math.min( selectedRange + numberOfLessonsDisplayed, this.numberOfLessons - 1 );

                                return {
                                    previous: ( newPrevious !== selectedRange ) ? newPrevious : null,
                                    next: ( newNext !== selectedRange ) ? newNext : null
                                };
                            },
                            () => res( true )
                        );
                    }
                );
            } );
        }
        return Promise.resolve( true );
    }

    componentWillUnmount() {
        this.props.removeListener( { container: this.container, listenerId: this.listenerId } );
    }

    /** TODO cards with lesson id */
    get activeLesson(): LessonData {
        return this.openedCourse.lessons.filter( lesson => lesson._id === this.props.activeLessonId )[ 0 ];
    }

    get activeLessonNo(): number {
        return this.activeLesson ? this.activeLesson.no : 0;
    }

    get openedCourse (): { lessons: LessonData[] } {
        const { props: { openedCourseId } } = this;

        if ( openedCourseId ) {
            return this.props.courses.filter( course => course._id === openedCourseId )[ 0 ];
        } else {
            return { lessons: [ { _id: null } as LessonData ] };
        }
    }

    get colsNumber(): number {
        return GRID.get( this.props.media ).cols;
    }

    scroll ( no: number, smooth = false ): void {
        let lessonHTML = this.getLessonHTML( no );
        const { spacingBetweenLessons } = this;

        if ( lessonHTML ) {
            /** Scrolling could be avoided if there is no need i.e. parent's top already equals lessonHTML's top
             * Not worth coding?
             */
            document.getElementById( `details-${ this.props.openedCourseId }` ).scroll( {
                top: ( lessonHTML.offsetTop + spacingBetweenLessons ),
                behavior: smooth ? 'smooth' : 'auto'
            } );

            lessonHTML = null; // GC
        }
    }

    get numberOfLessonsDisplayed(): number {
        return this.colsNumber * this.numberOfRowsDisplayed;
    }

    get numberOfLessons(): number {
        return this.openedCourse.lessons.length;
    }

    goToPreviousLarge( e?: React.MouseEvent<HTMLElement> ): void {
        if ( e ) e.stopPropagation();
        this.goToPrevious( this.state.numberOfLessonsDisplayed );
    }

    goToPreviousSmall( e?: React.MouseEvent<HTMLElement> ): void {
        if ( e ) e.stopPropagation();
        this.goToPrevious( 1 );
    }

    goToNextLarge( e?: React.MouseEvent<HTMLElement> ): void {
        if ( e ) e.stopPropagation();
        this.goToNext( this.state.numberOfLessonsDisplayed );
    }

    goToNextSmall( e?: React.MouseEvent<HTMLElement> ): void {
        if ( e ) e.stopPropagation();
        this.goToNext( 1 );
    }

    goToPrevious( step: number ): void {
        const newSelectedLesson = this.getPrevious( step );
        const { state: { selectedLesson, selectedRange } } = this;

        this.setState(
            () => ( { selectedLesson: newSelectedLesson } ),
            () => {
                /** If is not within the displayed range */
                if ( newSelectedLesson < selectedRange ) {
                    this.moveCoursesStepperBackwards();
                }

                this.scroll( newSelectedLesson );
                this.focusLesson( newSelectedLesson, selectedLesson );
            }
        );
    }

    moveCoursesStepperBackwards(): void {
        if ( this.state.previous !== null ) {
            const {
                props: { classes: { moveLeft, takeOffTransition } },
                state: { previous, selectedRange, numberOfLessonsDisplayed }
            } = this;

            this.coursesStepperAddClass( `${ takeOffTransition }` );

            let newPrevious = Math.max( selectedRange - numberOfLessonsDisplayed * 2, 0 );
            newPrevious = ( newPrevious === previous ) ? null : newPrevious;

            this.setState( () => {
                return {
                    previous: newPrevious,
                    selectedRange: previous,
                    next: selectedRange
                };
            }, () => {
                this.coursesStepperAddClass( `${ moveLeft }` );
                this.timeout = setTimeout( () => {
                    this.coursesStepperRemoveClass( `${ takeOffTransition }` );
                    this.coursesStepperRemoveClass( `${ moveLeft }` );
                    clearTimeout( this.timeout );
                }, this.animationDuration );
            } );
        }
    }

    /** CoursesStepper is always moved by the number of lessons displayed */
    moveCoursesStepperForward(): void {
        if ( this.state.next !== null ) {
            const {
                props: { classes: { moveRight, takeOffTransition } },
                state: { selectedRange, next, numberOfLessonsDisplayed }
            } = this;

            this.coursesStepperAddClass( `${ takeOffTransition }` );

            let newNext = Math.min( selectedRange + numberOfLessonsDisplayed * 2, this.numberOfLessons - 1 );
            newNext = ( newNext === next ) ? null : newNext;

            this.setState( () => {
                return {
                    previous: selectedRange,
                    selectedRange: next,
                    next: newNext
                };
            }, () => {
                this.coursesStepperAddClass( `${ moveRight }` );
                this.timeout = setTimeout( () => {
                    this.coursesStepperRemoveClass( `${ takeOffTransition }` );
                    this.coursesStepperRemoveClass( `${ moveRight }` );
                    clearTimeout( this.timeout );
                }, this.animationDuration );
            } );
        }
    }

    goToNext( step: number ): void {
        const newSelectedLesson = this.getNext( step );
        const { state: { selectedLesson, selectedRange, numberOfLessonsDisplayed } } = this;

        this.setState(
            () => ( { selectedLesson: newSelectedLesson } ),
            () => {
                /** If is not within the displayed range */
                if ( newSelectedLesson > ( selectedRange + numberOfLessonsDisplayed - 1 ) ) {
                    this.moveCoursesStepperForward();
                }
                this.scroll( newSelectedLesson );
                this.focusLesson( newSelectedLesson, selectedLesson );
            }
        );
    }

    coursesStepperAddClass( className: string ): void {
        document.getElementById( 'coursesStepperWraper' ).classList.add( className );
    }

    coursesStepperRemoveClass( className: string ): void {
        document.getElementById( 'coursesStepperWraper' ).classList.remove( className );
    }

    get iconPreviousSmall(): JSX.Element {
        const {
            props: { classes: { buttonDisabled, iconDense } },
            state: { selectedLesson }
        } = this;

        const disabled = ( selectedLesson - 1 ) < 0;

        return (
            <Tooltip
                title={ disabled
                    ? ''
                    : `go to ${ ( selectedLesson ) }`
                }
            >
                <IconButton
                    onClick={ e => disabled ? e.stopPropagation() : this.goToPreviousSmall( e ) }
                    className={ `${ iconDense } ${ disabled ? buttonDisabled : null }` }
                >
                    <IconPrevious />
                </IconButton>
            </Tooltip>
        );
    }

    get iconPreviousLarge(): JSX.Element {
        const {
            props: { classes: { buttonDisabled, iconDense } },
            state: { selectedLesson, numberOfLessonsDisplayed }
        } = this;

        const disabled = ( selectedLesson - 1 ) < 0;

        return (
            <Tooltip
                title={ disabled
                    ? ''
                    : `go to ${ Math.max( selectedLesson - numberOfLessonsDisplayed + 1, 1 ) }`
                }
            >
                <IconButton
                    onClick={ e => disabled ? e.stopPropagation() : this.goToPreviousLarge( e ) }
                    className={ `${ iconDense } ${ disabled ? buttonDisabled : null }` }
                >
                    <IconPrevious />
                    <IconPrevious />
                </IconButton>
            </Tooltip>
        );
    }

    get iconNextSmall(): JSX.Element {
        const {
            props: { classes: { buttonDisabled, iconDense }, media },
            state: { selectedLesson },
            numberOfLessons
        } = this;

        const disabled = ( selectedLesson + 1 ) > numberOfLessons - 1;

        return (
            <Tooltip
                title={ disabled
                    ? ''
                    : `go to ${ ( selectedLesson + 2 ) }`
                }
            >
                <IconButton
                    onClick={ e => disabled ? e.stopPropagation() : this.goToNextSmall( e ) }
                    className={ `${ iconDense } ${ disabled ? buttonDisabled : null }` }
                    style={ { position: 'absolute', right: ( media === xs ) ? STEP_XS : STEP_SM } }
                >
                    <IconNext />
                </IconButton>
            </Tooltip>
        );
    }

    get iconNextLarge(): JSX.Element {
        const {
            props: { classes: { buttonDisabled, iconDense } },
            state: { selectedLesson, numberOfLessonsDisplayed },
            numberOfLessons,
        } = this;

        const disabled = ( selectedLesson + 1 ) > numberOfLessons - 1;

        return (
            <Tooltip
                title={ disabled
                    ? ''
                    : `go to ${ Math.min( selectedLesson + numberOfLessonsDisplayed + 1, numberOfLessons ) }`
                }
            >
                <IconButton
                    onClick={ e => disabled ? e.stopPropagation() : this.goToNextLarge( e ) }
                    className={ `${ iconDense } ${ disabled ? buttonDisabled : null }` }
                    style={ { position: 'absolute', right: 0 } }
                >
                    <IconNext />
                    <IconNext />
                </IconButton>

            </Tooltip>
        );
    }

    get areHidden(): boolean {
        return ( this.state.numberOfLessonsDisplayed < this.numberOfLessons );
    }

    getStep( value: number, id: string ): JSX.Element {
        const { state: { numberOfLessonsDisplayed }, numberOfLessons } = this;

        const min = ( value !== null ) ? value + 1 : null;
        const max = ( value !== null ) ? Math.min( value + 1 + numberOfLessonsDisplayed - 1, numberOfLessons ) : null;

        return (
            <div onClick={ e => e.stopPropagation() } className={ this.props.classes.step } key={ id } >
                <span>{ min } { max && ( max !== min ) ? ` - ${ max }` : null }</span>
            </div>
        );
    }

    render () {
        const {
            props: { openedCourseId, media, classes: { coursesStepperPaper, coursesStepperWraper, coursesStepper } },
            state: { selectedRange, previous, next },
            areHidden
        } = this;

        return ( openedCourseId && areHidden &&
            <Paper className={ coursesStepperPaper } >
                <div className={ coursesStepper }>
                    { this.iconPreviousLarge }
                    { this.iconPreviousSmall }

                    <div id="coursesStepperWraper" className={ coursesStepperWraper }>
                        { media !== xs && ( [
                            this.getStep( previous, 'previous' ),
                            this.getStep( selectedRange, 'selected' ),
                            this.getStep( next, 'next' ),
                        ] )}
                    </div>

                    { this.iconNextSmall }
                    { this.iconNextLarge }
                </div>
            </Paper>
        );
    }
}

export default withStyles( styles )( withTheme()( withMedia( CoursesStepperComponent ) ) );
