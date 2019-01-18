/**
 * selectedRange, previous, next, selectedLesson, numberOfLessonsDisplayed: needed for managing 'focus'
 */
export interface ICoursesStepperState {
    previous: number;
    selectedRange: number;
    next: number;
    selectedLesson: number;
    numberOfLessonsDisplayed: number;
    numberOfRowsDisplayed: number;
}
