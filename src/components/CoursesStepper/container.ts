import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as CoursesStepper } from './component';

import { ApplicationState } from '@appStore';

import { ICoursesLoaderState } from '@components/CoursesLoader/';
import { ICoursesState } from '@components/Courses/';
import { WithStyles, WithTheme } from '@material-ui/core/styles';

import {
    AddListener,
    RemoveListener,
    addListener,
    removeListener
} from '@app/KeyboardListener/';

import { IWithMedia } from '@app/Media';

const mapStateToProps = ( state: ApplicationState ): MapStateToProps => ( {
    ...state.components.coursesLoader,
    ...state.components.courses
} );

const mapDispatchToProps = (): ICoursesStepperDispatch => ( {
    addListener: options => addListener( options ),
    removeListener: options => removeListener( options )
} );

// @ts-ignore
const CoursesStepperContainer = withRouter( connect( mapStateToProps, mapDispatchToProps )( CoursesStepper ) );

export default CoursesStepperContainer;

interface MapStateToProps extends ICoursesLoaderState, ICoursesState {}

export interface ICoursesStepperDispatch {
    addListener: ( options: AddListener ) => number;
    removeListener: ( options: RemoveListener ) => boolean;
}
export interface CoursesStepperProps extends
    ICoursesLoaderState,
    ICoursesStepperDispatch,
    RouteComponentProps<{}>,
    MapStateToProps,
    WithStyles,
    IWithMedia,
    WithTheme {}
