import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as Stepper } from './component';

import { ApplicationContainersEnum } from '@applicationTypes';
import { ComponentsContainersEnum } from '@componentsTypes';

import { ApplicationState } from '../../_reducers/';

import { LessonsLoaderState } from '../LessonsLoader/_duck/reducers';
import { ILessonsState } from '../Lessons/_duck/reducers';
import { WithStyles, WithTheme } from '@material-ui/core/styles';

const { components } = ApplicationContainersEnum;
const { lessonsLoader, lessons } = ComponentsContainersEnum;

const mapStateToProps = (state: ApplicationState): MapStateToProps => ({
    ...state[components][lessonsLoader],
    ...state[components][lessons]
});

// @ts-ignore
const StepperContainer = withRouter(connect(mapStateToProps)(Stepper));

export default StepperContainer;

interface MapStateToProps extends LessonsLoaderState, ILessonsState {}

export interface StepperProps extends
    LessonsLoaderState,
    RouteComponentProps<{}>,
    MapStateToProps,
    WithStyles,
    WithTheme {};