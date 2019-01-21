import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as CoursesStepper } from './component';

import { ApplicationState } from '@appStore';

import { ICoursesLoaderState } from '@courses/CoursesLoader/';
import { ICoursesState } from '@courses/Courses/';
import { WithStyles, WithTheme } from '@material-ui/core/styles';

import {
    AddListener,
    RemoveListener,
    KeyboardListener
} from '@app/KeyboardListener/';

import { IWithMedia } from '@app/Media';

import { LocalizeState } from 'react-localize-redux';

const mapStateToProps = ( state: ApplicationState ): MapStateToProps => ( {
    localize: state.localize,
    ...state.courses.coursesLoader,
    ...state.courses.courses
} );

const mapDispatchToProps = (): ICoursesStepperDispatch => ( {
    addListener: options => KeyboardListener.addListener( options ),
    removeListener: options => KeyboardListener.removeListener( options )
} );

// @ts-ignore
const CoursesStepperContainer = withRouter( connect( mapStateToProps, mapDispatchToProps )( CoursesStepper ) );

export default CoursesStepperContainer;

interface MapStateToProps extends ICoursesLoaderState, ICoursesState {
    localize: LocalizeState
}

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
