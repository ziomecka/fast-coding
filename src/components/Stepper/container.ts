import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as Stepper } from './component';

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

const mapDispatchToProps = (): IStepperDispatch => ( {
    addListener: options => addListener( options ),
    removeListener: options => removeListener( options )
} );

// @ts-ignore
const StepperContainer = withRouter( connect( mapStateToProps, mapDispatchToProps )( Stepper ) );

export default StepperContainer;

interface MapStateToProps extends ICoursesLoaderState, ICoursesState {}

export interface IStepperDispatch {
    addListener: ( options: AddListener ) => number;
    removeListener: ( options: RemoveListener ) => boolean;
}
export interface StepperProps extends
    ICoursesLoaderState,
    IStepperDispatch,
    RouteComponentProps<{}>,
    MapStateToProps,
    WithStyles,
    IWithMedia,
    WithTheme {}
