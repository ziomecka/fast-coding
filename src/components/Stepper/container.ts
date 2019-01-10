import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as Stepper } from './component';

import { ApplicationContainersEnum } from '@applicationTypes';
import { ComponentsContainersEnum } from '@componentsTypes';

import { ApplicationState } from '@appStore';

import { LessonsLoaderState } from '@components/LessonsLoader/_duck/reducers';
import { ILessonsState } from '@components/Lessons/_duck/reducers';
import { WithStyles, WithTheme } from '@material-ui/core/styles';

import { onAddListener, onRemoveListener } from '@app/KeyboardListener/_duck/operations';
import { AddListener, RemoveListener } from '@app/KeyboardListener/_duck/actions';

import { IWithMedia } from '@app/Media';

const { components } = ApplicationContainersEnum;
const { lessonsLoader, lessons } = ComponentsContainersEnum;

const mapStateToProps = (state: ApplicationState): MapStateToProps => ({
    ...state[components][lessonsLoader],
    ...state[components][lessons]
});

const mapDispatchToProps = (dispatch: Dispatch): IStepperDispatch => ({
    addListener: options => dispatch(onAddListener(options)),
    removeListener: options => dispatch(onRemoveListener(options))
});

// @ts-ignore
const StepperContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Stepper));

export default StepperContainer;

interface MapStateToProps extends LessonsLoaderState, ILessonsState {}

export interface IStepperDispatch {
    addListener: (options: AddListener) => Action;
    removeListener: (options: RemoveListener) => Action;
}
export interface StepperProps extends
    LessonsLoaderState,
    IStepperDispatch,
    RouteComponentProps<{}>,
    MapStateToProps,
    WithStyles,
    IWithMedia,
    WithTheme {}