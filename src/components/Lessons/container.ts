import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as Lessons } from './component';

import { ApplicationContainersEnum } from '@applicationTypes';
import { ComponentsContainersEnum } from '@componentsTypes';

import { ApplicationState } from '../../_reducers/';

import { LessonsLoaderState } from '../LessonsLoader/_duck/reducers';

const { components } = ApplicationContainersEnum;
const { lessonsLoader } = ComponentsContainersEnum;

const mapStateToProps = (state: ApplicationState): MapStateToProps => ({
    ...state[components][lessonsLoader]
});

const LessonsContainer = withRouter(connect(mapStateToProps)(Lessons));

export default LessonsContainer;

interface MapStateToProps extends LessonsLoaderState {
}

export interface LessonsProps extends
    LessonsLoaderState,
    RouteComponentProps<{}>,
    MapStateToProps {};