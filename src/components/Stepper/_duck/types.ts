/**
 * selectedRange, previous, next, selectedLesson, numberOfLessonsDisplayed: needed for managing 'focus'
 */
export interface IStepperState {
    previous: number;
    selectedRange: number;
    next: number;
    selectedLesson: number;
    numberOfLessonsDisplayed: number;
    numberOfRowsDisplayed: number;
}
